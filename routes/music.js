const express = require("express");
const Replicate = require("replicate");

const bodyParser = require("body-parser");

const router = express.Router();
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

router.get("/", (req, res) => {
  res.json({ message: "This is an example route" });
});

router.post("/", async (req, res) => {
  const {prompt} = req.body
  console.log(prompt);
  try {
    const response = await replicate.run(
      "pphu/musicgen-small:65f6182bfcbc05fc05a28c78f1fbb9ddd1d8fd4ff439f4d9043d6aa8cd515dc1",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    res.status(200).send({ data: response }); // Use shorthand syntax
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
