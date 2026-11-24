async function renderBookings() {
  const container = document.getElementById("bookings-list");

  try {
    const bookings = await getBookings();

    if (!bookings || bookings.length === 0) {
      container.innerHTML = "<p>No current bookings found.</p>";
      return;
    }

    const rooms = await getRooms();
    const roomMap = {};
    rooms.forEach((room) => {
      roomMap[room.id] = room.name;
    });

    container.innerHTML = bookings
      .map((booking) => {
        const roomName = roomMap[booking.roomId] || booking.roomId;
        return `
          <div class="booking-item">
            <div>
              <h3>${roomName}</h3>
              <p><strong>Club:</strong> ${booking.clubName}</p>
              <p><strong>Date:</strong> ${booking.date} | <strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Purpose:</strong> ${booking.purpose || "N/A"}</p>
            </div>
            <button data-id="${booking.id}" class="cancel-btn">Cancel</button>
          </div>
        `;
      })
      .join("");

    const cancelButtons = container.querySelectorAll(".cancel-btn");
    cancelButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const bookingId = e.target.getAttribute("data-id");
        handleCancelClick(bookingId);
      });
    });
  } catch (error) {
    container.innerHTML =
      "<p class='status-message error'>Failed to load bookings.</p>";
    console.error(error);
  }
}

async function handleCancelClick(bookingId) {
  try {
    await deleteBooking(bookingId);
    await renderBookings();
  } catch (error) {
    console.error("Failed to cancel booking:", error);
  }
}

document.addEventListener("DOMContentLoaded", renderBookings);