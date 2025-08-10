import Url from "../models/url.model.js";
import shortid from "shortid";

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  const short_code = shortid.generate();
  const baseUrl = `${req.protocol}://${req.get("host")}`;


  try {
    const newUrl = await Url.create({ original_url: originalUrl, short_code });
    res.json({ shortUrl: `${baseUrl}/${short_code}` });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};


export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ created_at: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};