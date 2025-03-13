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
