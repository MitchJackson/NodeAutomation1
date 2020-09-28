require('chromedriver');
const { assert, expect } = require('chai');
var webdriver = require('selenium-webdriver');
var Copart = require('../PageObjects/Copart_Page.js');
var SeleniumUtilities = require('../SeleniumUtilities.js');
var until = require('selenium-webdriver').until;

describe("Operators and Functions", function(){
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

    it("Fibonacci test", async function() {
        let x = FibonacciValue(10);
        console.log(x + " - " + inWords(x));
    });
 

    after(async function () {
        return await driver.quit();
    });
});

const FibonacciValue = function(n) {
    if( n == 0 ) return 0;
    if( n == 1 ) return 1;

    const result = FibonacciValue(n-1) + FibonacciValue(n-2);

    return result;
}

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}