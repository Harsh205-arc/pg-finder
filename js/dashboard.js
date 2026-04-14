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
            <div class="pg-info">
                <h3 style="color:white;">${pg.name}</h3>
                <p style="color:#cbd5e1;">Rent: ₹${pg.rent}</p>
                <p style="color:#cbd5e1;">Deposit: ₹${pg.deposit}</p>
            </div>

            <div class="pg-action">
                <button class="btn">View</button>
            </div>
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