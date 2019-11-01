const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');
    await page.setViewport({width: 1000, height: 1000})

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll('.product_pod'); // Select all Products
        console.log('all em ', elements)

        for (var element of elements){ // Loop through each proudct
            let title = element.childNodes[5].innerText; // Select the title
            let price = element.childNodes[7].children[0].innerText; // Select the price

            data.push({title, price}); // Push an object with the data onto our array
        }

        return data; // Return our data array
    });
    await page.waitFor(5000);
    browser.close();
    return result; // Return the data
};

scrape().then((value) => {
    console.log(value); // Success!
});