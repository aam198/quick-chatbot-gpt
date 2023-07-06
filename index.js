const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// POST request endpoint



// const { Configuration, OpenAIApi } = require("openai")
// require('dotenv').config()

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration);

// console.log(process.env.TEST);
// console.log(openai)