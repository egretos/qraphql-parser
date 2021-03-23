const Content = require('./element');

class ContentList {
    constructor (page, selector) {
        this.page = page;
        this.selector = selector;
    }

    async list() {
        await this.page.evaluate(this.selector, selector => {
            let elements = document.querySelectorAll(selector);
            console.dir(elements);
            let result = [];
            for (let key in elements) {
                console.log(window.getQuerySelector(elements[key]))
            }
        }, this.selector);
    }

    async content(args) {
        return new Content(this.page, args.selector);
    }
}

module.exports = ContentList;