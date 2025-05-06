import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationTable from '../../components/NotificationTable/NotificationTable';

const ReadNotificationForm = () => {
  const [formData, setFormData] = useState({
    clientAccountNumber: '',
    performingSite: '',
  });
  const [performingSites, setPerformingSites] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const token = 'bluebird';

  useEffect(() => {
      // List of performing sites (simulating fetching from a database)
      setPerformingSites([
        "PHP", "QTE", "CHL", "SLI", "AMD", "ESW", "SJC", "FDX", "Z3E", "ZBD",
        "WDL", "MJV", "STL", "NEL", "PBL", "QER", "ERE", "SKB", "TMP", "**",
        "QSO", "DLO", "DAL", "MET", "SEA", "EXO", "AAR", "AGI", "ACF", "***",
        "ACV", "DCF", "AIN", "ALU", "NGI", "AOK", "DPP", "SWF", "ATA", "ANT",
        "DAZ", "DBA", "DPC", "DDR", "DSF", "DWI", "TP1",
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

    // Prepare the query parameters for the API request
    const queryParams = {
      clientAccountNumber: formData.clientAccountNumber,
      performingSite: formData.performingSite,
    };

    try {
      const response = await axios.get(
        `https://eost-qa.dev.az.qdx.com/eost-notification/notifConfig`,
        {
          params: queryParams,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setResponseData({ error: 'Failed to fetch notifications.' });
    }
  };

  return (
    <div>
      <h4>Read Notification</h4>
      <div className="card p-4 shadow-sm">
        <form id="readNotificationForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clientAccountRead" className="form-label">
              Client Account Number *
            </label>
            <input
              type="text"
              className="form-control"
              id="clientAccountRead"
              name="clientAccountNumber"
              value={formData.clientAccountNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Performing Site */}
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

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Display API Response */}
      {responseData && (
        <div className="card p-4 shadow-sm mt-4">
          <h5>API Response</h5>
          <div className='mt-5'>
            <NotificationTable responseData={responseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadNotificationForm;
