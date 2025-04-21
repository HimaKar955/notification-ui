import React, { useState, useEffect } from "react";
import axios from "axios";

const InsertUpdateForm = () => {
  const token = "bluebird";

  // State to manage form data
  const [formData, setFormData] = useState({
    clientAccountNumber: "",
    performingSite: "",
    comment: "",
    destinationCode: "",
    requestedBy: "John Doe",
    messageVersion: "1",
    suppressManualOrder: "false",
    suppressReflexTests: "false",
    notificationAccountStatusCode: [],
    notificationContent: [],
  });

  const [performingSites, setPerformingSites] = useState([]);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // List of performing sites (simulating fetching from a database)
    setPerformingSites([
      "PHP",
      "QTE",
      "CHL",
      "SLI",
      "AMD",
      "ESW",
      "SJC",
      "FDX",
      "Z3E",
      "ZBD",
      "WDL",
      "MJV",
      "STL",
      "NEL",
      "PBL",
      "QER",
      "ERE",
      "SKB",
      "TMP",
      "",
      "QSO",
      "DLO",
      "DAL",
      "MET",
      "SEA",
      "EXO",
      "AAR",
      "AGI",
      "ACF",
      "*",
      "ACV",
      "DCF",
      "AIN",
      "ALU",
      "NGI",
      "AOK",
      "DPP",
      "SWF",
      "ATA",
      "ANT",
      "DAZ",
      "DBA",
      "DPC",
      "DDR",
      "DSF",
      "DWI",
      "TP1",
    ]);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e, keyName) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) =>
      parseInt(opt.value)
    );

    const mapped = selectedOptions.map((val) => ({
      [keyName]: val,
    }));

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: mapped,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to be sent in the API request
    const notificationConfigPayload = {
      notificationAccount: [formData],
    };

    console.log(notificationConfigPayload, "notificationConfigPayload");

    try {
      const response = await axios.post(
        `https://eost-qa.dev.az.qdx.com/eost-notification/notifConfig`,
        notificationConfigPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Orgin: 'test',
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseData({ error: "Failed to submit notification." });
    }
  };

  return (
    <div>
      <h4>Insert/Update Notification</h4>
      <div className="card p-4 shadow-sm">
        <form id="notificationForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clientAccount" className="form-label">
              Client Account Number *
            </label>
            <input
              type="text"
              className="form-control"
              id="clientAccount"
              name="clientAccountNumber"
              value={formData.clientAccountNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="performingSite" className="form-label">
              Performing Site *
            </label>
            <select
              className="form-select"
              id="performingSite"
              name="performingSite"
              value={formData.performingSite}
              onChange={handleChange}
              required
            >
              <option value="">Select Code</option>
              {performingSites.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <input
              type="text"
              className="form-control"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="destinationCode" className="form-label">
              Destination Code *
            </label>
            <select
              className="form-select"
              id="destinationCode"
              name="destinationCode"
              value={formData.destinationCode}
              onChange={handleChange}
              required
            >
              <option value="">Select Code</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="requestedBy" className="form-label">
              Requested By
            </label>
            <input
              type="text"
              className="form-control"
              id="requestedBy"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="messageVersion" className="form-label">
              Message Version
            </label>
            <select
              className="form-select"
              id="messageVersion"
              name="messageVersion"
              value={formData.messageVersion}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Suppress Manual Order</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="suppressManualOrder"
                id="suppressYes"
                value="true"
                checked={formData.suppressManualOrder === "true"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="suppressYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="suppressManualOrder"
                id="suppressNo"
                value="false"
                checked={formData.suppressManualOrder === "false"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="suppressNo">
                No
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Suppress Reflex Tests</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="suppressReflexTests"
                id="reflexYes"
                value="true"
                checked={formData.suppressReflexTests === "true"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="reflexYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="suppressReflexTests"
                id="reflexNo"
                value="false"
                checked={formData.suppressReflexTests === "false"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="reflexNo">
                No
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="notificationStatusCode" className="form-label">
              Notification Account Status Code
            </label>
            <select
              multiple
              className="form-select"
              id="notificationStatusCode"
              name="notificationAccountStatusCode"
              value={formData.notificationAccountStatusCode.map(
                (item) => item.notificationAccountStatusCode
              )}
              onChange={(e) =>
                handleMultiSelectChange(e, "notificationAccountStatusCode")
              }
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="notificationContent" className="form-label">
              Notification Content
            </label>
            <select
              multiple
              className="form-select"
              id="notificationContent"
              name="notificationContent"
              value={formData.notificationContent.map(
                (item) => item.notificationContent
              )}
              onChange={(e) =>
                handleMultiSelectChange(e, "notificationContent")
              }
            >
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>

      {/* Display API Response */}
      {responseData && (
        <div className="card p-4 shadow-sm mt-4">
          <h5>API Response</h5>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default InsertUpdateForm;