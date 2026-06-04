import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import https from "https";

const YEAR = 2026;
const PIB_URL = "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2218547";
const IMAGE_BASE =
  "https://www.padmaawards.gov.in/Document/images/awardeesticket/2026";

const DATA_DIR = "src/data";
const IMAGE_DIR = "public/images/awardees";
const OUTPUT_FILE = path.join(DATA_DIR, "awardees.json");

function cleanText(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/\(posthumous\)/gi, "")
    .replace(/\(duo\)\*/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getAwardByIndex(index) {
  if (index <= 5) return "Padma Vibhushan";
  if (index <= 18) return "Padma Bhushan";
  return "Padma Shri";
}

function downloadImage(url, filePath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(filePath);
          return resolve(false);
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", () => {
        file.close();
        resolve(false);
      });
  });
}

async function scrapePadma2026() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  const { data } = await axios.get(PIB_URL);
  const $ = cheerio.load(data);

  const lines = $("body").text().split("\n").map(cleanText).filter(Boolean);

  const awardees = [];

  for (let i = 0; i < lines.length; i++) {
    if (/^\d+$/.test(lines[i])) {
      const serial = Number(lines[i]);

      if (serial >= 1 && serial <= 131) {
        const name = lines[i + 1];
        const field = lines[i + 2];
        const state = lines[i + 3];

        if (!name || !field || !state) continue;

        const award = getAwardByIndex(serial);
        const slug = slugify(name);

        const imageUrl = `${IMAGE_BASE}/${serial}.jpg`;
        const imageFileName = `${serial}-${slug}.jpg`;
        const imagePath = path.join(IMAGE_DIR, imageFileName);

        const downloaded = await downloadImage(imageUrl, imagePath);

        awardees.push({
          id: serial,
          slug,
          name,
          award,
          year: YEAR,
          field: field.replace(
            "Literature ands Education",
            "Literature and Education",
          ),
          state,
          posthumous: /\(posthumous\)/i.test(name),
          duo: /\(duo\)/i.test(name),
          image: downloaded
            ? `/images/awardees/${imageFileName}`
            : "/images/default-awardee.png",
          biography: "",
          contribution: `Recognized for distinguished contribution in the field of ${field}.`,
          source: PIB_URL,
        });
      }
    }
  }

  const unique = Array.from(
    new Map(awardees.map((item) => [item.id, item])).values(),
  );

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(unique, null, 2), "utf-8");

  console.log("Scraping completed.");
  console.log("-------------------");
  console.log("Total awardees:", unique.length);
  console.log("Images saved in:", IMAGE_DIR);
  console.log("JSON saved:", OUTPUT_FILE);
}

scrapePadma2026();
