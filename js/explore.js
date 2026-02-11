// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchPGs();
});

/*
    Fetch PG data from backend API
*/
function fetchPGs() {
    fetch("/pg_finder/backend/api/get_pgs.php")
        .then(response => {
            // Check if server responded correctly
            if (!response.ok) {
                throw new Error("Server error");
            }
            return response.json();
        })
        .then(result => {
            // Debug: see full API response in console
            console.log("API Response:", result);

            if (result.status === "success") {
                renderPGs(result.data);
            } else {
                showError("Failed to load PGs");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            showError("Something went wrong while loading PGs");
        });
}

/*
    Render PG cards on screen
*/
function renderPGs(pgs) {
    const container = document.getElementById("pg-list");

    // Clear previous content
    container.innerHTML = "";

    // If no PGs found
    if (!pgs || pgs.length === 0) {
        container.innerHTML = "<p>No PGs found.</p>";
        return;
    }

    // Loop through each PG
    pgs.forEach(pg => {
        const card = document.createElement("div");
        card.classList.add("pg-card");

        card.innerHTML = `
            <h3>${pg.name}</h3>
            <p><strong>Rent:</strong> ₹${pg.rent}</p>
            <p><strong>Deposit:</strong> ₹${pg.deposit}</p>
            <p><strong>Distance:</strong> ${pg.distance} km</p>
            <p><strong>Food:</strong> ${pg.food == 1 ? "Yes" : "No"}</p>
            <p><strong>For:</strong> ${pg.gender}</p>
            <hr>
        `;

        container.appendChild(card);
    });
}

/*
    Show error message on screen
*/
function showError(message) {
    const container = document.getElementById("pg-list");
    container.innerHTML = `<p style="color:red;">${message}</p>`;
}
