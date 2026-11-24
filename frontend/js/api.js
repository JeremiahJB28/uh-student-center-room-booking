// ---------- Rooms ----------

async function getRooms() {
  const response = await fetch("/api/rooms");
  return await response.json();
}

async function getRoomById(id) {
  const response = await fetch(`/api/rooms/${id}`);
  return await response.json();
}

// ---------- Bookings ----------

async function getBookings() {
  const response = await fetch("/api/bookings");
  return await response.json();
}

async function createBooking(bookingData) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  return await response.json();
}

async function deleteBooking(id) {
  const response = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}