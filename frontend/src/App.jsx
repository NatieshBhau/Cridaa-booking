import React, { useEffect, useState } from "react";
import { getSlots, bookSlot } from "./api";
import SlotCard from "./components/SlotCard";

function App() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadSlots = async () => {
    try {
      setLoading(true);
      const data = await getSlots();
      setSlots(data);
    } catch (err) {
      setMessage("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setMessage("Please select a slot");
      return;
    }
    setBookingLoading(true);
    setMessage("");
    try {
      await bookSlot({
        slotId: selectedSlot.id,
        userName,
        phone,
      });
      setMessage(`Booked ${selectedSlot.time} on ${selectedSlot.court}`);
      setUserName("");
      setPhone("");
      setSelectedSlot(null);
      await loadSlots();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-semibold text-indigo-300">
            Cridaa Court Booking
          </h1>
          <p className="text-sm text-slate-300">
            View available slots and book your turf in a few clicks.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Slots list */}
          <div className="md:col-span-2 bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-indigo-200">
                Available time slots
              </h2>
              <button
                onClick={loadSlots}
                className="text-xs px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="text-slate-400 text-sm">Loading slots...</p>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {slots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot?.id === slot.id}
                    onSelect={() =>
                      !slot.isBooked && setSelectedSlot(slot)
                    }
                  />
                ))}
                {slots.length === 0 && (
                  <p className="text-slate-400 text-sm">
                    No slots available.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Booking form */}
          <div className="bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-800">
            <h2 className="text-lg font-medium text-indigo-200 mb-3">
              Booking details
            </h2>

            <form onSubmit={handleBook} className="space-y-3">
              <div className="text-sm text-slate-300 mb-1">
                Selected slot:
                <div className="mt-1 text-xs text-indigo-200">
                  {selectedSlot
                    ? `${selectedSlot.time} • ${selectedSlot.court}`
                    : "No slot selected"}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-400"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full mt-1 py-2 text-sm rounded-md bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-700 font-medium"
              >
                {bookingLoading ? "Booking..." : "Book selected slot"}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-xs text-amber-300">{message}</p>
            )}

            <p className="mt-4 text-[11px] text-slate-500">
              This is a demo booking app for a full-stack assignment. No
              real payments are processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
