function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("PG ID:", id);

fetch(`../backend/api/get_details.php?id=${encodeURIComponent(id)}`)
  .then(res => res.json())
  .then(data => {
    const pg = data.data;

    const container = document.getElementById("pg-details");

    container.innerHTML = `
  <div class="hero-text">
    <h1>${escapeHtml(pg.name)}</h1>
    <p class="price">₹${escapeHtml(pg.rent)}</p>
    <p>${escapeHtml(pg.description)}</p>
    <button class="book-btn" id="bookBtn">Book Now</button>
  </div>
`;

    document.getElementById("bookBtn").addEventListener("click", () => {
      const safeName = escapeHtml(pg.name);
      const safeRent = escapeHtml(pg.rent);
      if (confirm(`Confirm booking for "${safeName}"?\n\nRent: ₹${safeRent}/month\n\nWe will process your request shortly.`)) {
        alert("Booking request submitted! The PG owner will contact you soon.");
      }
    });
  })
  .catch(err => console.error(err));
