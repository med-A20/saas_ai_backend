// routes/openai.js

const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();
const bodyparser = require("body-parser");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.post('/', async (req, res) => {
  try {
    const { prompt, amount = 1, resolution = "512x512" } = req.body;

    // Validate request body parameters before proceeding
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const aiResponse = await openai.createImage({
      n: amount,
      size: resolution,
      response_format: 'url',
      prompt: prompt,
    });

    const imageUrl = aiResponse.data.data;
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("The error is", error);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

module.exports = router;
