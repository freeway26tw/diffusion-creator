const puppeteer = require('puppeteer')

module.exports.getInfo = async function (description) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const site = `https://search.books.com.tw/search/query/key/${description}/cat/BKA`
  await page.goto(site, {
    waitUntil: "domcontentloaded"
  })

  const result = await page.$eval('#search_block_1 > div > div > div > div.table-searchbox.clearfix > div:nth-child(1) > div > div:nth-child(1) > div.box > a', (element) => element.href)

  await page.goto(result, {
    waitUntil: "domcontentloaded"
  })

  const title = await page.$eval('.type02_p002 h2', (element) => element.textContent)

  const ISBN = await page.$eval('.bd li', (element) => element.textContent)
  
  await browser.close()
  return {title, ISBN}
}