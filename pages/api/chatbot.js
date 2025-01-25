import { OpenAI } from "openai"; // Yeni sürümde doğrudan OpenAI import ediliyor

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { chatHistory, userMessage } = req.body;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    ...chatHistory,
                    { role: "user", content: userMessage },
                ],
            });

            const assistantMessage = response.choices[0].message.content;
            res.status(200).json({ message: assistantMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
