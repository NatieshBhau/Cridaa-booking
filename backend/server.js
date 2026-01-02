import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const JWT_SECRET = "your-secret-key";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

const slotsFilePath = path.join(__dirname, "slots.json");

// Helper to read slots
function readSlots() {
  const raw = fs.readFileSync(slotsFilePath, "utf-8");
  return JSON.parse(raw);
}

// Helper to write slots
function writeSlots(slots) {
  fs.writeFileSync(slotsFilePath, JSON.stringify(slots, null, 2));
}

// GET: Fetch available slots
app.get("/api/slots", (req, res) => {
  try {
    const slots = readSlots();
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read slots" });
  }
});

// POST: Book a slot
app.post("/api/slots/book", (req, res) => {
  try {
    const { slotId, userName, phone } = req.body;

    if (!slotId || !userName || !phone) {
      return res.status(400).json({ message: "slotId, userName, phone required" });
    }

    const slots = readSlots();
    const slotIndex = slots.findIndex((s) => s.id === slotId);

    if (slotIndex === -1) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slots[slotIndex].isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slots[slotIndex].isBooked = true;
    slots[slotIndex].bookedBy = { userName, phone };
    writeSlots(slots);

    res.json({ message: "Slot booked successfully", slot: slots[slotIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book slot" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
