// Import necessary modules
const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
const port = 5005;

// Set up OpenAIAPI instance
const openai = new OpenAI(); // Update to use OpenAIAPI

// Use the cors middleware
app.use(cors());

// Define a route for handling requests
app.get("/getOpenAIResponse", async (req, res) => {
    try {
        // Extract the query from the request
        const query = req.query.query;

        // Get OpenAI response
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: query }],
            model: "gpt-3.5-turbo",
        });

        // Extract code from the OpenAI response
        const openaiResponse = completion.choices[0].message.content;
        const codeBlockRegex = /```(\w+)([\s\S]+?)```/; // Regex to match code blocks for any language
        const match = openaiResponse.match(codeBlockRegex);

        // Check if there is a match
        if (match && match[2]) {
            // Extracted code
            const extractedCode = match[2].trim();

            // Send the extracted code as the response
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
    console.log(`Server is running on http://localhost:${port}`);
});
