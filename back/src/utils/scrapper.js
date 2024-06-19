const puppeteer = require('puppeteer')
// Needed to go over the cloudfare antibot
const antibotbrowser = require('antibotbrowser')

const fs = require('fs')
const { log } = require('console')

const ArrayElements = []
const scrapper = async (url) => {
  // Needed to go over the cloudfare antibot
  const antibrowser = await antibotbrowser.startbrowser()

  const browser = await puppeteer.connect({
    browserWSEndpoint: antibrowser.websokcet,
    headless: false
  })
  //  From here is normal

  const page = await browser.newPage()
  await page.goto(url)
  await page.setViewport({ width: 1080, height: 1024 })

  // Remove the banner
  // try {
  //   await page.waitForSelector('#cookiesAcceptAll')
  //   await page.$eval('#cookiesAcceptAll', (el) => {
  //     el.click()
  //   })
  // } catch {
  //   console.log('No cookies Banner')
  // }

  // Start the scraping
  console.log(`Starting Scraping of ${url} ...`)
  repeat(browser, page)
}

const repeat = async (browser, page) => {
  await page.waitForSelector('#category-list-product-grid')

  let Elements = await page.$$('#category-list-product-grid > a')

  if (Elements.length == 0) {
    await setTimeout(() => {
      console.log('No Elements - Wait longer')
    }, 5000)
    Elements = await page.$$('#category-list-product-grid > a')
  }

  for (Element of Elements) {
    let name = await Element.$eval('h3', (el) => el.textContent)
    let img = await Element.$eval('img', (el) => el.src)
    let price = null
    // When discount the inside the price container there is a div, if no discount not go under
    let priceContainer = await Element.$('.product-card__price-container > div')
    if (priceContainer) {
      price = await priceContainer.$eval('span:first-child', (el) =>
        parseFloat(el.textContent.slice(0, el.textContent.length - 1))
      )
    } else {
      price = await Element.$eval('.product-card__price-container > span:first-child', (el) =>
        parseFloat(el.textContent.slice(0, el.textContent.length - 1))
      )
    }
    laptop = {
      name,
      price,
      img
    }
    ArrayElements.push(laptop)
  }

  //  Click for the next page
  try {
    await page.$eval("[aria-label='Página siguiente']", (el) => el.click())
    await page.waitForNavigation()
    console.log(`Data read: ${ArrayElements.length}`)
    repeat(browser, page)
  } catch {
    // There is no more next page button
    writejson()
    browser.close()
  }
}
const writejson = () => {
  fs.writeFile('./products.json', JSON.stringify(ArrayElements), () => {
    console.log('Data saved in JSON')
  })
}
scrapper('https://www.pccomponentes.com/portatiles')
