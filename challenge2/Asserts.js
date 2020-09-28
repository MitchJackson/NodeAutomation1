require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("Asserts suite", function(){
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

    it("Asserts that Porsche is found in Copart.com", async function() {
        await driver.get("https://www.copart.com");
        utilities.SendKeys(driver, copart.Search_Input, "exotics");
        utilities.Click(driver, copart.Search_Btn);
        
        let porscheFound = false;
        await driver.wait(until.elementLocated(copart.MakeColumn), 5000);
        const elArray = await driver.findElements(copart.MakeColumn);
        const elTextArray = await elArray.map(async (el) => {
            return await el.getText();
        })

        elArray.forEach(async (el) => {
            const elText = await el.getText();
            console.log(elText);

            if (elText == "PORSCHE"){
                porscheFound = true;
            }
        });
        
        // no idea why i need this but i guess i do
        await driver.sleep(1000);

        assert.isTrue(porscheFound, "Porsche are not found in the search results for 'exotics'.");
    });
 

    after(function () {
        return driver.quit();
    });
});