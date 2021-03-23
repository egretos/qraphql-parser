let engine = require('../../engine/engine');
let Element = require('./element');

class Page {
    /** @property {!Promise<!Puppeteer.Page>} */
    browserPage;

    /** @property {!Promise} */
    initialized;

    constructor(args, context) {
        this.initialized = this.init(args, context);
    }

    /**
     *
     * @param args
     * @param context
     * @returns {Promise<void>}
     */
    async init(args, context) {
        await engine.getInstance().up();

        /** @var {!Promise<!Puppeteer.Page>} */
        this.browserPage = await engine.getInstance().getBrowser().newPage();

        let page = this;
        context.res.on('finish', () => {
            page.close();
        });

        if (args.url) {
            await this.browserPage.goto(args.url);
        }
    }

    /**
     *
     * @param args
     * @param cont
     * @param info
     * @returns {Promise<*>}
     */
    async element(args, cont, info) {
        return this.initialized.then(() => {
            return new Element(this.browserPage, args.selector);
        });
    }

    async list(args) {
        return new Element(this.browserPage, args.selector).list(args);
    }

    close() {
        try {
            this.browserPage.close();
        } catch (e) {
            console.warn('Page not exists anymore');
        }
    }

    async load(url) {
        await this.browserPage.evaluate(arg => {
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
}

module.exports = Page;