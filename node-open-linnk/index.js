const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: './.env' });

const headless = JSON.parse(process.env.HEADLESS);
const readListLink = fs.readFileSync('./list.txt', { encoding: 'utf8' }).split('\n');

(async () => {
  const browser = await puppeteer.launch({
    headless: headless,
    defaultViewport: { width: 1000, height: 1000 },
    args: ['--window-size=1000,1000'],
  });
  for (let i = 0; i < readListLink.length; i++) {
    const e = readListLink[i];
    if (!e) continue;
    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    page.goto(e);
    await page.waitForSelector('link[rel=alternate]');
    const arrayLink = await page.evaluate(() => {
      let arrayLink = [];
      let collectionElem = document.querySelectorAll('link[rel=alternate]');
      for (const i of collectionElem) {
        if (!i.getAttribute('hreflang')) continue;
        arrayLink.push(i.href);
      }
      return arrayLink;
    });
    for (let j = 0; j < arrayLink.length; j++) {
      const e = arrayLink[j];
      try {
        const pageLink = await browser.newPage();
        const res = pageLink.goto(e);
        await pageLink.waitForSelector('.footer-menu');
        // if (res._status !== 200) {
        //   fs.writeFileSync('./error.txt', `${e} + ${res._status}`);
        //   continue;
        // }
        await pageLink.$eval('.footer-menu', (e) => {
          e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
        });
        await page.waitForTimeout(3000);
        fs.appendFileSync('./success.txt', `${e}\n`);
        await pageLink._client.send('Page.stopLoading');
        await pageLink.close();
      } catch (error) {
        console.log(error);
        fs.appendFileSync('./error.txt', `${e} + ${error}\n`);
      }
    }
  }
  await browser.close();
})();
