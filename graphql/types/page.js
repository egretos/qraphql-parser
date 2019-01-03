let engine = require('./../../engine/index');

const page = {
    load: async (url) => {
        const page = await engine.getBrowser().newPage();
        await page.goto(url);
        const result = {
            title: await page.title(),
        };
        await page.close();
        return result;
    }
};

module.exports = page;