import OpenAI from 'openai';

let openai;

const getClient = () => {
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
};

export const getChatResponse = async (messages, language = 'English', contextData = {}) => {
    try {
        const client = getClient();

        let systemPrompt = `You are Finbridge AI, a helpful financial assistant for underserved communities. Keep answers simple, culturally aware, and encouraging. You MUST reply in ${language}.`;

        if (contextData && Object.keys(contextData).length > 0) {
            systemPrompt += `\n\nUSER FINANCIAL CONTEXT (LIVE DATA FROM DASHBOARD):
            - Net Worth: ${contextData.netWorth || 'Unknown'}
            - Assets: ${contextData.assets || 'Unknown'}
            - Liabilities: ${contextData.liabilities || 'Unknown'}
            - Recent Transactions: ${JSON.stringify(contextData.transactions || [])}
            
            INSTRUCTIONS:
            1. You are a highly intelligent, professional, and empathetic financial assistant.
            2. Your source of truth is the Dashboard. If data seems missing or "Unknown", intelligently guide the user to checking their Dashboard connection rather than stating "I don't know".
            3. Answer questions confidently based on the provided data.
            4. If the user asks about something not in the data (e.g. credit score), suggest checking the specific section in the app.
            5. Never apologize for missing data; instead, frame it as an action for the user (e.g. "Connect your accounts to see this").`;
        }

        const completion = await client.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        throw new Error("Failed to get response from OpenAI");
    }
};
