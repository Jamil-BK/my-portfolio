document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons and details sections
    const buttons = document.querySelectorAll(".toggle-btn");
    const projectDetails = document.querySelectorAll(".project-details");
    const projectSection = document.getElementById("projects");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Find the associated project details section
            const details = this.nextElementSibling;

            // If details are already visible, just hide them
            if (details.style.display === "block") {
                details.style.display = "none";
                this.textContent = "Show Details";
            } else {
                // Hide all other project details first
                projectDetails.forEach(detail => {
                    detail.style.display = "none";
                });

                // Reset all button texts to "Show Details"
                buttons.forEach(btn => {
                    btn.textContent = "Show Details";
                });

                // Show only the clicked project's details
                details.style.display = "block";
                this.textContent = "Hide Details";
            }
        });
    });

    // Hide all details when clicking outside the "My Projects" section
    document.addEventListener("click", function (event) {
        if (!projectSection.contains(event.target)) {
            projectDetails.forEach(detail => {
                detail.style.display = "none";
            });

            buttons.forEach(btn => {
                btn.textContent = "Show Details";
            });
        }
    });
});



// Contact Form Section

document.addEventListener("DOMContentLoaded", function () {
    // Get form and input elements
    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById("Name");
    const emailInput = document.getElementById("Sender");
    const subjectInput = document.getElementById("Subject");
    const messageInput = document.getElementById("Message");

    // Create error spans dynamically
    createErrorSpan(nameInput, "nameError");
    createErrorSpan(emailInput, "emailError");
    createErrorSpan(subjectInput, "subjectError");
    createErrorSpan(messageInput, "messageError");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    form.addEventListener("submit", function (event) {
        // Clear previous error messages
        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name";
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email";
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address";
            isValid = false;
        }

        // Validate Subject
        if (subjectInput.value.trim() === "") {
            subjectError.textContent = "Please enter a subject";
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter your message";
            isValid = false;
        }

        // If form is not valid, prevent submission
        if (!isValid) {
            event.preventDefault();
        } else {
            alert("Thank you! Your message has been sent successfully.");
            form.reset();
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(String(email));
    }

    // Function to create an error span if not already present
    function createErrorSpan(inputField, errorId) {
        if (!document.getElementById(errorId)) {
            const errorSpan = document.createElement("span");
            errorSpan.classList.add("error");
            errorSpan.id = errorId;
            inputField.parentElement.appendChild(errorSpan);
        }
    }
});
