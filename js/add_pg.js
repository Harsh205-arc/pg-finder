document.getElementById("pgForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("../backend/api/add_pg.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert("PG Added Successfully!");
    window.location.href = "explore.html";
  })
  .catch(err => console.error(err));
});