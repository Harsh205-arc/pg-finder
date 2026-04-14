const params = new URLSearchParams(window.location.search);
const from = params.get("from");

// 🔐 auth check first
if (!localStorage.getItem("owner_id")) {
    window.location.href = "owner_login.html";
}

// 🔙 back button
const backBtn = document.getElementById("back-btn");
if (backBtn) {
    if (from === "dashboard") {
        backBtn.href = "owner_dashboard.html";
    } else {
        backBtn.href = "explore.html";
    }
}

// 📤 form submit
document.getElementById("pgForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const ownerId = localStorage.getItem("owner_id");

  if (!ownerId) {
      alert("Please login first");
      window.location.href = "owner_login.html";
      return;
  }

  formData.append("owner_id", ownerId);

  fetch("../backend/api/add_pg.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
        if (from === "dashboard") {
            window.location.href = "owner_dashboard.html";
        } else {
            window.location.href = "explore.html";
        }
    } else {
        alert("Failed to add PG");
    }
  })
  .catch(err => console.error(err));
});