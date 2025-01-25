const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with Al image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A realistic, wide shot of the bustling port of Alexandria, Egypt, circa 300 BC. Numerous large wooden ships with sails are docked, loading and unloading goods. The city\'s iconic lighthouse, the Pharos, stands tall in the background, bathed in warm sunlight. People in ancient Egyptian attire mill about the docks. The atmosphere is lively and full of activity. Capture the vibrant colors of the city and the diverse mix of people.",\n    "contentText": "In ancient Alexandria, a city alive with trade and innovation, a different kind of \'treasure\' was brewing. It wasn\'t gold, but knowledge."\n  },\n  {\n    "imagePrompt": "A realistic, close-up shot of a young scholar sitting at a wooden table, deeply engrossed in writing on papyrus scrolls with a quill pen. The room is dimly lit by oil lamps and lined with towering bookshelves filled with countless scrolls. Details of the scrolls show Greek and Egyptian text. Focus on the scholar\'s intense concentration and the texture of the ancient writing materials.",\n    "contentText": "Within its grand Library, countless scrolls were being meticulously copied and translated."\n  },\n {\n    "imagePrompt": "A realistic, medium shot showing three scholars from different cultures - a Greek, an Egyptian, and a Persian - working together, discussing and comparing texts. They are surrounded by open scrolls and maps. The setting is a study area within the Library of Alexandria. Show the collaborative spirit and intellectual exchange.",\n    "contentText":"Scholars from across the known world came together, sharing ideas and forging a global understanding."\n  },\n  {\n    "imagePrompt": "A realistic, medium shot of a damaged papyrus scroll with faded ink. The edges are torn and show wear over time. It rests on an old wooden table. Emphasize the fragility and age of the artifact, suggesting the passage of time and the potential loss of knowledge.",\n    "contentText":"But this incredible collection faced threats. Fire and political turmoil took their toll."\n  },\n  {\n    "imagePrompt":"A realistic, medium shot depicting a room with fire damage, with shelves partially collapsed and blackened papyrus scrolls scattered on the floor. Smoke lingers in the air. Show the destruction and loss of valuable historical texts.",\n    "contentText":"Much of this incredible knowledge was tragically lost to history."\n  },\n{\n     "imagePrompt": "A realistic shot of a single papyrus scroll, slightly tattered but still readable, carefully handled by a modern historian in a dimly lit museum. A soft light shines on the text, highlighting its historical value. The background is out of focus, ensuring the focus remains on the ancient artifact.",\n      "contentText":"Yet, fragments survived. Clues scattered across time, whispering tales of a city dedicated to wisdom."\n  },\n    {\n    "imagePrompt": "A realistic, close-up shot showing a person using a magnifying glass to study intricate ancient script on a papyrus scroll. The details of the writing are clear, and the lighting is focused on the scroll and the person\'s hands. This image emphasizes the ongoing effort to understand the past.",\n    "contentText": "Even today, we piece together the legacy of the Library of Alexandria, a reminder that the pursuit of knowledge is a timeless quest."\n    }\n]\n```\n',
        },
      ],
    },
  ],
});
