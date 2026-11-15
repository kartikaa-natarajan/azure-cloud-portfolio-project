// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        formStatus.textContent = "Sending...";

        try {

            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                formStatus.textContent = data.message;
                contactForm.reset();
            } else {
                formStatus.textContent =
                    "Something went wrong. Please try again.";
            }

        } catch (error) {

            console.error("Contact form error:", error);

            formStatus.textContent =
                "Unable to connect to the backend.";
        }

    });

}