const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


const conversationArr = [
  {
    role: 'system',
    content: 'You are useful assistance.' //this is the instruction
  }
];

app.get('/api/conversation', (req, res) => {
  res.json(conversationArr);
});

// POST request endpoint
app.post('/api/conversation', (req, res) => {
  // getting prompt question from request
  const { prompt } = req.body;

  const newSpeechBubble = {
    role: 'user',
    content: userInput,
  };

  conversationArr.push(newSpeechBubble);
  openai.chat
    .create({
      messages: conversationArr,
    })
    .then((response) => {
      const chatResponse = response.data.choices[0].message.content;

      const chatBubble = {
        role: 'assistant',
        content: chatResponse,
      };

      conversationArr.push(chatBubble);

      res.json({ response: chatResponse });
    })
    .catch((error) => {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));






