var By = require('selenium-webdriver').By;

class Copart {
    constructor(driver){
        this.driver = driver;
    }

    // home page
    Search_Input = By.id("input-search");
    Search_Btn = By.xpath("//button[contains(text(),'Search')]");

    // search results page
    MakeColumn = By.xpath("//tbody/tr/td[5]/span");
}

module.exports = Copart;