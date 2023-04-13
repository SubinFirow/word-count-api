const httpStatus = require("http-status");
const Websites = require("../models").Websites;
const cheerio = require("cheerio");
const axios = require("axios");
const createWebsite = async (req, res) => {
  const body = req.body;
  const requiredFields = ["url"];
  for (const field of requiredFields) {
    if (!body[field]) {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send(`${field} is required`);
      return;
    }
  }

  try {
    const response = await axios.get(body.url);
    const html = response.data;
    const $ = cheerio.load(html);
    const text = $("body")
      .text()
      .replace(/(<([^>]+)>)/gi, "");
    const wordCount = text.trim().split(/\s+/).length;
    body.wordCount = wordCount;
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }

  const website = await Websites.create(body);
  res.status(httpStatus.CREATED).send(website);
};

const listAllWebsites = async (req, res) => {
  const websites = await Websites.findAll();
  res.status(httpStatus.OK).send(websites);
};

const updateWebsite = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (body.url) {
    try {
      const response = await axios.get(body.url);
      const html = response.data;
      const $ = cheerio.load(html);
      const text = $("body")
        .text()
        .replace(/(<([^>]+)>)/gi, "");
      const wordCount = text.trim().split(/\s+/).length;
      body.wordCount = wordCount;
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
  const website = await Websites.update(body, { where: { id } });
  res.status(httpStatus.OK).send(website);
};
const deleteWebsite = async (req, res) => {
  const id = req.params.id;

  await Websites.destroy({ where: { id } });
  res.status(httpStatus.NO_CONTENT).send();
};
module.exports = {
  createWebsite,
  listAllWebsites,
  updateWebsite,
  deleteWebsite,
};