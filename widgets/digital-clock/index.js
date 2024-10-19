function start_clock() {
    let hhmm = document.querySelector('.hh-mm');

    setInterval(() => {
        let dt = new Date();
        let hours = dt.getHours() + '';
        let minutes = dt.getMinutes() + '';

        hhmm.innerText = hours.padStart(2, '0') + ':' + minutes.padStart(2, '0');        
    }, 1000);
}

function get_json(url, cached = true) {
    return new Promise((resolve, reject) => {
        let options = {};

        if (!cached) {
            options = {cache: "no-cache"}
        }

        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    })
}

function get_default(x, y) {
    if (x == undefined || x == null) {
        return y;
    }

    return x;
}

document.addEventListener('DOMContentLoaded', evt => {
    get_json('../../widgets.json').then(widgets => {
        let options = {};

        if (widgets) {
            widgets.forEach(widget => {
                if (widget.widget == 'digital-clock') {
                    if (widget.options) {
                        options = widget.options;
                    }
                }                
            })

            let clock = document.querySelector('.clock');
            let color = get_default(options.color, '#001125');
            let alignment = get_default(options.alignment, 'center');

            switch (alignment) {
                case 'left':
                    clock.style.setProperty('--justify-content', 'flex-start')
                    break;

                case 'right':
                    clock.style.setProperty('--justify-content', 'flex-end')
                    break;

                case 'center':
                    clock.style.setProperty('--justify-content', 'center')
                    break;
    
                    default:
                    break;
            }

            clock.style.setProperty('--color', color);
            start_clock();
        }
    })
})