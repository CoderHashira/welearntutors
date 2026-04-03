if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "T2l8gn0bnaKYoMlQ-"
    });
}

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-items");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const tutorRequestForm = document.querySelector(".tutor-request-form");
    const tutorApplicationForm = document.querySelector(".tutor-application-form");
    const tutorApplicationStatus = document.getElementById("tutor-application-status");
    const loginForm = document.getElementById("login-form");
    const loginStatus = document.getElementById("login-status");

    // Replace these values with your real EmailJS IDs
    const SERVICE_ID = "service_e5b02pd";
    const TUTOR_REQUEST_TEMPLATE_ID = "template_cyz9lxr";
    const TUTOR_APPLICATION_TEMPLATE_ID = "template_y0p28qv";

    const DEMO_LOGIN = {
        email: "admin@welearntutors.co.za",
        password: "Admin@123",
        role: "admin"
    };

    function showStatus(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `login-status ${type}`;
    }

    function sendEmailForm(formElement, templateId, options = {}) {
        const {
            successMessage = "Form submitted successfully.",
            errorMessage = "Something went wrong. Please try again.",
            successRedirect = "/thank-you.html",
            statusElement = null
        } = options;

        if (typeof emailjs === "undefined") {
            console.error("EmailJS is not loaded.");
            showStatus(statusElement, "Email service is not available right now.", "error");
            alert("Email service is not available right now.");
            return;
        }

        emailjs
            .sendForm(SERVICE_ID, templateId, formElement)
            .then(() => {
                showStatus(statusElement, successMessage, "success");
                alert(successMessage);
                formElement.reset();
                window.location.href = successRedirect;
            })
            .catch((error) => {
                console.error("EmailJS form submission failed:", error);
                showStatus(statusElement, errorMessage, "error");
                alert(errorMessage);
            });
    }

    if (tutorRequestForm) {
        tutorRequestForm.addEventListener("submit", function (e) {
            e.preventDefault();

            sendEmailForm(this, "template_y0p28qv", {
                successMessage: "Tutor request submitted successfully.",
                errorMessage: "Something went wrong with the tutor request. Please try again."
            });
        });
    }

    if (tutorApplicationForm) {
        tutorApplicationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            sendEmailForm(this, "template_y0p28qv", {
                successMessage: "Tutor application submitted successfully.",
                errorMessage: "Something went wrong with the tutor application. Please check your EmailJS setup and try again.",
                statusElement: tutorApplicationStatus
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("login-email");
            const passwordInput = document.getElementById("login-password");
            const rememberMe = loginForm.querySelector('input[name="remember-me"]');

            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;

            if (!email || !password) {
                showStatus(loginStatus, "Please enter both email and password.", "error");
                return;
            }

            if (email === DEMO_LOGIN.email && password === DEMO_LOGIN.password) {
                const sessionData = {
                    email: DEMO_LOGIN.email,
                    role: DEMO_LOGIN.role,
                    isLoggedIn: true,
                    loginTime: new Date().toISOString()
                };

                if (rememberMe && rememberMe.checked) {
                    localStorage.setItem("welearntutorsAuth", JSON.stringify(sessionData));
                    sessionStorage.removeItem("welearntutorsAuth");
                } else {
                    sessionStorage.setItem("welearntutorsAuth", JSON.stringify(sessionData));
                    localStorage.removeItem("welearntutorsAuth");
                }

                showStatus(loginStatus, "Login successful. Redirecting...", "success");

                setTimeout(() => {
                    window.location.href = "/index.html";
                }, 900);
            } else {
                showStatus(loginStatus, "Incorrect email or password. Please try again.", "error");
            }
        });
    }
});