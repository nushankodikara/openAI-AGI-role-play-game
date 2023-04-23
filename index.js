const express = require("express");
var cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

app.get("/newStory/:type", async (req, res) => {
    const type = req.params.type;
    console.log("New Story");
    try {
        const message = `start a random adventure story in the style of ${type}`;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        'You are an adventure game AI. please return the data in the following format only { "story":"continue the story...", "enemy":trueOrFalse, "playerHealth":"x/100", "enemyHealth":"x/100", "options":["option1","option2","option3","option4"] }',
                },
                { role: "user", content: message },
            ],
        });
        // console.log(completion.data.choices[0].message.content);
        res.send(completion.data.choices[0].message.content);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    // res.send({
    //     image: "You are standing at the entrance of a dark cave.",
    //     story: "You traverse deep into the cave, following the dim light of your torch. After a while, you come across a fork in the path. The left path looks narrow, but the right path is dark and foreboding. Suddenly, you hear a faint growling noise coming from the right path. What do you want to do?",
    //     enemy: true,
    //     playerHealth: "100/100",
    //     enemyHealth: "75/100",
    //     options: [
    //         "Take the left path",
    //         "Investigate the growling noise",
    //         "Retreat from the cave",
    //     ],
    // });
});

function extractJsonFromString(str) {
    const jsonRegex = /\{.*\}/gs;
    const match = str.match(jsonRegex);
    if (!match) {
        console.log("No JSON object found");
        return null;
    }
    return match[0];
}

app.post("/continueStory/:type", async (req, res) => {
    const type = req.params.type;
    console.log("Continue Story");
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
                    role: "user",
                    content: `continue the ${type} like story in the following format only { "story":"continue the story...", "enemy":trueOrFalse, "playerHealth":"x/100", "enemyHealth":"x/100", "options":["option1","option2","option3","option4"] }`,
                },
                { role: "assistant", content: story },
                { role: "user", content: userResponse },
            ],
        });
        // console.log(completion.data.choices[0].message.content);
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

    // res.send({
    //     image: "<insert image of the beast here>",
    //     story: "You slowly approach the growling noise, readying your weapon as you walk. As you turn the corner, you are confronted by a snarling, fur-covered beast with razor-sharp teeth. It's an enemy!",
    //     enemy: true,
    //     playerHealth: "100/100",
    //     enemyHealth: "100/100",
    //     options: ["Fight the enemy", "Try to calm the beast", "Run away"],
    // });
});

app.post("/image", async (req, res) => {
    console.log("New Image");
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
