import express, { Application, Request, Response } from "express";
import OpenAI from 'openai';
import cors from "cors";

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: API_KEY,
    baseURL: "http://localhost:3040/v1", // Ensure your local proxy or mock server is running on this URL
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the OpenAI API!");
});

app.post('/completions', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
        });
        res.json(completion);
    } catch (error) {
        console.error("Error during OpenAI API call:", error);
        res.status(500).send("Server error");
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
