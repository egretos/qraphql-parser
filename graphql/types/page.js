let engine = require('./../../engine/index');
let Content = require('./content');

class Page {
    async load(url) {
        const page = await engine.getBrowser().newPage();
        await page.goto(url);
        this.browserPage = page;
        return page;
    }

    async content(args) {
        return new Content(this.browserPage, args.selector);
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