let ContentList = require('./contentList');

class Element {
    constructor (page, selector) {
        this.page = page;
        this.selector = selector;
    }

    async text(args) {
        if (args.selector) {
            return await this.page.$eval(this.selector + ' ' + args.selector, el => el.innerText);
        }
        return await this.page.$eval(this.selector, el => el.innerText);
    }

    async integer(args) {
        let str = await this.text(args);
        return await parseInt(await str.replace(/\D+/g,""));
    }

    async html(args) {
        if (args.selector) {
            return await this.page.$eval(this.selector + ' ' + args.selector, el => el.outerHTML);
        }
        return await this.page.$eval(this.selector, el => el.outerHTML);
    }

    async href(args) {
        if (args.selector) {
            return await this.page.$eval(this.selector + ' ' + args.selector, el => el.href);
        }
        return await this.page.$eval(this.selector, el => el.href);
    }

    async attr(args) {
        if (args.selector) {
            return await this.page.$eval(this.selector + ' ' + args.selector, (el, args) => el.getAttribute(args.name), args);
        }
        return await this.page.$eval(this.selector, (el, args) => el.getAttribute(args.name), args);
    }

    async content(args) {
        return new Content(this.page, this.selector + ' ' + args.selector);
    }

    async list(args) {
        if (args.hasOwnProperty('listSelector')) {
            return await new Content(this.page, this.selector + ' ' + args.listSelector).list({selector: args.selector});
        }

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

module.exports = Element;