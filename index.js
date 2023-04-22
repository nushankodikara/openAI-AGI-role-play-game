const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const message = "start a random adventure story";
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        'You are an adventure game AI. please return the data in the following format only {"image":"description for a story related image", "story":"continue the story...", "enemy":trueOrFalse, "playerHealth":"x/100", "enemyHealth":"x/100", "options":["option1","option2","option3","option4"] }',
                },
                { role: "user", content: message },
            ],
        });
        res.send(completion.data.choices[0].message.content);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

function extractJsonFromString(str) {
    const jsonRegex = /\{.*\}/gs;
    const match = str.match(jsonRegex);
    if (!match) {
        return null; // no JSON object found
    }
    return match[0];
}

app.post("/chat", async (req, res) => {
    try {
        const userResponse = req.body.userResponse;
        const story = req.body.story;
        if (!userResponse)
            return res.status(400).send("userResponse is required");
        if (!story) return res.status(400).send("story is required");
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        'return the data in the following format only {"image":"description for a story related image", "story":"continue the story...", "enemy":trueOrFalse, "playerHealth":"x/100", "enemyHealth":"x/100", "options":["option1","option2","option3","option4"] }',
                },
                { role: "assistant", content: story },
                { role: "user", content: userResponse },
            ],
        });
        res.send(
            JSON.parse(
                extractJsonFromString(
                    completion.data.choices[0].message.content
                )
            )
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.post("/image", async (req, res) => {
    try {
        const prompt = req.body.prompt + ", in starry night style";
        if (!prompt) return res.status(400).send("prompt is required");
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });
        const responseData = {
            image_url: response.data.data[0].url,
        };
        res.send(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
