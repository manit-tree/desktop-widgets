function tick() {
    let target = document.querySelector('.date span');
    let prev_date = '';
    let month_names = ['JAN','FEB',"MAR",'APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    setInterval(() => {
        let dt = new Date();
        let date = (dt.getDate() + '').padStart(2, '0');
        let month = month_names[dt.getMonth()];
        let year = (1900 + dt.getYear()) + '';

        if (prev_date != `${date} ${month} ${year}`) {
            prev_date = `${date} ${month} ${year}`

            console.log(prev_date);
            target.innerText = prev_date; 
        }
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
                if (widget.widget == 'date') {
                    if (widget.options) {
                        options = widget.options;
                    }
                }                
            })

            let date = document.querySelector('.date');
            let color = get_default(options.color, '#001125');
            let alignment = get_default(options.alignment, 'center');

            switch (alignment) {
                case 'left':
                    date.style.setProperty('--justify-content', 'flex-start')
                    break;

                case 'right':
                    date.style.setProperty('--justify-content', 'flex-end')
                    break;

                case 'center':
                    date.style.setProperty('--justify-content', 'center')
                    break;
    
                    default:
                    break;
            }

            date.style.setProperty('--color', color);
            tick();
        }
    })
})