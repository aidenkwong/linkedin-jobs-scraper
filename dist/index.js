"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const scrapeJobs = (position) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto("https://www.linkedin.com/jobs/search/?keywords=" +
        encodeURIComponent(position));
    yield page.screenshot({ path: "linkedin.png" });
    const data = yield page.evaluate(() => {
        const jobs = [];
        const jobElements = document.querySelectorAll(".base-search-card__info");
        jobElements.forEach((jobElement) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const job = {
                title: ((_b = (_a = jobElement
                    .querySelector(".base-search-card__title")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace(/^\s+|\s+$/g, "")) || "",
                company: ((_d = (_c = jobElement
                    .querySelector(".base-search-card__subtitle")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.replace(/^\s+|\s+$/g, "")) || "",
                location: ((_f = (_e = jobElement
                    .querySelector("span.job-search-card__location")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.replace(/^\s+|\s+$/g, "")) || "",
                salary: ((_h = (_g = jobElement
                    .querySelector("span.job-search-card__salary-info")) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.replace(/^\s+|\s+$/g, "")) || "",
                time: ((_k = (_j = jobElement
                    .querySelector("time.job-search-card__listdate")) === null || _j === void 0 ? void 0 : _j.textContent) === null || _k === void 0 ? void 0 : _k.replace(/^\s+|\s+$/g, "")) || "",
            };
            jobs.push(job);
        });
        return jobs;
    });
    fs_1.default.writeFileSync("output/jobs.json", JSON.stringify(data, null, 2));
    (0, process_1.exit)(0);
});
scrapeJobs("Software Engineer");
//# sourceMappingURL=index.js.map