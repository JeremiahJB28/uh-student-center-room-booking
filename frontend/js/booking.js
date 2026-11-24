async function populateRoomSelect() {
  const select = document.getElementById("room-select");

  try {
    const rooms = await getRooms();
    const options = rooms
      .map(
        (room) =>
          `<option value="${room.id}">${room.name} (Capacity: ${room.capacity})</option>`
      )
      .join("");

    select.innerHTML =
      '<option value="">-- Select a room --</option>' + options;
  } catch (error) {
    console.error("Failed to load rooms:", error);
  }
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById("form-status");
  statusEl.className = "status-message";
  statusEl.textContent = "Submitting booking...";

  const bookingData = {
    roomId: document.getElementById("room-select").value,
    clubName: document.getElementById("club-name").value,
    date: document.getElementById("date").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    purpose: document.getElementById("purpose").value,
  };

  try {
    const result = await createBooking(bookingData);

    if (result.error) {
      statusEl.className = "status-message error";
      statusEl.textContent = `Error: ${result.error}`;
    } else {
      statusEl.className = "status-message success";
      statusEl.textContent = "Booking successfully created!";
      event.target.reset();
    }
  } catch (error) {
    statusEl.className = "status-message error";
    statusEl.textContent = "Failed to connect to the server.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});