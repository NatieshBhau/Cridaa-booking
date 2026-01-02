const BASE_URL = "http://localhost:4000";

export async function getSlots() {
  const res = await fetch(`${BASE_URL}/api/slots`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}

export async function bookSlot(payload) {
  const res = await fetch(`${BASE_URL}/api/slots/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const error = new Error(errorBody.message || "Booking failed");
    error.response = { data: errorBody };
    throw error;
  }

  return res.json();
}
