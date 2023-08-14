const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!configuration.apiKey) {
  throw new Error("Please provide a valid OPENAI_API_KEY");
}

const openai = new OpenAIApi(configuration);

// Body-parser middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   prompt:prompt
    model : 'gpt-3.5-turbo',
    messages : [{role: "user", content:prompt}]
    });

    res.status(200).json({ data: response.data.choices[0].message });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
