




// Loader.jsx
import React from "react";

export default function Loader({ size = 36, text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-full border-4 border-t-transparent animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: "rgba(99,102,241,0.25)",
          borderTopColor: "rgb(79 70 229)", // indigo-600
        }}
      />
      <div className="text-sm text-slate-600">{text}</div>
    </div>
  );
}


