'use client';
import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

type ContactImporsTableProps = {
  data: any[];
}

export default function ContactImporsTable({ data: initialData }: ContactImporsTableProps) {
  const { data } = useQuery({
    queryKey: ['contact-imports'],
    queryFn: async () => {
      const { data } = await ApiClient.get('/v1/contacts/imports');
      return data
    },
    initialData,
    refetchInterval: 5000
  });
  return <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Arquivo</TableCell>
        <TableCell align="right">Total Registros</TableCell>
        <TableCell align="right">Status</TableCell>
        <TableCell align="right">Data</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row: any) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.total_lines}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
}