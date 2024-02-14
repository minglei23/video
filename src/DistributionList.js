import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function DistributionList({filteredlist}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Spend</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Commission</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredlist.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.UserID}</TableCell>
            <TableCell>{item.Spend.toFixed(2)}</TableCell>
            <TableCell>{item.Date}</TableCell>
            <TableCell>{(item.Commission * 100)}%</TableCell>
            <TableCell>{(item.Spend * item.Commission).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
