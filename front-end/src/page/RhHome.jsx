import React, { useContext } from 'react';
import { UserContext } from "./Interface.js"
import Box from '@mui/material/Box';
import Table from '../components/Tableau/Tableau';
import { Typography } from '@mui/material';

export default function RhHome() {
  const user = useContext(UserContext)

  if (!user) {
    return <Typography>Connect before you can access this page</Typography>
  }

  if (user.role !== "rh") {
    return <Typography>You don't have the authorization to access this page</Typography>
  }

  return (
    <Box>
      <Table />
    </Box>
  );
}
