import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

let widgets = load_widgets();

function get_default(x, y) {
    if (x == null || x == undefined) {
        return y;
    }

    return x;
}

const createWindow = (widget) => {
    const win = new BrowserWindow({
        width: widget.width,
        height: widget.height,
        transparent: true,
        frame: false,
        resizable: false,
        y: get_default(widget.x, 0),
        x: get_default(widget.y, 0)
    })

    win.loadFile(`./widgets/${widget.widget}/index.html`);
    win.setSkipTaskbar(true);
    win.showInactive();
    win.blur();

    win.on('moved', evt => {
        const pos = win.getPosition();

        widget.y = pos[0];
        widget.x = pos[1];

        update_widgets(widget);
    })
}

function load_widgets() {
    return JSON.parse(fs.readFileSync('widgets.json', {encoding:'utf8', flag:'r'}));
}

function update_widgets(widget) {
    for (let v_widget of widgets) {
        if (v_widget.widget == widget.widget) {
            v_widget = widget;          
            break;
        }
    }

    fs.writeFile('widgets.json', JSON.stringify(widgets), function(err) {
        if(err) {
            return console.log(err);
        }
    })
}

app.whenReady().then(() => {
    widgets.forEach(widget => {
        if (widget.enable) {
            createWindow(widget);
        }
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }    
    })
    
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }) 
    
    ipcMain.on('ping', (evt, data) => {
        console.log('ping');
        console.log(data);
        evt.reply('pong', {x:20,y:40});
    })
})

