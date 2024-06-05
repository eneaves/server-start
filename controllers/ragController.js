const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function initializeNearbyyClient() {
  const module = await import('@nearbyy/core');
  return new module.NearbyyClient({
    API_KEY: process.env.NEARBYY_API_KEY,
  });
}

const nearbyyPromise = initializeNearbyyClient();

const getContextResponse = async (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "The 'message' parameter is required." });
  }

  const nearbyy = await nearbyyPromise;
  const context = await nearbyy.semanticSearch({
    limit: 3,
    query: message,
  });

  if (!context.success) {
    console.error(context.error);
    return res.status(500).send("I'm sorry, I don't understand.");
  }

  const ctxMsg = context.data.items.map((item) => item.text).join('\n\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "If you are given relevant context, answer the user's query with it. If the context does not include the answer, STATE that you don't have enough information to answer the query but still try to answer it without the context.",
        },
        {
          role: 'system',
          content: `RELEVANT CONTEXT TO THE USER'S QUERY:\n ${ctxMsg}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    if (!response.choices || !response.choices.length) {
      throw new Error("No response choices found from OpenAI");
    }

    return res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error generating response from OpenAI.");
  }
}

module.exports = { getContextResponse };
