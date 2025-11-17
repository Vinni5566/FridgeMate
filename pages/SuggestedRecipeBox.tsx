// SuggestedRecipeBox.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface SuggestedRecipeBoxProps {
  selected: any;
  setSelected: (value: any) => void;
}

export default function SuggestedRecipeBox({ selected, setSelected }: SuggestedRecipeBoxProps) {

  // === CALL BACKEND WHEN selected.status === "processing" ===
  useEffect(() => {
    if (!selected || selected.status !== "processing") return;

    async function fetchRecipe() {
      try {
        const formData = new FormData();
        formData.append("file", selected.file); // raw File object

        const resp = await fetch("http://localhost:8000/detect_and_generate", {
          method: "POST",
          body: formData,
        });

        const data = await resp.json();

        // Transform backend format → your UI format
        setSelected({
          ...selected,
          status: "done",
          recipe: {
            title: data.recipe.recipe_name || "Generated Recipe",
            ingredients: data.recipe.ingredients || [],
            steps: data.recipe.steps || []
          }
        });

      } catch (err) {
        console.error("Backend error:", err);
        setSelected({
          ...selected,
          status: "done",
          recipe: {
            title: "Error",
            ingredients: [],
            steps: ["Could not fetch recipe. Check server."]
          }
        });
      }
    }

    fetchRecipe();

  }, [selected]);

  // --------------------------------------------------------------------

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-3xl bg-[#fffaf6] p-6 shadow-[8px_8px_22px_#ebe1d8,-8px_-8px_22px_#ffffff] 
                 flex flex-col gap-6 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-orange-600">Suggested Recipe</h2>
        <div className="text-sm text-gray-500">
          {!selected ? "No image selected"
            : selected.status === "processing" ? "Processing..."
            : "Ready"}
        </div>
      </div>

      <div className="rounded-2xl bg-[#fff3e9] p-5 shadow-inner min-h-[220px] flex flex-col">

        {/* NO IMAGE */}
        {!selected && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 gap-3">
            <div className="text-sm">Select or upload an image to generate recipe.</div>
          </div>
        )}

        {/* PROCESSING */}
        {selected && selected.status === "processing" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="text-orange-600 font-semibold">Processing image...</div>
            <div className="text-sm text-gray-600">Analyzing ingredients…</div>
            <motion.div
              className="mt-4 w-36 h-2 bg-orange-100 rounded-full overflow-hidden"
              animate={{ x: ["-100%", "0%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-orange-400" />
            </motion.div>
          </div>
        )}

        {/* DONE + RECIPE */}
        {selected && selected.status === "done" && selected.recipe && (
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img src={selected.url} className="w-28 h-20 rounded-md object-cover border border-orange-100" />
              <div>
                <h3 className="font-bold text-gray-800">{selected.recipe.title}</h3>
                <p className="text-sm text-gray-600 mt-1">AI-generated based on detected ingredients.</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-700">Ingredients</h4>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                {selected.recipe.ingredients.map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg">Cook Now</button>
              <button className="flex-1 py-2 border border-orange-200 text-orange-600 rounded-lg">Save</button>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-3 py-2 bg-white border border-orange-100 text-orange-600 rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
