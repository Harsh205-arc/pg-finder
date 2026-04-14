let isSignup = false;

const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const signupFields = document.querySelectorAll(".signup-only");
const form = document.getElementById("loginForm");

toggleLink.addEventListener("click", (e) => {
    e.preventDefault();

    isSignup = !isSignup;

    // Show / hide signup fields
    signupFields.forEach(el => {
        el.style.display = isSignup ? "block" : "none";
    });

    // Change title
    formTitle.textContent = isSignup ? "Owner Sign Up" : "Owner Login";

    // Change button text
    form.querySelector("button").textContent = isSignup ? "Sign Up" : "Login";

    // Change bottom text WITHOUT breaking event
    if (isSignup) {
        toggleText.firstChild.textContent = "Already registered? ";
        toggleLink.textContent = "Sign In";
    } else {
        toggleText.firstChild.textContent = "Don't have an account? ";
        toggleLink.textContent = "Sign Up";
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const url = isSignup 
        ? "../backend/api/signup.php" 
        : "../backend/api/login.php";

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (data.status === "success") {
        localStorage.setItem("owner_id", data.user_id);
        window.location.href = "owner_dashboard.html";   
    } 
    else {
        document.getElementById("msg").innerText = data.message;
    }
});