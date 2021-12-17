# Hemnet scraper

### About

This is a web scraper that scrapes data about houses from Swedish listing site hemnet (hemnet.se). It scrapes five fields from each house Price, Bedrooms, Square meters, Price per square meter, Municipality. I am using this data to create a statistical model for house prices in Stockholm. You can see the repository [here](https://github.com/AlexanderJernstrom/house-price-predictor).

In the project there is a json file containing all the muncipalities in Stockholm. I have sorted them based on the average house price and then assigning them a number between 1 and 26. 1 is the most expensive municipality and 26 is the cheapest.

In data.csv is data from about 1900 houses in Stockholm.

### How to run

1. Make sure you have node and npm installed on your system.
2. Then run `npm install` in the root folder.
3. After that you should be able to run the dev script by running `npm run dev`.
