import { By } from 'selenium-webdriver';

class GoogleHome {
    constructor(driver){
        this.driver = driver;
    }

    SearchInput = By.id("realbox");
}

module.exports = GoogleHome;