let Page = require('./types/page');

let root = {
    page: async (args, context) => {
        return new Page(args, context);
    },
};

module.exports = root;
