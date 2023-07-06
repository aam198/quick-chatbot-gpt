const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());

const port = process.env.PORT || 6000;

const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

// POST request endpoint
app.post("/ask", async (req, res) => {
  // getting prompt question from request
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
   // trigger OpenAI completion
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    // retrieve the completion text from response
    const completion = response.data.choices[0].text;
    // returned in successful response of /ask request
    return res.status(200).json({
      success: true,
      message: completion,
    })
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));






