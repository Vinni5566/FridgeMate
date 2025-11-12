
# 💡 Solution

FridgeMate: AI-Based Recipe Generator from Fridge Photos

---

## Overview

To address the challenge of deciding “what to cook with what you have,” we propose an AI-powered web application that automatically identifies food ingredients from an uploaded photo and generates suitable recipe suggestions using generative AI.

The solution combines **computer vision (CV)** for ingredient recognition and **large language models (LLMs)** for recipe creation, offering a seamless, smart, and interactive cooking assistant for everyday use.

---

## How It Works

- **Image Upload** – The user takes or uploads a photo of their fridge, pantry, or ingredients.
- **Ingredient Detection** – A YOLO-based object detection model identifies and labels the visible ingredients in the image.
- **Data Processing** – The detected ingredients are converted into a list (e.g., ["tomato", "cheese", "bread"]).
- **Recipe Generation** – A Language Model (LLM) like GPT or Llama uses these ingredients as a prompt to generate a creative recipe including:
  
          - Dish name
          - Ingredients list
          - Step-by-step preparation
          - Optional nutritional or customization tips
  
- **User Display** – The recipe is displayed neatly on a React-based frontend with options to save, share, or regenerate new variations.

---

## Example Scenario

**Input:**
A user uploads a photo showing eggs, tomatoes, onions, and bread.

**AI Process:**

- CV model detects: ["eggs", "tomatoes", "onions", "bread"]
- LLM prompt: “Generate a breakfast recipe using eggs, tomatoes, onions, and bread.”

**Output (Generated Recipe):**
Recipe: Spicy Tomato Egg Sandwich

- Beat eggs with chopped onions and tomatoes.
- Cook on a pan until fluffy.
- Toast the bread and layer the egg mixture between slices.
- Serve hot with optional cheese or sauce.

✅ In under 10 seconds, the user gets a ready-to-cook idea without typing a word.

---

## System Architecture

**Frontend (React):**
- User uploads photo.
- Displays ingredients and generated recipe.

**Backend (FastAPI):**
- Handles image upload and prediction.
- Runs YOLO/Detectron2 for ingredient detection.
- Calls LLM API (e.g., OpenAI GPT or open-source Llama) for recipe text generation.

**AI Models:**
- YOLOv8 (Object Detection): Pre-trained or fine-tuned on food datasets (Food-101, IndianFood14).
- LLM (Text Generation): Generates creative, structured recipes from detected ingredients.

---

## Tech Stack

- Component	Technology
- Frontend	React, Tailwind CSS
- Backend	FastAPI (Python)
- Model Frameworks	PyTorch, YOLOv8
- Language Model	GPT / Llama
- Data Sources	Food-101, Open Images (food subset)
- Deployment	Render / Vercel / Docker (optional)

---

## Key Features

- 📸 Automatic Ingredient Detection — Upload photo, AI detects items instantly.
- 🧠 AI Recipe Generation — Get unique recipes using detected ingredients.
- ⚙️ Real-Time Processing — FastAPI backend enables near-instant suggestions.
- 🌍 Customizable Recipes — Option to specify dietary preferences (vegetarian, high-protein, low-calorie, etc.)
- 💾 Save & Share Recipes — Users can bookmark or share their generated dishes.

---

## Advantages

- Eliminates the need for manual input of ingredients.
- Reduces food waste by suggesting recipes for unused items.
- Encourages healthy, creative home cooking.
- Demonstrates real-world synergy of CV + LLM in a simple, user-friendly tool.

---

## Expected Impact

This solution empowers users to cook smarter, waste less, and rely more on AI for daily decision-making. It represents a practical, impactful use case of generative AI — one that blends convenience, sustainability, and creativity into a single experience.

---
