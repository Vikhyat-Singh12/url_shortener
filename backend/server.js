import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./utils/db.js";
import Url from "./models/url.model.js";
import urlRoutes from "./routes/url.route.js";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


app.use(cors());
app.use(express.json());


app.use("/api", urlRoutes);
app.get("/api/:shortcode", async (req, res) => {
  try {
    const urlData = await Url.findOne({ short_code: req.params.shortcode });
    if (!urlData) return res.status(404).send("Short URL not found");

    urlData.clicks += 1;
    await urlData.save();

    return res.redirect(urlData.original_url);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});


if (process.env.NODE_ENV === 'production') {
  console.log('Production mode enabled');
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  });
}

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
