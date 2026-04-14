const ownerId = localStorage.getItem("owner_id");

if (!ownerId) {
    window.location.href = "owner_login.html";
}

// fetch owner's PGs
fetch(`../backend/api/get_owner_pgs.php?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("pg-list");

        data.data.forEach(pg => {
            const div = document.createElement("div");
            div.className = "pg-card";

            div.innerHTML = `
                <div>
                    <h3>${pg.name}</h3>
                    <p>Rent: ₹${pg.rent}</p>
                    <p>Deposit: ₹${pg.deposit}</p>
                </div>
                <button onclick="viewPG(${pg.id})" class="view-btn">
                    View
                </button>
            `;

            container.appendChild(div);
        });
    });
document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();

    // clear session
    localStorage.removeItem("owner_id");

    // redirect to explore page
    window.location.href = "explore.html";
});

function viewPG(id) {
    window.location.href = `details.html?id=${id}&from=dashboard`;
}