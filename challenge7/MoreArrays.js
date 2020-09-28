require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("More Arrays", function(){
    this.timeout(30000);
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

    it("Copart popular items two dimensional array", async function() {
        await driver.get("https://www.copart.com");
        await driver.wait(until.elementLocated(copart.MakesModelsPopularItems_Links), 5000);
        const popular = await driver.findElements(copart.MakesModelsPopularItems_Links);
        
        elementArray = [];
        for(let el in popular){
            let text = await popular[el].getText();
            let href = await popular[el].getAttribute("href");
            elementArray.push({text: text, href: href});
        }

        for (let el in elementArray){
            await driver.get(elementArray[el].href);
            const url = await driver.getCurrentUrl();
            assert.include(url, elementArray[el].href);
        }

        await driver.sleep(500);
    });
 

    after(async function () {
        await driver.sleep(1000);
        return await driver.quit();
    });
});