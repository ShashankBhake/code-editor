// Import necessary modules
const express = require("express");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5005;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Use the cors middleware
app.use(cors());

app.get("/ping", async (req, res) => {
    return res.send("pong");
});

// Define a route for handling requests
app.get("/getGeminiResponse", async (req, res) => {
    try {
        console.log("Query\n\n");
        // Extract the query from the request
        const query = req.query.query;
        console.log("Query:", req.query);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Get OpenAI response
        const result = await model.generateContent(query);
        const response = await result.response;
        const text = response.text();
        // Extract code from the OpenAI response
        const openaiResponse = text;
        const codeBlockRegex = /```(\w+)([\s\S]+?)```/; // Regex to match code blocks for any language
        const match = openaiResponse.match(codeBlockRegex);


        // Check if there is a match
        if (match && match[2]) {
            // Extracted code
            const extractedCode = match[2].trim();
            // Send the extracted code
            res.send(extractedCode);
        } else {
            // If no code is found, send the full response
            res.send(openaiResponse);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
