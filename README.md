# **Image Recognition Chatbot**  
 

React + Node app that uses gemini api for image recognization and further conversation

## **Tech Stack**  
- **Frontend**: React + Vite  
- **Backend**: Node.js + Express  
- **AI**: Google Gemini API  
- **Styling**: CSS  


## **Configure API Key**  
Add your Gemini API key in:  
`server/index.js`  
```javascript
const API_KEY = 'YOUR_API_KEY'; // Replace this
```

## **Temp Image Storage**
Image uploaded by user will get temporarily get soted in server/uploads


## **Folder Structure**  
```
gemini-app/
├── client/          
│   ├── src/
│   │   ├── components/
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/          
│   ├── uploads/     
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```
