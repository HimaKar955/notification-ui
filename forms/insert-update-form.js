document.addEventListener("DOMContentLoaded", function () {

  const token = "bluebird";


  // Replace this with the actual list from your database
  const eostPerformingSites = [
    "PHP", "QTE", "CHL", "SLI", "AMD", "ESW", "SJC", "FDX", "Z3E", "ZBD",
    "WDL", "MJV", "STL", "NEL", "PBL", "QER", "ERE", "SKB", "TMP", "**", 
    "QSO", "DLO", "DAL", "MET", "SEA", "EXO", "AAR", "AGI", "ACF", "***", 
    "ACV", "DCF", "AIN", "ALU", "NGI", "AOK", "DPP", "SWF", "ATA", "ANT",
    "DAZ", "DBA", "DPC", "DDR", "DSF", "DWI", "TP1"
  ];

  const performingSiteSelect = document.getElementById("performingSite");
  if (performingSiteSelect) {
    performingSiteSelect.innerHTML = '<option value="">Select Code</option>';
    eostPerformingSites.forEach(code => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code;
      performingSiteSelect.appendChild(option);
    });
  }

  // Handle form submission
  const form = document.getElementById("notificationForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submit

    // Prepare form data
    const data = {
      clientAccountNumber: document.getElementById("clientAccount").value,
      performingSite: document.getElementById("performingSite").value,
      comment: document.getElementById("comment").value,
      destinationCode: document.getElementById("destinationCode").value,
      requestedBy: document.getElementById("requestedBy").value,
      messageVersion: document.getElementById("messageVersion").value,
      suppressManualOrder: form.querySelector('input[name="suppressManualOrder"]:checked').value,
      suppressReflexTests: form.querySelector('input[name="suppressReflexTests"]:checked').value,
      notificationAccountStatusCode: Array.from(document.getElementById("notificationStatusCode").selectedOptions).map(opt => ({
        requisitionStatusCode: parseInt(opt.value)
      })),
      notificationContent: Array.from(document.getElementById("notificationContent").selectedOptions).map(opt => ({
        notificationSectionCode: parseInt(opt.value)
      }))
    };
    console.log(data)

    // Send data to API
    fetch("https://eost-qa.dev.az.qdx.com/eost-notification/notifConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(result => {
        console.log("API response:", result);
        showResponseCard(result);
      })
      .catch(error => {
        console.error("Submission failed:", error);
        showResponseCard({ error: "Failed to submit notification." });
      });
  });

  // Display response below the form
  function showResponseCard(responseData) {
    let responseCard = document.getElementById("apiResponseCard");

    if (!responseCard) {
      responseCard = document.createElement("div");
      responseCard.id = "apiResponseCard";
      responseCard.className = "card p-4 shadow-sm mt-4";
      form.parentNode.appendChild(responseCard);
    }

    responseCard.innerHTML = `
      <h5>API Response</h5>
      <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(responseData, null, 2)}</pre>
    `;
  }
});
