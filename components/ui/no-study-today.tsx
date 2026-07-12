"use client"

import { useRouter } from "next/navigation";

export default function NoStudyToday() {
  const router = useRouter();
  return (
    <div
      style={{
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        background: "#ffffff",
        padding: 40,
        textAlign: "center",
      }}
    >
      <svg
        width="130"
        height="110"
        viewBox="0 0 130 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* desk surface */}
        <line
          x1="8"
          y1="92"
          x2="122"
          y2="92"
          stroke="#D1D5DB"
          strokeWidth="2"
        />

        {/* open book - left page */}
        <path
          d="M65 32 L20 40 L20 82 L65 76 Z"
          fill="#F9FAFB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* open book - right page */}
        <path
          d="M65 32 L110 40 L110 82 L65 76 Z"
          fill="#F3F4F6"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* spine */}
        <line
          x1="65"
          y1="32"
          x2="65"
          y2="76"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />

        {/* blank lines on left page (empty, unstudied) */}
        <line x1="27" y1="50" x2="57" y2="46.5" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="27" y1="58" x2="57" y2="54.5" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="27" y1="66" x2="57" y2="62.5" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* blank lines on right page */}
        <line x1="73" y1="46.5" x2="103" y2="50" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="73" y1="54.5" x2="103" y2="58" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="73" y1="62.5" x2="103" y2="66" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* closed clock icon, top right, idle */}
        <circle cx="106" cy="18" r="12" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1.5" />
        <line x1="106" y1="18" x2="106" y2="11" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="106" y1="18" x2="111" y2="18" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />

        {/* zzz sleep marks near book, showing inactivity */}
        <text x="30" y="20" fontSize="10" fill="#D1D5DB" fontFamily="ui-sans-serif, system-ui, sans-serif">z</text>
        <text x="38" y="14" fontSize="13" fill="#D1D5DB" fontFamily="ui-sans-serif, system-ui, sans-serif">z</text>
        <text x="48" y="8" fontSize="16" fill="#D1D5DB" fontFamily="ui-sans-serif, system-ui, sans-serif">z</text>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: "#111827",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
          }}
        >
          You haven't studied anything today
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            color: "#6B7280",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
          }}
        >
          Open a lesson or start a session to keep your streak going.
        </p>
      </div>

      <button
        style={{
          marginTop: 4,
          padding: "10px 22px",
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          background: "#111827",
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
        onClick={()=>{
            router.push('/study-tracker/planner');
        }}
      >
        Start studying
      </button>
    </div>
  );
}