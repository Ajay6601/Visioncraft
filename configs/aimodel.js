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
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image\nprompt in Realistic format for each scene and give me result in JSON format with imagePrompt and\nContentText as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"videoScenes\": [\n    {\n      \"sceneNumber\": 1,\n       \"imagePrompt\": \"A realistic, slightly sepia-toned painting of a bustling marketplace in ancient Alexandria, Egypt, around 300 BC. Focus on the vibrant details: colorful fabrics, various food stalls overflowing with goods, people of different ethnicities bartering and conversing, and the iconic Lighthouse of Alexandria faintly visible in the background.\",\n      \"contentText\": \"Did you know that the world’s first known vending machine was invented by the Greek mathematician Hero of Alexandria? It was designed to dispense holy water in temples.\"\n    },\n    {\n       \"sceneNumber\": 2,\n       \"imagePrompt\": \"A photorealistic close-up view of an ancient vending machine made of clay and metal, with a small coin slot and a mechanism for dispensing a small quantity of water. The style should be slightly worn and aged, showing signs of use.\",\n      \"contentText\": \"This ingenious device, operated by inserting a coin, triggered a lever system releasing a measured amount of water.\"\n    },\n    {\n      \"sceneNumber\": 3,\n       \"imagePrompt\": \"A realistic illustration of a curious crowd gathered around the vending machine in the temple of ancient Alexandria, observing the dispensing of the holy water. The scene should capture their expressions of wonder and awe at this technological marvel.\",\n      \"contentText\": \"Imagine the surprise and wonder of the people witnessing this automated marvel of ancient engineering!\"\n    },\n     {\n      \"sceneNumber\": 4,\n       \"imagePrompt\": \"A realistic representation of the Great Library of Alexandria, with scrolls and books piled up and scholars reading. The library should look majestic with architecture reflecting the period, and light coming through the windows to enhance the scene.\",\n      \"contentText\": \"And while the vending machine was a small invention, Hero's work was part of a larger boom of innovation, all happening in the heart of the intellectual center of the world – the Great Library of Alexandria.\"\n    },\n    {\n       \"sceneNumber\": 5,\n       \"imagePrompt\": \"A realistic, slightly stylized depiction of a scroll being carefully unfolded, revealing ancient Greek text. Focus should be on the intricate details of the script and the texture of the papyrus.\",\n      \"contentText\": \"This era of knowledge produced groundbreaking scientific advancements in many fields, some of which, like this automated dispenser, still seem ahead of its time.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    module.exports = { chatSession };

  
