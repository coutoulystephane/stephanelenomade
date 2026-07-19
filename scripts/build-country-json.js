const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../geo-builder/output/destinations_master.csv");
const OUTPUT = path.join(__dirname, "../public/data/countries");

if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
}

const csv = fs.readFileSync(INPUT, "utf8").split("\n");

const header = csv[0].split(",");

const get = (row, name) => row[header.indexOf(name)] || "";

const countries = {};

for (let i = 1; i < csv.length; i++) {

    if (!csv[i].trim()) continue;

    const row = csv[i].split(",");

    const country = get(row, "countryCode");
    const name = get(row, "name");
    const latitude = parseFloat(get(row, "latitude"));
    const longitude = parseFloat(get(row, "longitude"));
    const category = get(row, "category");

    if (!country || !name) continue;

    if (!countries[country])
        countries[country] = [];

    countries[country].push({
        name,
        latitude,
        longitude,
        category
    });
}

Object.keys(countries).forEach(code => {

    const unique = [];

    const seen = new Set();

    countries[code]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(item => {

            const key = item.name.toLowerCase();

            if (seen.has(key)) return;

            seen.add(key);

            unique.push(item);

        });

    fs.writeFileSync(
        path.join(OUTPUT, `${code.toLowerCase()}.json`),
        JSON.stringify(unique, null, 2)
    );

    console.log(`✓ ${code} (${unique.length})`);
});

console.log("Done.");