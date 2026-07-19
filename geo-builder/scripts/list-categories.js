const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT = path.join(
  __dirname,
  "../output/destinations_master.csv"
);

const categories = new Map();

fs.createReadStream(INPUT)
  .pipe(csv())
  .on("data", (row) => {
    const category = (row.category || "").trim();

    if (!category) return;

    categories.set(
      category,
      (categories.get(category) || 0) + 1
    );
  })
  .on("end", () => {
    console.log("");

    [...categories.entries()]
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, count]) => {
        console.log(`${count}  ${name}`);
      });
  });