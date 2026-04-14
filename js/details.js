// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("PG ID:", id);

fetch(`../backend/api/get_details.php?id=${id}`)
  .then(res => res.json())
  .then(data => {
    const pg = data.data;

    const container = document.getElementById("pg-details");

    container.innerHTML = `
      <div class="hero-text">
        <h1>${pg.name}</h1>
        <p class="price">₹${pg.rent}</p>
        <p>${pg.description}</p>
        <button class="book-btn">Book Now</button>
      </div>
    `;
  })
  .catch(err => console.error(err));


const from = params.get("from");
const backBtn = document.getElementById("back-btn");

if (from === "dashboard") {
    backBtn.href = "owner_dashboard.html";
} else {
    backBtn.href = "explore.html";
}