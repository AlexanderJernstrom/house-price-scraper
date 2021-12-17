import { Browser } from "puppeteer";
import { URLS_WITH_PAGE_NUMBER } from "../constants/urlsWithPageNumber";

const listingsScraper = async (browser: Browser) => {
  const allLinks: string[] = [];
  for (const url of URLS_WITH_PAGE_NUMBER) {
    const page = await browser.newPage();
    await page.goto(url);
    await page.setDefaultNavigationTimeout(0);
    const result = await page.evaluate(() => {
      const listings: HTMLAnchorElement[] = Array.from(
        document.querySelectorAll("a.sold-property-link")
      );
      const links = listings.map(
        (listing) => listing.getAttribute("href") || ""
      );
      return Promise.resolve(links);
    });

    result.forEach((link) => {
      allLinks.push(link);
    });
    await page.close();
  }
  return allLinks;
};

export default listingsScraper;
