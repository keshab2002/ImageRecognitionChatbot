import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const app = express();
const port = 3001;

// file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Using high-tech technologya for image naming
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Gemini, use your own API key 
const API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});


app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl, filename: req.file.filename });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, imagePath } = req.body;
    
    if (!prompt && !imagePath) {
      return res.status(400).json({ error: 'Prompt or image is required' });
    }

    
    const userContent = {
      role: 'user',
      parts: [],
    };

    if (imagePath) {
      const imageUrl = `${req.protocol}://${req.get('host')}${imagePath}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString('base64');
      
      userContent.parts.push({
        inline_data: {
          mime_type: blob.type,
          data: base64Data
        }
      });
    }

    if (prompt) {
      userContent.parts.push({ text: prompt });
    }

    // Let Gemini Cook
    const result = await model.generateContent({
      contents: [userContent],
    });

    const responseText = result.response.text();
    res.json({ text: responseText });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});