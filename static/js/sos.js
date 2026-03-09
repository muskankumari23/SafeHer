// sos.js - Handles manual SOS trigger

function initSOS() {
    const sosBtn = document.getElementById("sos-btn");
    const statusText = document.getElementById("sos-status");

    sosBtn.addEventListener("click", () => {
        statusText.style.color = "var(--sos-red)";
        statusText.innerHTML = `Sending Alert...`;

        // Force high risk alert payload
        const userLoc = window.getUserLocation ? window.getUserLocation() : { lat: null, lng: null };

        const payload = {
            risk_level: "HIGH (MANUAL_SOS)",
            lat: userLoc.lat,
            lng: userLoc.lng,
            timestamp: new Date().toISOString()
        };

        fetch(window.flaskConfig.alertApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log("SOS Action Response:", data);

                let alertedInfo = "Emergency Contacts";
                if (data.alerted_contacts && data.alerted_contacts.length > 0) {
                    alertedInfo = data.alerted_contacts.join("<br>📞 ");
                    alertedInfo = "📞 " + alertedInfo;
                }

                if (data.twilio_status === "success") {
                    statusText.innerHTML = `SMS Successfully Sent to:<br/>${alertedInfo}`;
                    statusText.style.color = "#2e7d32"; // Green for success
                } else if (data.twilio_status === "failed") {
                    if (data.twilio_error && data.twilio_error.includes("Credentials missing")) {
                        statusText.innerHTML = `SMS Not Sent (Twilio not configured).<br/>Simulated for:<br/>${alertedInfo}`;
                        statusText.style.color = "#f57c00"; // Orange warning
                    } else {
                        statusText.innerHTML = `SMS Failed: ${data.twilio_error || 'Unknown Error'}.<br/>Simulated for:<br/>${alertedInfo}`;
                    }
                } else {
                    statusText.innerHTML = `Alert Sent to:<br/>${alertedInfo}`;
                }

                // Clear the status text after 10 seconds
                setTimeout(() => { statusText.innerHTML = ""; }, 10000);
            })
            .catch(err => {
                console.error("SOS Error:", err);
                statusText.innerHTML = `Failed to send! Please call authorities manually.`;
            });
    });
}
