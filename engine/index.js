let puppeteer = require('puppeteer');

let engine = {
    browser: null,
    start: async () => {
        if (this.browser != null) {
            this.stop();
        }

        this.browser = await puppeteer.launch({headless: true});
        console.log('Running a Google chrome with PID '.green + `${this.browser.process().pid}`.blue);
    },
    stop: () => {
        this.browser.close();
    },
    getBrowser: () => { return this.browser; }
};

module.exports = engine;