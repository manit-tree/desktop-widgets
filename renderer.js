$.ready(() => {
    let app = $('#app');

    app.on('click', evt => {
        let el = evt.target;

        if (el.matches('a[data-cmd]')) {
            let cmd = $.default(el.getAttribute('data-cmd'), '');

            if (cmd == 'ping') {
                electron.api('ping', {x:10, y:20});
            }
        }
    })
})
