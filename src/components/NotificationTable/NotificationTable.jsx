import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteNotificationConfig } from "../../api/Notification/notificationApi";
import { ToastContainer, toast } from 'react-toastify';

// import { getNotificationConfig } from '../api/notificationApi';

const NotificationTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // MOCK DATA: Replace with API response later
      const mockData = {
        responseData: [
          {
            clientAccountNumber: "019",
            performingSite: "TMP",
            comment: "1234",
            destinationCode: 2,
            requestedBy: "Mercy",
            messageVersion: 1,
            enableNonClinicalCodes: "N",
            supressManualOrder: "Y",
            supressReflexTests: "Y",
            notificationAccountStatusCode: [
              {
                requisitionStatusCode: 2,
              },
            ],
            notificationContent: [
              {
                notificationSectionCode: 2,
              },
              {
                notificationSectionCode: 1,
              },
              {
                notificationSectionCode: 3,
              },
            ],
            notificationAccountUid: "54859dd2-7d87-453e-8f2b-2924c72c43e0",
          },
          {
            clientAccountNumber: "019",
            performingSite: "STL",
            comment: "1234",
            destinationCode: 2,
            requestedBy: "Mercy",
            messageVersion: 1,
            enableNonClinicalCodes: "N",
            supressManualOrder: "Y",
            supressReflexTests: "Y",
            notificationAccountStatusCode: [
              {
                requisitionStatusCode: 2,
              },
            ],
            notificationContent: [
              {
                notificationSectionCode: 1,
              },
              {
                notificationSectionCode: 2,
              },
              {
                notificationSectionCode: 3,
              },
            ],
            notificationAccountUid: "b1cad145-2505-43df-98db-724617c0e76f",
          },
        ],
      };

      // const data = await getNotificationConfig({
      //   clientNumber: '019',
      //   businessUnit: 'TMP',
      //   requestingSystem: 2
      // });

      const data = mockData;
      setRows(data.responseData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleEdit = (row) => {
    navigate(`/insert-update/${row.notificationAccountUid}`, {
      state: {
        rowData: row,
        isEditForm: true,
      },
    });
  };

  const handleDelete = (row) => {
    const { clientAccountNumber, performingSite, destinationCode } = row;
    deleteNotificationConfig(
      clientAccountNumber,
      performingSite,
      destinationCode
    ).then(()=>{
      toast.success("Row deleted successfully");
      fetchData()
    }).catch(()=>{
      toast.error('Unable to delete row !')
    });
    console.log("Delete clicked:", row);
    // Add your delete logic here (e.g., call delete API and refresh table)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        Notification Configuration
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Account Number</TableCell>
            <TableCell>Performing Site</TableCell>
            <TableCell>Destination Code</TableCell>
            <TableCell>Requested By</TableCell>
            <TableCell>Enable Non Clinical Codes</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.clientAccountNumber}</TableCell>
              <TableCell>{row.performingSite}</TableCell>
              <TableCell>{row.destinationCode}</TableCell>
              <TableCell>{row.requestedBy}</TableCell>
              <TableCell>{row.enableNonClinicalCodes}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
