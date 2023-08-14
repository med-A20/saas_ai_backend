const express = require("express");
const Replicate = require("replicate");

const bodyparser = require("body-parser");

const router = express.Router();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

router.get("/", (req, res) => {
  res.json({ message: "This is an example route" });
});

router.post("/", async ({ body: { prompt } }, res) => {
  try {
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    res.status(200).send({ data: response }); // Use shorthand syntax
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
