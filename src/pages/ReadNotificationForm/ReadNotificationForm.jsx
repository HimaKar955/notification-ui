import React, { useState } from 'react';
import axios from 'axios';
import NotificationTable from '../../components/NotificationTable/NotificationTable';

const ReadNotificationForm = () => {
  const [formData, setFormData] = useState({
    clientAccountNumber: '',
    performingSite: '',
  });
  const [responseData, setResponseData] = useState(null);
  const token = 'bluebird';

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

          <div className="mb-3">
            <label htmlFor="performingSiteRead" className="form-label">
              Performing Site *
            </label>
            <select
              className="form-select"
              id="performingSiteRead"
              name="performingSite"
              value={formData.performingSite}
              onChange={handleChange}
              required
            >
              <option value="">Select Site</option>
              <option value="Site A">Site A</option>
              <option value="Site B">Site B</option>
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
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
      <div className='mt-5'>

      <NotificationTable />
      </div>
    </div>
  );
};

export default ReadNotificationForm;
