fetch("../backend/api/get_pgs.php")
  .then(response => response.json())
  .then(data => {
    const pgList = document.getElementById("pg-list");
    pgList.innerHTML = ""; // clear old content

    data.data.forEach(pg => {

      const div = document.createElement("div");
      div.classList.add("pg-card");

      div.innerHTML = `
        <div class="pg-info">
          <h3>${pg.name}</h3>
          <p><strong>Rent:</strong> ₹${pg.rent}</p>
          <p><strong>Deposit:</strong> ₹${pg.deposit}</p>
          <p><strong>Gender:</strong> ${pg.gender}</p>
          <p>${pg.description.substring(0, 80)}...</p>
        </div>
        <div class="pg-action">
          <button class="view-btn" data-id="${pg.id}">
            View Details
          </button>
        </div>
      `;

      div.querySelector(".view-btn").addEventListener("click", () => {
        window.location.href = `details.html?id=${pg.id}&from=explore`;
      });

      pgList.appendChild(div);
    });
  })
  .catch(error => console.error("Error:", error));