import { Browser } from "puppeteer";
import { Listing } from "src";
import data from "../../municipalititesByPrice.json";

// Fields we want:
// address
// Price
// Bedrooms
// Square meter
// Lot Size
// Price per Square meter

const listingScraper = async (
  browser: Browser,
  url: string
): Promise<Listing> => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.setDefaultNavigationTimeout(0);
  const listing = await page.evaluate((data) => {
    const municipality = document.querySelector(
      ".sold-property__metadata.qa-sold-property-metadata"
    )?.textContent;
    const municipalityCode = data.find(
      (x: any) => x["Områden"] === municipality?.match(x["Områden"])?.[0]
    )?.Plats;

    const listingPropertiesList = Array.from(
      document.querySelector("dl.sold-property__attributes")
        ?.children as HTMLCollection
    ).map((element) => element.textContent);
    const squareMetersIndex = listingPropertiesList.findIndex((x: any) =>
      x.includes("Boarea")
    );

    const squareMeter =
      Number(
        listingPropertiesList[squareMetersIndex + 1]
          ?.replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ) || 0;
    const listing = {
      municipality: municipalityCode,
      price: Number(
        document
          .querySelector("span.sold-property__price-value")
          ?.innerHTML.replace(/[^\d.-]/g, "")
      ),
      rooms: Number(
        document
          .querySelector(
            "#page-content > div.column.large > div.sold-property.qa-sold-property > div.sold-property__details > dl.sold-property__attributes > dd:nth-child(6)"
          )
          ?.innerHTML.replace("rum", "")
          .replace(",", ".")
      ),
      squareMeter,
      pricePerSquareMeter: Number(
        document
          .querySelector(
            "#page-content > div.column.large > div.sold-property.qa-sold-property > div.sold-property__details > dl.sold-property__price-stats > dd:nth-child(2)"
          )
          ?.innerHTML.replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ),
    };
    return Promise.resolve(listing);
  }, data);
  await page.close();
  return listing;
};

export default listingScraper;
