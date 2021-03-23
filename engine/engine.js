let puppeteer = require('puppeteer');

class Engine {
    /** @var <engine> */
    static instance = null;

    /**
     * @returns self
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new this;
        }

        return this.instance;
    }

    async start () {
        await this.stop();

        /** @var !Promise<!Puppeteer.Browser> */
        this.browser = await puppeteer.launch({headless: true});
        console.log('Running a Google chrome with PID '.green + `${this.getBrowser().process().pid}`.blue);

        return this;
    }

    async stop () {
        if (await this.isRunning()) {
            this.browser.close();
            console.log('Google chrome closed '.red);
        }

        return this;
    }

    /**
     * !Promise<!Puppeteer.Browser>
     */
    getBrowser ()  { return this.browser; }

    isRunning ()  { return this.getBrowser() != null; }

    isNotRunning () {
        return this.getBrowser() == null;
    }

    /**
     * Start engine if it not started
     *
     * @returns {Promise<void>}
     */
    async up()  {
        if( this.isNotRunning() ) {
            await this.start();
        }

        return this;
    }
}

module.exports = Engine;