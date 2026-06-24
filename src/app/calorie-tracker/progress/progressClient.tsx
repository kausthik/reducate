"use client";

import { useState } from "react";
import Link from "next/link";

interface DayData { date: string; consumed: number; burned: number; net: number; }
interface WeightLog { _id: string; date: string; weightKg: number; bmi?: number; }

interface Props {
  calendarData: DayData[];
  weightLogs: WeightLog[];
  targetWeight: number | null;
  startingWeight: number | null;
  dailyCalorieTarget: number;
  userName: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function SVGLineChart({
  data, yKey, color, targetLine, label, unit,
}: {
  data: { date: string; [key: string]: number | string }[];
  yKey: string;
  color: string;
  targetLine?: number;
  label: string;
  unit: string;
}) {
  const W = 600, H = 180, PL = 44, PR = 16, PT = 16, PB = 32;
  const vals = data.map((d) => Number(d[yKey])).filter((v) => v > 0);
  if (vals.length === 0) return (
    <div style={{ height: H + PB + PT, display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 13 }}>
      No data yet
    </div>
  );

  const minV = Math.min(...vals, targetLine ?? Infinity) * 0.92;
  const maxV = Math.max(...vals, targetLine ?? 0) * 1.05;
  const range = maxV - minV || 1;

  const pts = data
    .map((d, i) => {
      const v = Number(d[yKey]);
      if (v === 0) return null;
      const x = PL + (i / (data.length - 1)) * (W - PL - PR);
      const y = PT + (1 - (v - minV) / range) * H;
      return { x, y, v, date: d.date as string };
    })
    .filter(Boolean) as { x: number; y: number; v: number; date: string }[];

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = pts.length > 1
    ? `${pathD} L ${pts[pts.length - 1].x} ${PT + H} L ${pts[0].x} ${PT + H} Z`
    : "";

  const ticks = 4;
  const [hovered, setHovered] = useState<{ x: number; y: number; v: number; date: string } | null>(null);

  return (
    <svg viewBox={`0 0 ${W} ${H + PT + PB}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y grid */}
      {Array.from({ length: ticks }).map((_, i) => {
        const v = minV + (range * (i / (ticks - 1)));
        const y = PT + (1 - i / (ticks - 1)) * H;
        return (
          <g key={i}>
            <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="#1e1e24" strokeWidth={1} />
            <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#444">
              {Math.round(v)}
            </text>
          </g>
        );
      })}

      {/* Target line */}
      {targetLine && targetLine > minV && targetLine < maxV && (
        <line
          x1={PL} x2={W - PR}
          y1={PT + (1 - (targetLine - minV) / range) * H}
          y2={PT + (1 - (targetLine - minV) / range) * H}
          stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 3"
        />
      )}

      {/* Area */}
      {areaD && <path d={areaD} fill={`url(#grad-${yKey})`} />}

      {/* Line */}
      {pts.length > 1 && <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />}

      {/* X labels — show only first, mid, last */}
      {[0, Math.floor(data.length / 2), data.length - 1].map((i) => {
        const x = PL + (i / (data.length - 1)) * (W - PL - PR);
        return (
          <text key={i} x={x} y={H + PT + PB - 4} textAnchor="middle" fontSize={9} fill="#444">
            {formatDate(data[i].date)}
          </text>
        );
      })}

      {/* Dots + hover */}
      {pts.map((p, i) => (
        <circle
          key={i} cx={p.x} cy={p.y} r={3}
          fill={color} stroke="#16161a" strokeWidth={1.5}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHovered(p)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Tooltip */}
      {hovered && (
        <g>
          <rect x={Math.min(hovered.x - 36, W - 90)} y={hovered.y - 38} width={80} height={28} rx={5} fill="#0f0f11" stroke="#2a2a30" />
          <text x={Math.min(hovered.x - 36, W - 90) + 40} y={hovered.y - 28} textAnchor="middle" fontSize={9} fill="#888">{formatDate(hovered.date)}</text>
          <text x={Math.min(hovered.x - 36, W - 90) + 40} y={hovered.y - 16} textAnchor="middle" fontSize={11} fill="#f0f0f0" fontWeight="bold">{hovered.v} {unit}</text>
        </g>
      )}
    </svg>
  );
}

function SVGBarChart({ data, target }: { data: DayData[]; target: number }) {
  const W = 600, H = 140, PL = 44, PR = 16, PT = 16, PB = 32;
  const maxV = Math.max(...data.map((d) => d.consumed), target) * 1.1 || 2200;
  const barW = Math.max(2, ((W - PL - PR) / data.length) - 2);

  return (
    <svg viewBox={`0 0 ${W} ${H + PT + PB}`} style={{ width: "100%", height: "auto" }}>
      <line
        x1={PL} x2={W - PR}
        y1={PT + (1 - target / maxV) * H}
        y2={PT + (1 - target / maxV) * H}
        stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 3"
      />
      <text x={W - PR + 2} y={PT + (1 - target / maxV) * H + 4} fontSize={8} fill="#f59e0b">goal</text>

      {data.map((d, i) => {
        const x = PL + (i / data.length) * (W - PL - PR) + 1;
        const barH = (d.consumed / maxV) * H;
        const barY = PT + H - barH;
        const over = d.consumed > target;
        return (
          <rect
            key={i} x={x} y={barY} width={barW} height={barH || 1}
            rx={2} fill={over ? "#f43f5e" : "#6366f1"} opacity={d.consumed === 0 ? 0.2 : 0.85}
          />
        );
      })}

      {[0, Math.floor(data.length / 2), data.length - 1].map((i) => {
        const x = PL + (i / data.length) * (W - PL - PR) + barW / 2;
        return (
          <text key={i} x={x} y={H + PT + PB - 4} textAnchor="middle" fontSize={9} fill="#444">
            {formatDate(data[i].date)}
          </text>
        );
      })}

      {[0, 0.5, 1].map((t) => {
        const y = PT + (1 - t) * H;
        return (
          <g key={t}>
            <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="#1e1e24" strokeWidth={1} />
            <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#444">{Math.round(maxV * t)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ProgressClient({
  calendarData, weightLogs, targetWeight, startingWeight, dailyCalorieTarget, userName,
}: Props) {
  const [tab, setTab] = useState<"calories" | "weight" | "summary">("summary");

  // Summary stats
  const activeDays = calendarData.filter((d) => d.consumed > 0).length;
  const avgConsumed = activeDays ? Math.round(calendarData.filter(d => d.consumed > 0).reduce((s, d) => s + d.consumed, 0) / activeDays) : 0;
  const avgBurned = activeDays ? Math.round(calendarData.filter(d => d.burned > 0).reduce((s, d) => s + d.burned, 0) / Math.max(1, calendarData.filter(d => d.burned > 0).length)) : 0;
  const daysUnderGoal = calendarData.filter((d) => d.consumed > 0 && d.consumed <= dailyCalorieTarget).length;
  const weightLoss = ((1550 - (avgConsumed-avgBurned))*activeDays)/7770

  const latestWeight = weightLogs.length ? weightLogs[weightLogs.length - 1] : null;
  const firstWeight = weightLogs.length ? weightLogs[0] : null;
  const weightChange = latestWeight && firstWeight ? (latestWeight.weightKg - firstWeight.weightKg) : null;
  const weightToGoal = latestWeight && targetWeight ? latestWeight.weightKg - targetWeight : null;

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
          <Link href="/calorie-tracker/settings" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>Settings</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>Last 30 days</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>Your progress</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#16161a", border: "1px solid #1e1e24", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["summary", "calories", "weight"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "7px 18px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s",
                background: tab === t ? "#f0f0f0" : "transparent",
                color: tab === t ? "#0f0f11" : "#555" }}>
              {t === "summary" ? "📊 Summary" : t === "calories" ? "🍴 Calories" : "⚖️ Weight"}
            </button>
          ))}
        </div>

        {/* SUMMARY TAB */}
        {tab === "summary" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Days tracked", value: activeDays, unit: "days", color: "#6366f1" },
                { label: "Avg. consumed", value: avgConsumed, unit: "kcal/day", color: "#f59e0b" },
                { label: "Avg. burned", value: avgBurned, unit: "kcal/day", color: "#10b981" },
                { label: "Days under goal", value: daysUnderGoal, unit: `of ${activeDays}`, color: "#a78bfa" },
                { label: "Total Weight Reduced", value: weightLoss, unit: `kg`, color: "#a78bfa" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color, letterSpacing: "-0.02em" }}>{s.value.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.unit}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Weight summary */}
            {(weightChange !== null || weightToGoal !== null) && (
              <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Weight journey</h3>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {startingWeight && <div><div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>STARTING</div><div style={{ fontSize: 20, fontWeight: 700 }}>{startingWeight} kg</div></div>}
                  {latestWeight && <div><div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>CURRENT</div><div style={{ fontSize: 20, fontWeight: 700 }}>{latestWeight.weightKg} kg</div></div>}
                  {targetWeight && <div><div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>TARGET</div><div style={{ fontSize: 20, fontWeight: 700, color: "#10b981" }}>{targetWeight} kg</div></div>}
                  {weightChange !== null && (
                    <div>
                      <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>CHANGE</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: weightChange < 0 ? "#10b981" : "#f43f5e" }}>
                        {weightChange > 0 ? "+" : ""}{weightChange.toFixed(1)} kg
                      </div>
                    </div>
                  )}
                  {weightToGoal !== null && (
                    <div>
                      <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>TO GOAL</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: weightToGoal <= 0 ? "#10b981" : "#f59e0b" }}>
                        {weightToGoal <= 0 ? "✓ Reached!" : `${weightToGoal.toFixed(1)} kg`}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress bar to goal */}
                {startingWeight && targetWeight && latestWeight && startingWeight !== targetWeight && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555", marginBottom: 6 }}>
                      <span>{startingWeight} kg</span><span>{targetWeight} kg</span>
                    </div>
                    <div style={{ height: 8, background: "#0f0f11", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 99,
                        width: `${Math.min(100, Math.max(0, ((startingWeight - latestWeight.weightKg) / (startingWeight - targetWeight)) * 100))}%`,
                        background: "linear-gradient(90deg,#6366f1,#10b981)", transition: "width 0.5s ease"
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#a78bfa", marginTop: 6 }}>
                      {Math.min(100, Math.max(0, Math.round(((startingWeight - latestWeight.weightKg) / (startingWeight - targetWeight)) * 100)))}% of the way there
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Adherence heatmap — simple coloured grid */}
            <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>30-day calorie adherence</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {calendarData.map((d) => {
                  const pct = d.consumed / dailyCalorieTarget;
                  let bg = "#1e1e24";
                  if (d.consumed === 0) bg = "#1e1e24";
                  else if (pct <= 1) bg = `rgba(99,102,241,${0.3 + pct * 0.7})`;
                  else bg = `rgba(244,63,94,${Math.min(1, 0.5 + (pct - 1) * 2)})`;
                  return (
                    <div key={d.date} title={`${formatDate(d.date)}: ${d.consumed} kcal`}
                      style={{ width: 22, height: 22, borderRadius: 4, background: bg, cursor: "default" }} />
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11, color: "#555" }}>
                <span style={{ color: "#1e1e24" }}>■</span> No data &nbsp;
                <span style={{ color: "#6366f1" }}>■</span> Under goal &nbsp;
                <span style={{ color: "#f43f5e" }}>■</span> Over goal
              </div>
            </div>
          </div>
        )}

        {/* CALORIES TAB */}
        {tab === "calories" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Daily calories consumed</h3>
                <span style={{ fontSize: 11, color: "#f59e0b" }}>— goal line</span>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#555" }}>Purple bars = under goal · Red bars = over goal</p>
              <SVGBarChart data={calendarData} target={dailyCalorieTarget} />
            </div>

            <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600 }}>Calories burned (activity)</h3>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#555" }}>Days you logged physical activity</p>
              <SVGLineChart data={calendarData as any} yKey="burned" color="#10b981" label="Burned" unit="kcal" />
            </div>
          </div>
        )}

        {/* WEIGHT TAB */}
        {tab === "weight" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {weightLogs.length === 0 ? (
              <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⚖️</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>No weight logs yet</div>
                <div style={{ fontSize: 13, color: "#555" }}>Log your weight from the dashboard to see your trend here.</div>
              </div>
            ) : (
              <>
                <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Weight over time</h3>
                    {targetWeight && <span style={{ fontSize: 11, color: "#f59e0b" }}>— target: {targetWeight} kg</span>}
                  </div>
                  <p style={{ margin: "0 0 16px", fontSize: 12, color: "#555" }}>All recorded weight entries</p>
                  <SVGLineChart data={weightLogs.map(w => ({ date: w.date, weight: w.weightKg }))} yKey="weight" color="#6366f1" targetLine={targetWeight ?? undefined} label="Weight" unit="kg" />
                </div>

                {weightLogs.some((w) => w.bmi) && (
                  <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600 }}>BMI trend</h3>
                    <p style={{ margin: "0 0 16px", fontSize: 12, color: "#555" }}>
                      Healthy range: 18.5 – 24.9 &nbsp;
                      <span style={{ color: "#f59e0b" }}>— 25 overweight threshold</span>
                    </p>
                    <SVGLineChart
                      data={weightLogs.filter(w => w.bmi).map(w => ({ date: w.date, bmi: w.bmi! }))}
                      yKey="bmi" color="#a78bfa" targetLine={25} label="BMI" unit=""
                    />
                  </div>
                )}

                {/* Weight log table */}
                <div style={{ background: "#16161a", border: "1px solid #1e1e24", borderRadius: 14, padding: "20px 24px" }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>All entries</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[...weightLogs].reverse().slice(0, 10).map((w) => (
                      <div key={w._id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e1e24", fontSize: 13 }}>
                        <span style={{ color: "#888" }}>{formatDate(w.date)}</span>
                        <div style={{ display: "flex", gap: 24 }}>
                          <span><strong>{w.weightKg}</strong> kg</span>
                          {w.bmi && <span style={{ color: "#a78bfa" }}>BMI {w.bmi}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}