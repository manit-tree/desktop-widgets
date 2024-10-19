import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
    'electron',
    {
        api: (cmd, data = null) => {
            ipcRenderer.send(cmd, data);
        }
    }     
)

ipcRenderer.on('pong', (evt, data) => {
    console.log('pong');
    console.log(data);
})

window.addEventListener('DOMContentLoaded', () => {
    console.log('preload.js executed!');
})