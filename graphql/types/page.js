let engine = require('./../../engine/index');
let Content = require('./content');

class Page {
    async load(url) {
        const page = await engine.getBrowser().newPage();
        await page.goto(url);
        this.browserPage = page;
        await page.evaluate(arg => {
                window['getQuerySelector'] = el => {
                    let path = [], parent;
                    while (parent = el.parentNode) {
                        path.unshift(`${el.tagName}:nth-child(${[].indexOf.call(parent.children, el)+1})`);
                        el = parent;
                    }
                    return `${path.join(' > ')}`.toLowerCase();
                }
            }
        );
        return page;
    }

    async content(args) {
        return new Content(this.browserPage, args.selector);
    }

    async list(args) {
        return new Content(this.browserPage, args.selector).list(args);
    }

    close() {
        try {
            this.browserPage.close();
        } catch (e) {
            console.warn('Page not exists anymore');
        }
    }
}

module.exports = Page;