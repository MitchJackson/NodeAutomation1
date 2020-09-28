require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("If/Else/Switch", function(){
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

    it("Counts type of porsche and number of damage types", async function() {
        await driver.get("https://www.copart.com");
        utilities.SendKeys(driver, copart.Search_Input, "porsche");
        utilities.Click(driver, copart.Search_Btn);
        
        await driver.wait(until.elementLocated(copart.ResultRowCount_Select), 5000);
        utilities.Click(driver, copart.ResultRowCount_Select);
        utilities.Click(driver, copart.ResultRowCount_Option("100"));

        let models = await driver.findElements(copart.ModelColumn);
        let damage = await driver.findElements(copart.DamageColumn);
        while(models.length < 100){
            models = await driver.findElements(copart.ModelColumn);
            damage = await driver.findElements(copart.DamageColumn);
        }

        const modelTextArr = [];
        for (let el in models){
            const elText = await models[el].getText();
            modelTextArr.push(elText);
        }
        modelTextArr.sort();


        console.log("Porsche models: ");

        var current = null;
        var cnt = 0;
        for (var i = 0; i < modelTextArr.length; i++) {
            if (modelTextArr[i] != current) {
                if (cnt > 0) {
                    console.log(current + ' - ' + cnt);
                }
                current = modelTextArr[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            console.log(current + ' - ' + cnt);
        }

        let rearEndCount = 0;
        let frontEndCount = 0;
        let dentScratchCount = 0;
        let undercarriageCount = 0;
        let miscCount = 0;
        for(let el in damage){
            const text = await damage[el].getText();

            switch(text){
                case "REAR END":
                    rearEndCount++;
                    break;
                case "FRONT END":
                    frontEndCount++;
                    break;
                case "MINOR DENT/SCRATCHES":
                    dentScratchCount++;
                    break;
                case "UNDERCARRIAGE":
                    undercarriageCount++;
                    break;
                default:
                    miscCount++;
                    break;
            }
        }

        console.log("");
        console.log("Rear end damage: " + rearEndCount);
        console.log("Front end damage: " + frontEndCount);
        console.log("Minor dent and scratch damage: " + dentScratchCount);
        console.log("Undercarriage damage: " + undercarriageCount);
        console.log("Misc damage: " + miscCount);
    });
 

    after(async function () {
        return await driver.quit();
    });
});