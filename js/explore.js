function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

fetch("../backend/api/get_pgs.php")
  .then(response => response.json())
  .then(data => {
    const pgList = document.getElementById("pg-list");
    pgList.innerHTML = "";

    data.data.forEach(pg => {

      const div = document.createElement("div");
      div.classList.add("pg-card");

      div.innerHTML = `
        <div class="pg-info">
          <h3>${escapeHtml(pg.name)}</h3>
          <p><strong>Rent:</strong> ₹${escapeHtml(pg.rent)}</p>
          <p><strong>Deposit:</strong> ₹${escapeHtml(pg.deposit)}</p>
          <p><strong>Gender:</strong> ${escapeHtml(pg.gender)}</p>
          <p>${escapeHtml(pg.description).substring(0, 80)}...</p>
        </div>
        <div class="pg-action">
          <button class="view-btn" data-id="${escapeHtml(pg.id)}">
            View Details
          </button>
        </div>
      `;

      div.querySelector(".view-btn").addEventListener("click", () => {
        window.location.href = `details.html?id=${encodeURIComponent(pg.id)}`;
      });

      pgList.appendChild(div);
    });
  })
  .catch(error => console.error("Error:", error));