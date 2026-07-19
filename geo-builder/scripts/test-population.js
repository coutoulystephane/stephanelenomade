const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT = path.join(__dirname, "../output/destinations_master.csv");

let count = 0;

fs.createReadStream(INPUT)
  .pipe(csv())
  .on("data", (row) => {
    if (row.countryCode === "US" && row.category === "City") {
      console.log(row.name, "|", row.population);

      count++;

      if (count >= 20) process.exit();
    }
  });