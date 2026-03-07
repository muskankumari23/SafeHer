function toggleProfilePanel() {
    const panel = document.getElementById("profilePanel");
    if (panel) {
        panel.classList.toggle("open");
    }
}

function saveContact() {
    const input = document.getElementById("contactNumber");
    const savedText = document.getElementById("savedContact");

    const number = input.value.trim();

    if (!number) {
        alert("Please enter emergency contact number.");
        return;
    }

    localStorage.setItem("safeherEmergencyContact", number);
    savedText.textContent = "Saved contact: " + number;
    input.value = "";
}

function loadSavedContact() {
    const savedNumber = localStorage.getItem("safeherEmergencyContact");
    const savedText = document.getElementById("savedContact");

    if (savedNumber && savedText) {
        savedText.textContent = "Saved contact: " + savedNumber;
    }
}

function sendSOSAlert() {
    const savedNumber = localStorage.getItem("safeherEmergencyContact");
    const alertStatus = document.getElementById("alertStatus");

    if (!savedNumber) {
        alert("Please save an emergency contact first.");
        return;
    }

    if (!window.safeHerLocation) {
        alert("Location not available yet.");
        return;
    }

    const mapLink = window.safeHerLocation.mapLink;
    const message =
        "SafeHer Alert 🚨 I may be in danger.\n\n" +
        "My Live Location:\n" + mapLink + "\n\n" +
        "Please help immediately.";

    const whatsappURL =
        "https://wa.me/" + savedNumber + "?text=" + encodeURIComponent(message);

    if (alertStatus) {
        alertStatus.innerHTML =
            "SOS alert prepared for: " + savedNumber + "<br>Location included successfully.";
    }

    window.open(whatsappURL, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    loadSavedContact();

    const saveBtn = document.getElementById("saveContactBtn");
    const sosBtn = document.getElementById("sosBtn");

    if (saveBtn) {
        saveBtn.addEventListener("click", saveContact);
    }

    if (sosBtn) {
        sosBtn.addEventListener("click", sendSOSAlert);
    }
});