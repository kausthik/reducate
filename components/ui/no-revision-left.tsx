export default function NoRevisionsLeft() {
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
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* open box back flaps */}
        <path
          d="M20 46 L60 30 L100 46 L100 50 L60 66 L20 50 Z"
          fill="#F3F4F6"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* left flap */}
        <path
          d="M20 46 L60 62 L60 66 L20 50 Z"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* right flap */}
        <path
          d="M100 46 L60 62 L60 66 L100 50 Z"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* box body front */}
        <path
          d="M24 52 L60 68 L60 96 L24 80 Z"
          fill="#F9FAFB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* box body side */}
        <path
          d="M96 52 L60 68 L60 96 L96 80 Z"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        {/* dashed empty indicator inside box mouth */}
        <path
          d="M28 54 L60 68 L92 54"
          stroke="#9CA3AF"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: "#111827",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, sans-serif",
          }}
        >
          No revisions left for today
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            color: "#6B7280",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, sans-serif",
          }}
        >
          Great Buddy, you have completed your all revisions.
        </p>
      </div>
    </div>
  );
}