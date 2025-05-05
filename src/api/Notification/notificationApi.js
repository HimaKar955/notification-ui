// src/api/notificationApi.js
import axios from "axios";

const BASE_URL = "https://eost.dev.az.qdx.com/eost-notification";

// GET: Notification config list
export const getNotificationConfig = async ({
  clientNumber,
  businessUnit,
  requestingSystem, // Confirm if this is destinationCode
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifConfig`, {
      params: {
        clientNumber,
        businessUnit,
        requestingSystem,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notification config:", error);
    throw error;
  }
};

// DELETE: Delete a notification config
export const deleteNotificationConfig = async (
  clientNumber, businessUnit, destinationCode ,
  token = "bluebird" // optionally receive token
) => {
  const url = `${BASE_URL}/notifConfig?clientNumber=${clientNumber}&businessUnit=${businessUnit}&destinationCode=${destinationCode}`;

  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// POST: Create or update a notification config
export const createOrUpdateNotification = async (notificationConfigPayload, token) => {
  return axios.post(`${BASE_URL}/notifConfig`, notificationConfigPayload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Origin: "test",
    },
  });
};
