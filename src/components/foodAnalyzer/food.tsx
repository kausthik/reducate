"use client";
import { useState } from "react";
import { analyzeFood } from "@/src/actions/analyzeFood";

interface FoodItem {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  confidence: number;
}

interface FoodData {
  items: FoodItem[];
  total: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

export default function FoodAnalyzer() {
  const [data, setData] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const b64 = (reader.result as string).split(",")[1];
      const res = await analyzeFood(b64, file.type);
      if (!res.error) setData(res);
      setLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} />
      
      {loading && <p>Analyzing image...</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Detected Foods</h2>

          {data.items.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>
              <p>Calories: {item.calories} kcal</p>
              <p>Protein: {item.protein}g</p>
              <p>Carbs: {item.carbs}g</p>
              <p>Fat: {item.fat}g</p>
              <p>Confidence: {(item.confidence * 100).toFixed(0)}%</p>
            </div>
          ))}

          <h2>Total Nutrition</h2>
          <p>Calories: {data.total.calories} kcal</p>
          <p>Protein: {data.total.protein}g</p>
          <p>Carbs: {data.total.carbs}g</p>
          <p>Fat: {data.total.fat}g</p>
        </div>
      )}
    </div>
  );
}