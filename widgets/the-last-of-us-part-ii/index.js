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
                if (widget.widget == 'the-last-of-us-part-ii') {
                    if (widget.options) {
                        options = widget.options;
                    }
                }                
            })

            let target = document.querySelector('svg');
            let color = get_default(options.color, '#001125');

            target.style.setProperty('--color', color);
            start_clock();
        }
    })
})