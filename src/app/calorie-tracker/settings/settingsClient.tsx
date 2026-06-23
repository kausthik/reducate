"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserData {
  name: string;
  email: string;
  heightCm: number | null;
  startingWeightKg: number | null;
  currentWeightKg: number | null;
  targetWeightKg: number | null;
  dailyCalorieTarget: number;
}

interface Props { initialData: UserData; }

function calcBMI(weight: number, height: number) {
  const h = height / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

function bmiLabel(bmi: number) {
  if (bmi < 18.5) return { text: "Underweight", color: "#60a5fa" };
  if (bmi < 25)   return { text: "Healthy weight", color: "#10b981" };
  if (bmi < 30)   return { text: "Overweight", color: "#f59e0b" };
  return              { text: "Obese", color: "#f43f5e" };
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SettingsClient({ initialData }: Props) {
  const [form, setForm] = useState({
    name: initialData.name,
    heightCm: initialData.heightCm?.toString() ?? "",
    startingWeightKg: initialData.startingWeightKg?.toString() ?? "",
    targetWeightKg: initialData.targetWeightKg?.toString() ?? "",
    dailyCalorieTarget: initialData.dailyCalorieTarget.toString(),
  });

  // Weight logger state
  const [todayWeight, setTodayWeight] = useState(initialData.currentWeightKg?.toString() ?? "");
  const [weightSave, setWeightSave] = useState<SaveState>("idle");
  const [weightMsg, setWeightMsg] = useState("");

  // Profile save state
  const [profileSave, setProfileSave] = useState<SaveState>("idle");
  const [profileMsg, setProfileMsg] = useState("");

  const bmi = form.heightCm && todayWeight
    ? calcBMI(Number(todayWeight), Number(form.heightCm))
    : null;
  const bmiInfo = bmi ? bmiLabel(bmi) : null;

  const tdee = Number(form.dailyCalorieTarget);
  const deficit = todayWeight && form.targetWeightKg
    ? Number(todayWeight) > Number(form.targetWeightKg) ? "Losing" : "Gaining"
    : null;

  async function saveProfile() {
    setProfileSave("saving");
    setProfileMsg("");
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          heightCm: form.heightCm ? Number(form.heightCm) : undefined,
          startingWeightKg: form.startingWeightKg ? Number(form.startingWeightKg) : undefined,
          targetWeightKg: form.targetWeightKg ? Number(form.targetWeightKg) : undefined,
          dailyCalorieTarget: Number(form.dailyCalorieTarget),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setProfileSave("error"); setProfileMsg(data.error || "Failed to save"); return; }
      setProfileSave("saved");
      setProfileMsg("Saved successfully");
      setTimeout(() => setProfileSave("idle"), 2500);
    } catch {
      setProfileSave("error");
      setProfileMsg("Something went wrong");
    }
  }

  async function logWeight() {
    if (!todayWeight || Number(todayWeight) <= 0) {
      setWeightMsg("Please enter a valid weight.");
      return;
    }
    setWeightSave("saving");
    setWeightMsg("");
    try {
      const res = await fetch("/api/weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weightKg: Number(todayWeight),
          date: new Date().toISOString().split("T")[0],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setWeightSave("error"); setWeightMsg(data.error || "Failed to log"); return; }
      setWeightSave("saved");
      setWeightMsg("Weight logged ✓");
      setTimeout(() => setWeightSave("idle"), 2500);
    } catch {
      setWeightSave("error");
      setWeightMsg("Something went wrong");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0f0f11", border: "1px solid #2a2a30",
    borderRadius: 8, padding: "10px 12px", color: "#f0f0f0", fontSize: 14,
    boxSizing: "border-box", outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12, color: "#666",
    marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f11", color: "#f0f0f0", fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1e1e24", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6366f1,#f43f5e)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>CalTrack</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/calorie-tracker" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>Dashboard</Link>
          <Link href="/calorie-tracker/progress" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>Progress</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>Manage your profile</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>Settings</h1>
        </div>

        {/* ── Today's weight logger ── */}
        <section style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>⚖️ Log today's weight</h2>
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px" }}>Recorded daily to track your trend and BMI.</p>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Weight (kg)</label>
              <input
                type="number" step="0.1" min="20" max="300"
                value={todayWeight}
                onChange={(e) => setTodayWeight(e.target.value)}
                placeholder="e.g. 72.5"
                style={inputStyle}
              />
            </div>
            <button
              onClick={logWeight}
              disabled={weightSave === "saving"}
              style={{
                padding: "10px 20px", borderRadius: 8, border: "none", fontWeight: 700,
                fontSize: 14, cursor: weightSave === "saving" ? "not-allowed" : "pointer",
                background: weightSave === "saved" ? "#059669" : "linear-gradient(135deg,#6366f1,#818cf8)",
                color: "#fff", whiteSpace: "nowrap", transition: "background 0.2s",
              }}>
              {weightSave === "saving" ? "Saving…" : weightSave === "saved" ? "Logged ✓" : "Log weight"}
            </button>
          </div>

          {/* Live BMI preview */}
          {bmi && bmiInfo && (
            <div style={{ marginTop: 16, background: "#0f0f11", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>YOUR BMI</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: bmiInfo.color }}>{bmi}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: bmiInfo.color }}>{bmiInfo.text}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                  {bmi < 18.5 ? "Below 18.5" : bmi < 25 ? "18.5 – 24.9" : bmi < 30 ? "25 – 29.9" : "30 and above"}
                </div>
              </div>
            </div>
          )}

          {weightMsg && (
            <div style={{ marginTop: 10, fontSize: 12, color: weightSave === "error" ? "#f87171" : "#10b981" }}>{weightMsg}</div>
          )}
        </section>

        {/* ── Profile settings ── */}
        <section style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>👤 Profile</h2>
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px" }}>Your personal details and body measurements.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={initialData.email} disabled
                style={{ ...inputStyle, color: "#555", cursor: "not-allowed" }} />
            </div>
            <div>
              <label style={labelStyle}>Height (cm)</label>
              <input type="number" min="100" max="250" placeholder="e.g. 175"
                value={form.heightCm} onChange={(e) => setForm({ ...form, heightCm: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </section>

        {/* ── Goals ── */}
        <section style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>🎯 Goals</h2>
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px" }}>Set your targets to track progress accurately.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Daily calorie target (kcal)</label>
              <input type="number" min="500" max="9000" placeholder="e.g. 2000"
                value={form.dailyCalorieTarget} onChange={(e) => setForm({ ...form, dailyCalorieTarget: e.target.value })} style={inputStyle} />
              {/* Calorie guide */}
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {[{ label: "Lose weight", cal: 1600 }, { label: "Maintain", cal: 2000 }, { label: "Gain muscle", cal: 2500 }].map((p) => (
                  <button key={p.label} onClick={() => setForm({ ...form, dailyCalorieTarget: p.cal.toString() })}
                    style={{ padding: "5px 10px", background: form.dailyCalorieTarget === p.cal.toString() ? "#6366f1" : "#0f0f11",
                      color: form.dailyCalorieTarget === p.cal.toString() ? "#fff" : "#666",
                      border: "1px solid #2a2a30", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                    {p.label} · {p.cal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Starting weight (kg)</label>
              <input type="number" step="0.1" min="20" max="300" placeholder="e.g. 80"
                value={form.startingWeightKg} onChange={(e) => setForm({ ...form, startingWeightKg: e.target.value })} style={inputStyle} />
              <div style={{ fontSize: 11, color: "#555", marginTop: 5 }}>Used as the baseline in your progress chart.</div>
            </div>

            <div>
              <label style={labelStyle}>Target weight (kg)</label>
              <input type="number" step="0.1" min="20" max="300" placeholder="e.g. 70"
                value={form.targetWeightKg} onChange={(e) => setForm({ ...form, targetWeightKg: e.target.value })} style={inputStyle} />
            </div>

            {/* Goal summary card */}
            {form.targetWeightKg && todayWeight && (
              <div style={{ background: "#0f0f11", border: "1px solid #1e1e24", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>GOAL SUMMARY</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#555" }}>To lose/gain</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>
                      {Math.abs(Number(todayWeight) - Number(form.targetWeightKg)).toFixed(1)} kg
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#555" }}>Direction</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: deficit === "Losing" ? "#10b981" : "#6366f1" }}>
                      {deficit ?? "—"}
                    </div>
                  </div>
                  {tdee > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: "#555" }}>Daily target</div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{tdee} kcal</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Save button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 13, color: profileSave === "error" ? "#f87171" : "#10b981" }}>
            {profileMsg}
          </div>
          <button
            onClick={saveProfile}
            disabled={profileSave === "saving"}
            style={{
              padding: "12px 28px", borderRadius: 10, border: "none", fontWeight: 700,
              fontSize: 14, cursor: profileSave === "saving" ? "not-allowed" : "pointer",
              background: profileSave === "saved" ? "#059669" : "linear-gradient(135deg,#6366f1,#818cf8)",
              color: "#fff", transition: "background 0.2s",
            }}>
            {profileSave === "saving" ? "Saving…" : profileSave === "saved" ? "Saved ✓" : "Save changes"}
          </button>
        </div>

        {/* ── Danger zone ── */}
        <section style={{ marginTop: 40, borderTop: "1px solid #1e1e24", paddingTop: 28 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#555", margin: "0 0 16px" }}>Account</h2>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2a2a30",
              color: "#f87171", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Sign out
          </button>
        </section>
      </div>
    </div>
  );
}