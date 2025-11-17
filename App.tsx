// App.tsx
// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FridgeMateHome from "./pages/home";
import ImageUpload from "./pages/imageUpload"; 
import ContactPage from "./pages/ContactPage"; // if you have one
import FridgeMateAbout from "./pages/FridgeMateAbout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<FridgeMateHome />} />

        {/* IMAGE UPLOAD PAGE */}
        <Route path="/imageUpload" element={<ImageUpload />} />

        <Route path="/about" element={<FridgeMateAbout />} />

        {/* CONTACT PAGE (optional) */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
