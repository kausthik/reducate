"use client";

import { useState } from "react";

interface Activity { _id: string; activityType: string; durationMinutes?: number; caloriesBurned: number; notes?: string; }

interface Props {
  today: string;
  onClose: () => void;
  onSuccess: (activity: Activity) => void;
}

const ACTIVITY_PRESETS = [
  { label: "🚶 Walking", type: "walking", calPerMin: 4 },
  { label: "🏃 Running", type: "running", calPerMin: 10 },
  { label: "🚴 Cycling", type: "cycling", calPerMin: 8 },
  { label: "🏊 Swimming", type: "swimming", calPerMin: 8 },
  { label: "🏋️ Gym", type: "gym", calPerMin: 6 },
  { label: "🧘 Yoga", type: "yoga", calPerMin: 3 },
];

export default function ActivityModal({ today, onClose, onSuccess }: Props) {
  const [selected, setSelected] = useState(ACTIVITY_PRESETS[0]);
  const [customType, setCustomType] = useState("");
  const [duration, setDuration] = useState("30");
  const [manualCal, setManualCal] = useState("");
  const [useManual, setUseManual] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const estimatedCal = useManual
    ? Number(manualCal) || 0
    : Math.round(selected.calPerMin * Number(duration));

  async function handleSubmit() {
    if (estimatedCal <= 0) { setError("Please enter valid calories burned."); return; }
    setLoading(true);
    setError("");

    const res = await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityType: customType || selected.type,
        durationMinutes: useManual ? undefined : Number(duration),
        caloriesBurned: estimatedCal,
        date: today,
        notes,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to log activity"); setLoading(false); return; }
    onSuccess(data.activity);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 18, width: "100%", maxWidth: 440, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Log activity</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        {/* Activity presets */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {ACTIVITY_PRESETS.map((p) => (
            <button key={p.type} onClick={() => { setSelected(p); setCustomType(""); }}
              style={{ padding: "10px 6px", borderRadius: 10, border: "1px solid", fontSize: 12, cursor: "pointer", textAlign: "center",
                background: selected.type === p.type && !customType ? "#10b981" : "transparent",
                color: selected.type === p.type && !customType ? "#fff" : "#666",
                borderColor: selected.type === p.type && !customType ? "#10b981" : "#2a2a30" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Custom activity */}
        <input
          type="text"
          placeholder="Or type custom activity…"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          style={{ width: "100%", background: "#0f0f11", border: "1px solid #2a2a30", borderRadius: 8, padding: "9px 12px", color: "#f0f0f0", fontSize: 13, marginBottom: 16, boxSizing: "border-box" }}
        />

        {/* Duration / manual toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setUseManual(false)}
            style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid", fontSize: 12, cursor: "pointer",
              background: !useManual ? "#1e1e24" : "transparent", color: !useManual ? "#f0f0f0" : "#555", borderColor: !useManual ? "#3a3a45" : "#2a2a30" }}>
            By duration
          </button>
          <button onClick={() => setUseManual(true)}
            style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid", fontSize: 12, cursor: "pointer",
              background: useManual ? "#1e1e24" : "transparent", color: useManual ? "#f0f0f0" : "#555", borderColor: useManual ? "#3a3a45" : "#2a2a30" }}>
            Manual calories
          </button>
        </div>

        {!useManual ? (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Duration (minutes)</label>
            <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)}
              style={{ width: "100%", background: "#0f0f11", border: "1px solid #2a2a30", borderRadius: 8, padding: "9px 12px", color: "#f0f0f0", fontSize: 13, boxSizing: "border-box" }} />
          </div>
        ) : (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Calories burned</label>
            <input type="number" min="1" placeholder="e.g. 250" value={manualCal} onChange={(e) => setManualCal(e.target.value)}
              style={{ width: "100%", background: "#0f0f11", border: "1px solid #2a2a30", borderRadius: 8, padding: "9px 12px", color: "#f0f0f0", fontSize: 13, boxSizing: "border-box" }} />
          </div>
        )}

        {/* Estimated cal preview */}
        {estimatedCal > 0 && (
          <div style={{ background: "#0a1a13", border: "1px solid #0d2e1e", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#666" }}>Estimated calories burned</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#10b981" }}>{estimatedCal} kcal</span>
          </div>
        )}

        <input type="text" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", background: "#0f0f11", border: "1px solid #2a2a30", borderRadius: 8, padding: "9px 12px", color: "#f0f0f0", fontSize: 13, marginBottom: 16, boxSizing: "border-box" }} />

        {error && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 12 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", padding: "12px", background: loading ? "#2a2a30" : "linear-gradient(135deg,#059669,#10b981)",
            color: loading ? "#555" : "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Saving…" : "Log activity"}
        </button>
      </div>
    </div>
  );
}
