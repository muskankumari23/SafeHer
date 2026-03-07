async function analyzeRisk(data) {
    try {
        const response = await fetch("/predict-risk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.risk_level) {
            const riskLevel = document.getElementById("riskLevel");
            const riskReason = document.getElementById("riskReason");

            riskLevel.textContent = result.risk_level;
            riskReason.textContent = "Risk analyzed using trained model.";

            if (result.risk_level === "HIGH") {
                sendSOSAlert("AI model detected HIGH risk", "HIGH");
            }
        } else {
            console.log(result.error);
        }
    } catch (error) {
        console.error("Risk analysis failed:", error);
    }
}