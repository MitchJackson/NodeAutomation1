require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("Loops", function(){
    this.timeout(20000);
    var driver;
    var copart;
    var utilities;

    before(function () {
        driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();

       copart = new Copart();
       utilities = new SeleniumUtilities();
    });

    it("Pritning list of popular items from Copart.com", async function() {
        await driver.get("https://www.copart.com");
        await driver.wait(until.elementLocated(copart.MakesModelsPopularItems_Links), 5000);
        const popular = await driver.findElements(copart.MakesModelsPopularItems_Links);
        popular.forEach(async (el) => {
            const text = await el.getText();
            const href = await el.getAttribute("href");
            console.log(text, href);
        });
        await driver.sleep(500);
    });
 

    after(async function () {
        return await driver.quit();
    });
});