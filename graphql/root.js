let Page = require('./types/page');

let root = {
    page: async (args) => {
        let page = new Page();
        await page.load(args.url);
        setTimeout(() => page.close(), 5000);
        return page;
    },
};

module.exports = root;
