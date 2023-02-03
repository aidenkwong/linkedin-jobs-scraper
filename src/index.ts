import { exit } from "process";
import puppeteer from "puppeteer";
import fs from "fs";
import * as readline from "readline";

const scrapeJobs = async (position: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.linkedin.com/jobs/search/?keywords=" +
      encodeURIComponent(position)
  );
  await page.screenshot({ path: "linkedin.png" });

  const data = await page.evaluate(() => {
    const jobs: Array<any> = [];
    const jobElements = document.querySelectorAll(".base-search-card__info");
    jobElements.forEach((jobElement) => {
      const job = {
        title:
          jobElement
            .querySelector(".base-search-card__title")
            ?.textContent?.replace(/^\s+|\s+$/g, "") || "",
        company:
          jobElement
            .querySelector(".base-search-card__subtitle")
            ?.textContent?.replace(/^\s+|\s+$/g, "") || "",
        location:
          jobElement
            .querySelector("span.job-search-card__location")
            ?.textContent?.replace(/^\s+|\s+$/g, "") || "",
        salary:
          jobElement
            .querySelector("span.job-search-card__salary-info")
            ?.textContent?.replace(/^\s+|\s+$/g, "") || "",
        time:
          jobElement
            .querySelector("time.job-search-card__listdate")
            ?.textContent?.replace(/^\s+|\s+$/g, "") || "",
      };
      jobs.push(job);
    });

    return jobs;
  });

  fs.writeFileSync("output/jobs.json", JSON.stringify(data, null, 2));
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What position are you searching for? ", async (answer) => {
  await scrapeJobs(answer);
  rl.close();
  exit(0);
});
