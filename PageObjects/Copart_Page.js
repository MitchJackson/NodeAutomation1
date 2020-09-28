var By = require('selenium-webdriver').By;

class Copart {
    constructor(driver){
        this.driver = driver;
    }

    // home page
    Search_Input = By.id("input-search");
    Search_Btn = By.xpath("//button[contains(text(),'Search')]");
    MakesModelsPopularItems_Links = By.xpath("//h4[text()='Makes/Models']/../../following-sibling::div//ul/li/a");

    // search results page
    MakeColumn = By.xpath("//tbody/tr/td[5]/span");
    ModelColumn = By.xpath("//tbody/tr/td[6]/span");
    DamageColumn = By.xpath("//tbody/tr/td[12]/span");
    ResultRowCount_Select = By.xpath("//div[@id='serverSideDataTable_length']//select");
    ResultRowCount_Option(text) { return By.xpath("//div[@id='serverSideDataTable_length']//select/option[text()='" + text + "']");}
    ModelFilter_Input = By.xpath("//a[text()='Model']/../following-sibling::div//input");
    ModelFilter = By.xpath("//a[text()='Model']");
    ModelFilter_Checkbox(text) { return By.xpath("//abbr[@value='" + text + "']/preceding-sibling::input");}
}

module.exports = Copart;