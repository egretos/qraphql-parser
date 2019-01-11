let ContentList = require('./contentList');

class Content {
    constructor (page, selector) {
        this.page = page;
        this.selector = selector;
    }

    async text() {
        return await this.page.$eval(this.selector, el => el.innerText);
    }

    async html() {
        return await this.page.$eval(this.selector, el => el.outerHTML);
    }

    async href() {
        return await this.page.$eval(this.selector, el => el.href);
    }

    async attr(args) {
        return await this.page.$eval(this.selector, (el, args) => el.getAttribute(args.name), args);
    }

    async content(args) {
        return new Content(this.page, args.selector);
    }

    async list(args) {
        let res = await this.page.evaluate(selector => {
            let elements = document.querySelectorAll(selector);
            let result = [];
            for (let key in elements) {
                if (elements.hasOwnProperty(key)) {
                    result.push(window.getQuerySelector(elements[key]));
                }
            }
            return result;
        }, args.selector);
        let final = [];
        for (let key in res) {
            if (res.hasOwnProperty(key)) {
                let selector = res[key];
                await final.push(new Content(this.page, selector));
            }
        }
        return final;
    }
}

module.exports = Content;