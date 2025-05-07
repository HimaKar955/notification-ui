import React, { useState } from "react";
import axios from "axios";

const DeleteForm = () => {
  const [formData, setFormData] = useState({
    clientAccountDelete: "",
    performingSiteDelete: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { clientAccountDelete, performingSiteDelete } = formData;
    const newErrors = [];

    if (!clientAccountDelete)
      newErrors.push("Client Account Number is required.");
    if (!performingSiteDelete) newErrors.push("Performing Site is required.");

    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("/api/delete-notification", formData)
      .then(() => {
        alert("Notification deleted successfully!");
        setFormData({ clientAccountDelete: "", performingSiteDelete: "" });
        setErrors([]);
      })
      .catch(() =>
        alert("Something went wrong while deleting the notification.")
      );
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Delete Notification</h4>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="clientAccountDelete" className="form-label">
            Client Account Number *
          </label>
          <input
            type="text"
            className="form-control"
            id="clientAccountDelete"
            value={formData.clientAccountDelete}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="performingSiteDelete" className="form-label">
            Performing Site *
          </label>
          <select
            className="form-select"
            id="performingSiteDelete"
            value={formData.performingSiteDelete}
            onChange={handleChange}
          >
            <option value="">Select Site</option>
            <option value="Site A">Site A</option>
            <option value="Site B">Site B</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger">
          Delete Notification
        </button>
      </form>
    </div>
  );
};

export default DeleteForm;
