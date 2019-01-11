let ContentList = require('./contentList');

class Content {
    constructor (page, selector) {
        this.page = page;
        this.selector = selector;
        this.page.evaluate(arg => {window['test'] = el => {
            let path = [], parent;
            parent = el.parentNode;
            while (parent) {
                let tag = el.tagName, siblings;
                path.unshift(
                    el.id ? `#${el.id}` : (
                        siblings = parent.children,
                            [].filter.call(siblings, sibling => sibling.tagName === tag).length === 1 ? tag :
                                `${tag}:nth-child(${1+[].indexOf.call(siblings, el)})`
                    )
                );
                el = parent;
            }
            return `${path.join(' > ')}`.toLowerCase();
        }}, ContentList.getSelector);
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
            let res = document.querySelectorAll(selector);
            for (let key in res) {
                console.dir(res[key]);
            }
        }, args.selector);
        return res;
    }

    async addFunc(func) {
        await this.page.evaluate(() => {
            window[func.name] = func;
            window['teeet']= 'asd';
            alert('ohoh');
        });
    }
}

module.exports = Content;