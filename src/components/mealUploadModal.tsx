"use client";

import { useState } from "react";

interface Meal {
 _id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  totalCalories: number;
  createdAt: string;
}

interface Props {
  today: string;
  onClose: () => void;
  onSuccess: (meal: Meal) => void;
}

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function MealUploadModal({
  today,
  onClose,
  onSuccess,
}: Props) {
  const [mealType, setMealType] = useState("lunch");
  const [calorie, setCalorie] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (calorie <= 0) {
      setError("Please enter a valid calorie value.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();

      fd.append("mealType", mealType);
      fd.append("date", today);
      fd.append("totalCalories", calorie.toString());

      const res = await fetch("/api/meals", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save meal.");
        return;
      }

      onSuccess(data.meal);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
      }}>
      <div
        style={{
          background: "#16161a",
          border: "1px solid #1e1e24",
          borderRadius: 18,
          width: "100%",
          maxWidth: 480,
          padding: 28,
        }}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
            }}>
            Log a Meal
          </h2>

          <button onClick={onClose} style={{background: "none",border: "none",color: "#666",cursor: "pointer",fontSize: 20,}}>
            ✕
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 20,
          }}>
          {MEAL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                border: "1px solid",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                background:
                  mealType === type ? "#6366f1" : "transparent",
                color: mealType === type ? "#fff" : "#888",
                borderColor:
                  mealType === type ? "#6366f1" : "#2a2a30",
              }}>
              {type}
            </button>
          ))}
        </div>

        <input
          type="number"
          min="0"
          placeholder="Enter calories consumed"
          value={calorie || ""}
          onChange={(e) => setCalorie(Number(e.target.value))}
          style={{
            width: "100%",
            background: "#0f0f11",
            border: "1px solid #2a2a30",
            borderRadius: 8,
            padding: "10px 12px",
            color: "#fff",
            fontSize: 14,
            marginBottom: 16,
            boxSizing: "border-box",
          }}/>

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            background: loading
              ? "#2a2a30"
              : "linear-gradient(135deg,#6366f1,#818cf8)",
            color: "#fff",
          }}>
          {loading ? "Saving..." : "Save Meal"}
        </button>
      </div>
    </div>
  );
}