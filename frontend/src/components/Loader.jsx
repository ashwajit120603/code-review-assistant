// import React from "react";

// function Loader() {
//   return (
//     <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
//       <span className="inline-flex h-3 w-3 rounded-full border border-slate-400 border-t-transparent animate-spin" />
//       <span>Analyzing code…</span>
//     </div>
//   );
// }

// export default Loader;




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


