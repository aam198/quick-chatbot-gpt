const express = require('express');
require('dotenv').config();
const path = require('path')

const { Configuration, OpenAIApi } = require('openai');
const port = process.env.PORT || 3030;

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const conversationArr = [
  {
    role: 'system',
    content: 'Backend You are useful assistance.' //this is the instruction
  }
];
app.get('/api/conversation', (req, res) => {
  res.json(conversationArr);
});
// POST request endpoint
app.post('/api/conversation', async (req, res) => {
  // getting prompt question from request
  const prompt = req.body.prompt;
  console.log('this is the req.body.promp', req.body.prompt)
  conversationArr.push({
    role: 'user',
    content: prompt
  })
  console.log(conversationArr);

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
   // trigger OpenAI completion
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversationArr,
    });
    // retrieve the completion text from response
    console.log(response.data);
    const completion = response.data.choices[0].message.content;
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