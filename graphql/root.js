let page = require('./types/page');

let root = {
    page: (args) => {
        return page.load(args.url);
    }
};

module.exports = root;
