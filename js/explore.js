fetch("../backend/api/get_pgs.php")
  .then(response => response.json())
  .then(data => {
    const pgList = document.getElementById("pg-list");
    pgList.innerHTML = ""; // clear old content

    data.data.forEach(pg => {

      const div = document.createElement("div");
      div.classList.add("pg-card");

      div.innerHTML = `
      <div class="pg-left">
        <img src="${pg.image || 'https://via.placeholder.com/120'}" alt="PG">
      </div>

      <div class="pg-info">
        <h3>${pg.name}</h3>
        <p class="pg-meta">₹${pg.rent} / month • ${pg.gender}</p>
        <p class="pg-desc">${pg.description ? pg.description.substring(0, 90) : "No description"}...</p>
      </div>

      <div class="pg-action">
        <button class="view-btn" data-id="${pg.id}">
          View Details →
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

  const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-buttons button");

let allPGs = [];

fetch("../backend/api/get_pgs.php")
  .then(res => res.json())
  .then(data => {
    allPGs = data.data;
    render(allPGs);
  });

function render(data) {
    const pgList = document.getElementById("pg-list");
    pgList.innerHTML = "";

    data.forEach(pg => {
        const div = document.createElement("div");
        div.classList.add("pg-card");

        div.innerHTML = `
          <div class="pg-left">
            <img src="${pg.image || 'https://via.placeholder.com/120'}">
          </div>

          <div class="pg-info">
            <h3>${pg.name}</h3>
            <div class="pg-tags">
                <span>₹${pg.rent}/month</span>
                <span>${pg.gender}</span>
            </div>
            <p>${pg.description ? pg.description.substring(0, 90) : "No description"}...</p>
          </div>

          <div class="pg-action">
            <button class="view-btn" data-id="${pg.id}">
              View →
            </button>
          </div>
        `;

        div.querySelector(".view-btn").addEventListener("click", () => {
            window.location.href = `details.html?id=${pg.id}&from=explore`;
        });

        pgList.appendChild(div);
    });
}

/* 🔍 SEARCH */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = allPGs.filter(pg =>
        pg.name.toLowerCase().includes(value)
    );
    render(filtered);
});

/* 🎯 FILTER */
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.filter;

        if (type === "all") {
            render(allPGs);
        } else {
            render(allPGs.filter(pg => pg.gender === type));
        }
    });
});