import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createOrUpdateNotification } from "../../api/Notification/notificationApi";

const InsertUpdateForm = () => {
  const token = "bluebird";

  // State to manage form data
  const location = useLocation();
  const { rowData, isEditForm } = location.state || {}; // Accessing the passed row data

  const [formData, setFormData] = useState(
    rowData || {
      clientAccountNumber: "",
      performingSite: "",
      comment: "",
      destinationCode: "",
      requestedBy: "John Doe",
      messageVersion: "1",
      suppressManualOrder: "false", // default value "false"
      suppressReflexTests: "false", // default value "false"
      notificationAccountStatusCode: [],
      notificationContent: [],
    }
  );

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
      "**",
      "QSO",
      "DLO",
      "DAL",
      "MET",
      "SEA",
      "EXO",
      "AAR",
      "AGI",
      "ACF",
      "***",
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
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => ({
      [keyName]: parseInt(opt.value),
    }));

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadData = { ...formData };
    if (isEditForm) {
      delete payloadData.clientAccountNumber;
    }

    const notificationConfigPayload = {
      notificationAccount: [payloadData],
    };

    try {
      const response = await createOrUpdateNotification(
        notificationConfigPayload,
        token
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
        <form id="notificationForm" className="row" onSubmit={handleSubmit}>
          {/* Client Account Number */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Performing Site */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Comment */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Destination Code */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Requested By */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Message Version */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
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

          {/* Notification Account Status Code (Multi Select) */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
            <label htmlFor="notificationStatusCode" className="form-label">
              Notification Account Status Code
            </label>
            <select
              multiple
              className="form-select"
              id="notificationStatusCode"
              name="notificationAccountStatusCode"
              value={formData.notificationAccountStatusCode.map(
                (item) => item.requisitionStatusCode
              )}
              onChange={(e) =>
                handleMultiSelectChange(e, "requisitionStatusCode")
              }
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Content (Multi Select) */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
            <label htmlFor="notificationContent" className="form-label">
              Notification Content
            </label>
            <select
              multiple
              className="form-select"
              id="notificationContent"
              name="notificationContent"
              value={formData.notificationContent.map(
                (item) => item.notificationSectionCode
              )}
              onChange={(e) =>
                handleMultiSelectChange(e, "notificationSectionCode")
              }
            >
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 col-lg-4 col-xl-4">
            {/* Suppress Manual Order */}
            <div className="mb-3">
              <label className="form-label d-block">
                Suppress Manual Order
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="suppressManualOrder"
                  id="suppressYes"
                  value="Y"
                  checked={formData.supressManualOrder === "Y"}
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
                  value="N"
                  checked={formData.supressManualOrder === "N"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="suppressNo">
                  No
                </label>
              </div>
            </div>

            {/* Suppress Reflex Tests */}
            <div className="mb-3">
              <label className="form-label d-block">
                Suppress Reflex Tests
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="suppressReflexTests"
                  id="reflexYes"
                  value="Y"
                  checked={formData.supressReflexTests === "Y"}
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
                  value="N"
                  checked={formData.supressReflexTests === "N"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="reflexNo">
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success col-md-2 col-lg-2 col-xl-2"
          >
            {isEditForm ? "Update" : "Submit"}
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
