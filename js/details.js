// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("PG ID:", id);

fetch("backend/api/get_pgs.php")
  .then(response => response.json())
  .then(data => {

    const pg = data.data.find(item => item.id == id);

    const container = document.getElementById("pg-details");

    if (pg) {
      container.innerHTML = `
        <h2>${pg.name}</h2>
        <p><strong>Rent:</strong> ₹${pg.rent}</p>
        <p><strong>Deposit:</strong> ₹${pg.deposit}</p>
        <p><strong>Gender:</strong> ${pg.gender}</p>
        <p><strong>Description:</strong> ${pg.description}</p>

      `;
    } else {
      container.innerHTML = "<p>PG not found</p>";
    }

  })
  .catch(error => {
    console.error("Error loading details:", error);
  });
