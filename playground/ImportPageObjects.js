require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
const GoogleHomePage = require('../PageObjects/GoogleHome_Page.mjs');

describe("Playground suite", function(){
    this.timeout(20000);
    var driver;
    var googlePage;

    before(function () {
        driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();

       googlePage = new GoogleHomePage(driver);
    });

    it("I open the google website", async function() {
        driver.get("https://www.google.com");
        driver.findElement(googlePage.SearchInput).sendKeys("zergling attack");
        assert.isTrue(driver.findElement(googlePage.SearchInput).text().equals("zergling attack"), "it doesn't match zergling attack");
    });
 

    after(function () {
        return driver.quit();
    });
});