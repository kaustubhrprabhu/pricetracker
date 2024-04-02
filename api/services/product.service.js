const cheerio = require('cheerio');

const getProductDetails = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Something went wrong');
    };
    const data = await res.text();
    const $ = cheerio.load(data);

    const productTitle = $('span#productTitle').text().trim() ||
        $('span.B_NuCI').text().trim();
    const productPrice = $('span.a-price-whole').first().text().trim().replaceAll(',', '') ||
        $('div._30jeq3._16Jk6d').first().text().trim().replaceAll('₹', '').replaceAll(',', '');
    const productImage = $('img#landingImage').attr('src') ||
        $('img._396cs4._2amPTt._3qGmMb').attr('src') ||
        $('img._2r_T1I._396QI4').attr('src');

    if (!productTitle || !productPrice) return null;

    return {
        url: res.url,
        title: productTitle,
        price: parseFloat(productPrice),
        oldprice: parseFloat(productPrice),
        image: productImage || '',
    }
}

// (async () => {
//     let temp = await getProductDetails('https://www.flipkart.com/portronics-hydra-10-5-0-2-4-ghz-rgb-type-c-charging-mechanical-bluetooth-wireless-gaming-keyboard/p/itmf8e62395463f7?pid=ACCGQGB2KCEPHBUY&lid=LSTACCGQGB2KCEPHBUYRGZBY6&marketplace=FLIPKART&store=6bo%2Fai3%2F3oe&srno=b_1_16&otracker=browse&fm=organic&iid=99b92de9-0e74-4bf0-b6e7-622326077f1c.ACCGQGB2KCEPHBUY.SEARCH&ppt=browse&ppn=browse&ssid=vfas63tyuo0000001711786194646');
//     console.log(temp);
// })();

module.exports = { getProductDetails }