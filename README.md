# 🚀 Code Review Assistant  

🔗 **Live Demo:** https://drive.google.com/file/d/181d6w68dtJ0_dUVUnXzI04PbCsBGvrMs/view?usp=sharing


An AI-powered full-stack application that automatically analyzes source code, detects issues, and generates a structured review report using LLMs (groq or compatible models).  
Users can upload code files through a React interface, and the Node/Express backend processes them, calls the LLM, and optionally stores reports in MongoDB.


## 📌 Features


### 🧠 AI-Powered Code Review
- Detects code issues & potential bugs  
- Identifies anti-patterns & bad practices  
- Suggests improvements & optimizations  

### 📂 Multiple File Upload System
- Add multiple files  
- Remove files dynamically before upload  
- Supports multi-language code input  

### 📊 Code Quality Metrics
- Time Complexity estimation  
- Space Complexity estimation  
- Readability scoring  
- Modularity scoring  
- Maintainability suggestions  

### 🗂️ Structured & Detailed Outputs
- File-wise issues  
- Function-level analysis  
- Global suggestions  
- Overall score  
- **Copy JSON output** with single click  

### 🕒 Reports History System
- All reports saved in MongoDB  
- Sorted by date & time  
- Click on any report to view full details  
- “**Reports**” button → Full history page  

### 👁️ Detailed Issue Viewer
- Expand/collapse file sections  
- View severity-based issues  
- Clear separation of bugs, optimizations, and security issues  

---


## Project Structure

```
code-review-assistant/
├── backend/
│ ├── controllers/
│ │ └── reviewController.js # Handles review creation & retrieval
│ ├── models/
│ │ └── Report.js # MongoDB schema for reports
│ ├── routes/
│ │ └── reviewRoutes.js # API route definitions
│ ├── services/
│ │ └── llmService.js # Groq LLM integration
│ ├── server.js # Express server setup
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── reviewApi.js # API client functions
│ │ ├── components/
│ │ │ ├── FileEditorForm.jsx # Code input form
│ │ │ ├── ReviewResult.jsx # Review display component
│ │ │ └── ScoreCard.jsx # Score visualization
│ │ ├── pages/
│ │ │ ├── NewReviewPage.jsx # Create new review
│ │ │ └── ReportsListPage.jsx # Browse past reviews
│ │ └── App.jsx # Main app component
│ └── package.json
└── README.md
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `backend/` with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/code-review-assistant
LLM_API_KEY=YOUR_OPENAI_OR_OTHER_LLM_KEY
```

## 🔥 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/review`       | Create a new code review |
| GET    | `/api/review`       | Get all saved reviews |
| GET    | `/api/review/:id`   | Get review by ID |

---
## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🖥️ Flow
Upload → Backend → LLM → JSON Review → Save → Display

## 📌 Example JSON Review Output

```json
{
  "score": 83,
  "summary": "Good modularity, needs improvements in error handling.",
  "issues": [
    { "type": "bug", "message": "Missing null check in function X" },
    { "type": "optimisation", "message": "Loop can be replaced with map()" }
  ],
  "recommendations": [
    "Use async/await consistently",
    "Add TypeScript for better type safety"
  ]
}
```

## 🚧 Future Enhancements  
- 🔧 Automatic code fixes  
- 📝 Inline comments  
- 📊 Complexity & performance metrics  
- 🧪 Test case suggestions 


Configure `src/api/reviewApi.js` to point at your backend origin (default `http://localhost:5000`).






## 👤 Author  
Ashwajit Surwade — MERN Stack Developer


