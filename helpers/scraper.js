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

  const content = await page.$eval('body > div.container_24.main_wrap.clearfix > div > div:nth-child(6) > div.grid_19.alpha > div:nth-child(1) > div > div.content', (element) => element.textContent)

  const ISBN = await page.$eval('body > div.container_24.main_wrap.clearfix > div > div:nth-child(6) > div.grid_19.alpha > div.mod_b.type02_m058.clearfix > div > ul:nth-child(1) > li:nth-child(1)', (element) => element.textContent)
  
  await browser.close()
  return {content, ISBN}
}