import { handleErrors } from "./utils.js";

const logInForm = document.querySelector(".login__form");

logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    try {
        const res = await fetch("http://localhost:8080/users/token", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("ROCKINHOOD_ACCESS_TOKEN", token);
        localStorage.setItem("ROCKINHOOD_CURRENT_USER_ID", id);
        // redirect to home page to see all tweets:
        window.location.href = "/portfolio";
    } catch (err) {
        handleErrors(err);
    }
});