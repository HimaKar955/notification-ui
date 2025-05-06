import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const NotificationTable = ({ responseData }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (responseData && Array.isArray(responseData)) {
      setRows(responseData);
    }
  }, [responseData]);

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
    deleteNotificationConfig(clientAccountNumber, performingSite, destinationCode)
      .then(() => {
        toast.success("Row deleted successfully");
        // Optional: Call a refresh function from parent instead of fetchData
        setRows(prev => prev.filter(r => r.notificationAccountUid !== row.notificationAccountUid));
      })
      .catch(() => {
        toast.error("Unable to delete row!");
      });
  };

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