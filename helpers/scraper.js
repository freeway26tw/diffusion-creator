const puppeteer = require('puppeteer')
const createError = require('http-errors')

module.exports.getInfo = async function (description) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    })
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
    )
    const site = `https://search.books.com.tw/search/query/key/${description}/cat/BKA`
    await page.goto(site, {
      waitUntil: "domcontentloaded"
    })

    const result = await page.$eval('#search_block_1 > div > div > div > div.table-searchbox.clearfix > div:nth-child(1) > div > div:nth-child(1) > div.box > a', (element) => element.href)

    await page.goto(result, {
      waitUntil: "domcontentloaded"
    })

    const title = await page.$eval('.type02_p002 h2', (element) => element.textContent)
    let ISBN = await page.$eval('.bd li', (element) => element.textContent)
    ISBN = ISBN.slice('ISBN：'.length)
    const coverImg = await page.$eval('#M201106_0_getTakelook_P00a400020052 > img', (element) => element.src)

    await browser.close()
    return { title, ISBN, coverImg }
  } catch (error) {
    throw createError(400, 'Scraper Error')
  }
}