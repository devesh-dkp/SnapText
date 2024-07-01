require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

let model;

async function initializeModel() {
  try {
    model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Model initialized successfully");
  } catch (error) {
    console.error("Error initializing model:", error);
  }
}

initializeModel();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use(express.static('dist'));

app.post('/generate', async (req, res) => {
  try {
    if (!model) {
      throw new Error("Model is not initialized");
    }

    let { prompt } = req.body;
    prompt = `Please extract the meaningful text from the provided content and format it in CSV format. The first row should be headers representing the keywords. Each subsequent row should contain the corresponding values for these keywords. Discard any garbage or irrelevant data. ${prompt}`;
    // Assuming generateContent expects an array of prompts
    const result = await model.generateContent([prompt]);

    // Handle result accordingly based on the API's response structure
    const response = await result.response;
    let text = response.text();
    let start = text.indexOf("```csv\n");
    let end = text.indexOf("```", start + 6);
    text = text.substring(start + 6, end).trim();

    res.json({ text });

  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

app.post('/feedback', (req, res) => {
  const { contactType, feedback, email } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
      user: 'deveshpandey.dp2@gmail.com', // Your email address
      pass: process.env.emailpass // Your email password
    }
  });

  // Set up email data
  const mailOptions = {
    from: 'deveshpandey.dp2@gmail.com',
    to: 'deveshpandey.dp2+docread@gmail.com', // Recipient email address
    subject: `New Feedback: ${contactType}`,
    text: `You have received new feedback from ${email}:\n\n${feedback}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Feedback submitted successfully');
  });
});

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
