import puppeteer from "puppeteer";
import express from "express";
import listingsScraper from "./scrapers/listingsScrapers";
import listingScraper from "./scrapers/individualListingScraper";
import { createObjectCsvWriter } from "csv-writer";
const app = express();

export interface Listing {
  price: number;
  rooms: number;
  squareMeter: number;
  pricePerSquareMeter: number;
  municipality: number | undefined;
}

(async () => {
  const csvWrite = createObjectCsvWriter({
    path: "./data.csv",
    header: [
      { id: "price", title: "Price" },
      { id: "rooms", title: "Bedrooms" },
      { id: "squareMeter", title: "Square meters" },

      { id: "pricePerSquareMeter", title: "Price per square meter" },
      { id: "municipality", title: "Municipality" },
    ],
  });
  const browser = await puppeteer.launch();
  const listings = await listingsScraper(browser);
  console.log(listings);

  let listingsData: Listing[] = [];

  for (const listing of listings) {
    console.log(listings.indexOf(listing), listing);
    const listingInformation = await listingScraper(browser, listing);
    listingsData.push(listingInformation);
  }
  csvWrite
    .writeRecords(listingsData)
    .then(() => console.log("Successfully wrote to csv"));
  app.listen(5000);
})();
