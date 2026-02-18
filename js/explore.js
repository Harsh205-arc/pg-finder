fetch("../backend/api/get_pgs.php")
    .then(response => response.json())
    .then(data => {
        console.log("Data received:", data);

        const pgList = document.getElementById("pg-list");

        data.data.forEach(pg => {
  const div = document.createElement("div");
  div.classList.add("pg-card");

  const button = document.createElement("button");
  button.classList.add("view-btn");
  button.textContent = "View Details";

  button.addEventListener("click", () => {
    window.location.href = `details.html?id=${pg.id}`;
  });

  div.innerHTML = `
    <h3>${pg.name}</h3>
    <p><strong>Rent:</strong> ₹${pg.rent}</p>
    <p><strong>Deposit:</strong> ₹${pg.deposit}</p>
    <p><strong>Gender:</strong> ${pg.gender}</p>
    <p>${pg.description.substring(0, 60)}...</p>

  `;

  div.appendChild(button);
  pgList.appendChild(div);
});

    })
    .catch(error => {
        console.error("Error fetching PGs:", error);
    });

    function viewDetails(id) {
  window.location.href = `details.html?id=${id}`;
}
