# 🥗 FridgeMate
Your smart kitchen buddy that turns your fridge ingredients into easy, delicious recipes in seconds. Waste less, cook more, and enjoy every meal.

---

## 📌 Problem Statement
Many households struggle to decide what to cook with available ingredients, leading to food wastage, repetitive meals, and time spent searching for recipes. Existing apps require manual ingredient entry, which is tedious and error-prone. There is a need for an **AI-powered system** that can automatically detect ingredients from fridge or pantry photos and generate personalized, practical recipes instantly, reducing food waste, saving time, and encouraging smarter cooking.

---

## 💡 Why It Matters
- **Reduce food waste:** Helps users utilize perishable ingredients before they spoil.  
- **Save time:** Eliminates manual recipe searches and planning.  
- **Healthy and diverse meals:** Encourages nutritious, creative, and varied recipes.  
- **Practical AI use:** Demonstrates the combination of computer vision and generative AI in daily life.  

---

## 🛠️ Solution
- Automatically identifies ingredients from images of a fridge, pantry, or plate.  
- Uses a **custom-trained YOLOv8 model** for accurate recognition of fruits and  vegetables.
- Integrates a **generative AI (Google Gemini LLM)** with **prompt engineering** to produce step-by-step recipes.  
- Provides **real-time, contextually relevant recipes** with minimal user input.  
- Reduces decision fatigue, encourages sustainable cooking, and maximizes ingredient utilization.  

---

## ⚙️ How It Works
1. **Ingredient Detection**  
   - YOLOv8n model detects ingredients from images.  
   - Handles fruits and vegetables, even in cluttered or low-quality photos.  

2. **Recipe Generation**  
   - Google Gemini LLM generates recipes based on detected ingredients.  
   - **Prompt engineering** allows contextual customization, e.g., “I don’t have an oven” or “Only 20 minutes to cook.”  

3. **Pipeline Optimization**  
   - Fast inference (~2 seconds) with low compute.  
   - Designed for diverse ingredient combinations and real-world fridge scenarios.  

---

## Architecture

```bash
📷 Fridge / Pantry Image 
       ↓
🥦 YOLOv8 Detection 
       ↓
📝 Detected Ingredients 
       ↓
🤖 Google Gemini LLM + Prompt Engineering 
       ↓
🍲 Generated Recipes
```

--- 

## 🔄 Workflow
1️⃣ **User Uploads Image**  
- Frontend sends image → FastAPI receives file  

2️⃣ **Image Processing**  
- Pillow normalizes image format  
- OpenCV handles resizing, color channels, and drawing (if needed)  

3️⃣ **YOLOv8n Detection**  
- Model infers bounding boxes + labels  
- Extracts ingredients list  

4️⃣ **LLM Recipe Generation**  
- Custom prompt includes:  
  - Detected ingredient list  
  - User preferences (optional)  
  - Required style (simple/stepwise/healthy)  
- Google Gemini LLM returns the final recipe text  

5️⃣ **Response to Frontend**  
- Frontend displays:  
  - Detected items  
  - Recipe title  
  - Step-by-step instructions  
  - Tips or variations  

---

## 🗂️ Dataset Description
- **Dataset Size:** 7,255 images of fruits and vegetables  
- **Classes:** 63 distinct classes (tomatoes, spinach, eggs, etc.)  
- **Data Preparation:** Images were labeled, merged, and normalized to ensure high-quality training data  
- **Coverage:** Includes diverse lighting, angles, and cluttered fridge scenarios to improve robustness  

> This custom dataset enables YOLOv8 to accurately detect ingredients in real-world settings, forming the foundation for generating relevant recipes.  

---

## ✨ Features
- **Automatic Ingredient Detection:** Identify fruits and vegetables from images
- **AI-Powered Recipe Generation:** Generate personalized, step-by-step recipes using Google Gemini LLM  
- **Prompt Engineering for Accuracy:** Guides the LLM to produce contextually relevant and creative recipes  
- **Fast and Efficient Pipeline:** Optimized for real-time inference (~2 seconds) with low compute  
- **Handles Cluttered Images:** Detects multiple ingredients even in messy or low-quality fridge images  
- **Saves Time and Reduces Food Waste:** Helps users plan meals efficiently and make the most of available ingredients  

---

## 🖥️ Tech Stack
- **YOLOv8n** → Lightweight + fastest version, ideal for quick inference in a web project  
- **FastAPI** → Faster than Flask, async, auto-docs, perfect for ML APIs  
- **React (Vite)** → Fast dev environment, smooth UI, instant hot reload  
- **Pillow** → Format conversion + dimension prep for ML models  
- **OpenCV** → Pixel-level operations (resizing, color channels, etc.)  
- **Gemini API** → Strong reasoning + natural recipe generation

---

## Backend Setup (FastAPI + Python)

**Run all backend commands inside:**

```
RecipeGenerator/Backend
```

### 1️⃣ Create a virtual environment

```
cd RecipeGenerator/Backend
python -m venv .venv
```

### 2️⃣ Activate the virtual environment

PowerShell:

```
.\.venv\Scripts\Activate.ps1
```

### 3️⃣ Install backend dependencies

Requirements file is in the project root, so install using:

```
pip install -r ../requirements.txt
```

### 4️⃣ Run the FastAPI backend

```
uvicorn app:app --reload --port 8000
```

Backend will now run at:

```
http://localhost:8000
```

API Endpoint:

```
POST /detect_and_generate
```

---

## ⚛️ Frontend Setup (React)

**Run all frontend commands inside:**

```
RecipeGenerator/Frontend
```

### 1️⃣ Install React dependencies

```
cd RecipeGenerator/Frontend
npm install
```

### 2️⃣ Start the development server

```
npm run dev
```

React will run on a port such as:

```
http://localhost:5173
```

Make sure your React API calls point to:

```
http://localhost:8000/detect_and_generate
```

---

## 🔁 Connecting Frontend with Backend

Ensure **both** are running:

* Backend → `http://localhost:8000`
* Frontend → `http://localhost:5173`

If the backend port is different, update the frontend fetch URL accordingly.

---

## 🚀 Future Scope
- **Expanded Ingredient Coverage:** Increase the dataset to include fruits, vegetables, and pantry items (e.g., eggs, bread, grains, spices, packaged foods) to improve **detection accuracy** and **recipe variety**. The system will eventually handle **both fresh and non-perishable ingredients**.  
- **Dietary Preferences & Restrictions:** Incorporate user-specific filters for **vegan**, **gluten-free**, **low-carb**, or **allergy-friendly recipes**.  
- **Multi-Cuisine Suggestions:** Enable recipes from **diverse cuisines** based on detected ingredients.  
- **Smart Grocery Recommendations:** Suggest **missing ingredients** or **alternative substitutes** to complete recipes.  
- **Special User Prompts:** Allow users to provide context or constraints, such as “I don’t have an oven” or “Only 20 minutes to cook,” so the generated recipes respect their **tools**, **preferences**, or **time limits**.  
- **Mobile App Integration:** Develop a **mobile version** for on-the-go ingredient detection and recipe generation.  
- **Continuous Learning:** Improve **detection** and **recipe quality** over time by incorporating **user feedback**.  
---
