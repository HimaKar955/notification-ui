import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationTable from "../../components/NotificationTable/NotificationTable";

const ReadNotificationForm = () => {
  const [formData, setFormData] = useState({
    clientAccountNumber: "",
    performingSite: "",
    destinationCode: "",
  });
  const [performingSites, setPerformingSites] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const token = "bluebird";

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

  // Handle form submission (search for notification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that at least one of the two required fields is filled
    if (
      formData.clientAccountNumber.trim() === "" &&
      formData.performingSite.trim() === ""
    ) {
      alert("Please provide either Client Account Number or Performing Site.");
      return;
    }

    const queryParams = {};

    if (formData.clientAccountNumber.trim() !== "") {
      queryParams.clientAccountNumber = formData.clientAccountNumber;
    }

    if (formData.performingSite.trim() !== "") {
      queryParams.performingSite = formData.performingSite;
    }

    if (formData.destinationCode !== "") {
      queryParams.destinationCode = formData.destinationCode;
    }

    try {
      const response = await axios.get(
        `https://eost-qa.dev.az.qdx.com/eost-notification/notifConfig`,
        {
          params: queryParams,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setResponseData({ error: "Failed to fetch notifications." });
    }
  };

  return (
    <div>
      <h4>Read Notification</h4>
      <div className="card p-4 shadow-sm">
        <form id="readNotificationForm" className="row" onSubmit={handleSubmit}>
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
            <label htmlFor="clientAccountRead" className="form-label">
              Client Account Number
            </label>
            <input
              type="text"
              className="form-control"
              id="clientAccountRead"
              name="clientAccountNumber"
              value={formData.clientAccountNumber}
              onChange={handleChange}
            />
          </div>

          {/* Performing Site */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
            <label htmlFor="performingSite" className="form-label">
              Performing Site
            </label>
            <select
              className="form-select"
              id="performingSite"
              name="performingSite"
              value={formData.performingSite}
              onChange={handleChange}
            >
              <option value="">Select Code</option>
              {performingSites.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Code */}
          <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
            <label htmlFor="destinationCode" className="form-label">
              Destination Code
            </label>
            <select
              className="form-select"
              id="destinationCode"
              name="destinationCode"
              value={formData.destinationCode}
              onChange={handleChange}
            >
              <option value="">Select Code</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary col-md-2 col-lg-2 col-xl-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* Display API Response */}
      {responseData && (
        <div className="card p-4 shadow-sm mt-4">
          <h5>API Response</h5>
          <div className="mt-5">
            <NotificationTable responseData={responseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadNotificationForm;
