const Content = require('./content');

class ContentList {
    constructor (page, selector) {
        this.page = page;
        this.selector = selector;
    }

    async list() {
        await this.page.$$eval(this.selector, el => el.innerText);
    }

    async content(args) {
        return new Content(this.page, args.selector);
    }

    static getSelector (el) {
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
    };
}

module.exports = ContentList;