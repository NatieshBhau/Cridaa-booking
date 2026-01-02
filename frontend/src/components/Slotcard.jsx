import React from "react";

function SlotCard({ slot, isSelected, onSelect }) {
  const isBooked = slot.isBooked;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isBooked}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left border text-xs sm:text-sm 
        ${
          isBooked
            ? "bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed"
            : isSelected
            ? "bg-indigo-600/20 border-indigo-400 text-indigo-100"
            : "bg-slate-950 border-slate-800 hover:border-indigo-400 hover:bg-slate-900"
        }`}
    >
      <div>
        <div className="font-medium">{slot.time}</div>
        <div className="text-[11px] text-slate-400">{slot.court}</div>
      </div>
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] 
        ${
          isBooked
            ? "bg-red-500/10 text-red-300 border border-red-700/60"
            : "bg-emerald-500/10 text-emerald-300 border border-emerald-700/60"
        }`}
      >
        {isBooked ? "Booked" : "Available"}
      </span>
    </button>
  );
}

export default SlotCard;
