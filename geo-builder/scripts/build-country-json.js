const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT = path.join(__dirname, "../output/destinations_master.csv");

const OUTPUT = path.join(__dirname, "../../public/data/countries");

if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
}

const countries = {};

fs.createReadStream(INPUT)
    .pipe(csv())
    .on("data", (row) => {

        const code = (row.countryCode || "").trim().toUpperCase();
        const name = (row.name || "").trim();

        if (!code || !name) return;

        if (!countries[code]) {
            countries[code] = [];
        }

        countries[code].push({
            geonameId: Number(row.geonameId),
            name,
            latitude: Number(row.latitude),
            longitude: Number(row.longitude),
            category: row.category,
            subcategory: row.subcategory,
            featured: row.featured === "true",
            priority: Number(row.priority || 0)
        });

    })
    .on("end", () => {

        Object.keys(countries).forEach(code => {

            const seen = new Set();

            const cleaned = countries[code]
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter(item => {

                    const key = item.name.toLowerCase();

                    if (seen.has(key)) return false;

                    seen.add(key);

                    return true;

                });

            fs.writeFileSync(
                path.join(OUTPUT, `${code.toLowerCase()}.json`),
                JSON.stringify(cleaned, null, 2)
            );

            console.log(`${code}: ${cleaned.length}`);

        });

        console.log("✅ Finished");
    });