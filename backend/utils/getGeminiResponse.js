import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

export const getGeminiResponse = async (content, imageUrl) => {
  try {
    const userContent = {
      role: "user",
      parts: [],
    };
    //1. Get image buffer from url
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString("base64");
      userContent.parts.push({
        inline_data: {
          mime_type: blob.type,
          data: base64Data,
        },
      });
    }
    //2. Add Message COntent
    if (content) {
      userContent.parts.push({ text: content });
    }
    //2. Set Model and Fetch response
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    //3. Generate content using the model
    const result = await model.generateContent({
      contents: [userContent],
    });

    const responseText = result.response.text();
    return { text: responseText };
  } catch {
    console.error("Error fetching Gemini response:", error);
    return { error: "Failed to fetch Gemini response" };
  }
};
