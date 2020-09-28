require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("Try/Catch", function(){
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

    it("Screenshot if skyline is not found", async function() {
        await driver.get("https://www.copart.com");
        utilities.SendKeys(driver, copart.Search_Input, "porsche");
        utilities.Click(driver, copart.Search_Btn);
        
        await driver.wait(until.elementLocated(copart.ResultRowCount_Select), 5000);
        try{
            utilities.Click(driver, copart.ModelFilter);
            utilities.SendKeys(driver, copart.ModelFilter_Input, "skyline");
            await driver.SendKeys(copart.ModelFilter_Input, driver.Key.ENTER);

            utilities.Click(driver, copart.ModelFilter_Checkbox("skyline"));
        } catch(e){
            console.log("Failure");
            await driver.sleep(1000);
            await driver.takeScreenshot().then(
                function(image, err) {
                    require('fs').writeFile('out.png', image, 'base64', function(err) {});
                }
            );
        }
    });
 

    after(async function () {
        await driver.sleep(1000);
        return await driver.quit();
    });
});