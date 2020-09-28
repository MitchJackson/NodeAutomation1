var until = require('selenium-webdriver').until;

class SeleniumUtilities {
    SendKeys = async function(driver, by, string){
        await driver.wait(until.elementLocated(by), 5 * 1000);
        await driver.findElement(by).sendKeys(string);
    }

    Click = async function(driver, by){
        await driver.wait(until.elementLocated(by), 5 * 1000);
        await driver.findElement(by).click();
    }
}

module.exports = SeleniumUtilities;