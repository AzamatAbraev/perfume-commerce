"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { request } from "@/server/request";
import { useEffect, useState } from "react";
import NoCrashIcon from '@mui/icons-material/NoCrash';
import convertTimestamp from "@/utils/convertTime";
import {toast} from "react-toastify";
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import Loading from "@/components/loading/Loading";


import "./style.scss";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([])
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("ACCEPTED");
  const [newOrders, setNewOrders] = useState([]);


  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const {data} = await request.get("payment");
        const orders = data?.filter((order: any) => order?.status === status);
        setNewOrders(orders);
        setOrders(data);
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [update, status])

  const confirmOrder = async(id: string) => {
    try {
      setLoading(true);
      const {data: {msg}} = await request.post(`payment/${id}`)
      toast.success(msg)
      setUpdate(!update)
    } finally {
      setLoading(false);
    }
  }

   const cancelOrder = async(id: string) => {
    try {
      setLoading(true);
      const {data: {msg}} = await request.put(`payment/${id}`)
      toast.success(msg)
      setUpdate(!update);
    } finally {
      setLoading(false);
    }
  }

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  }

  
  return <div className="allorders-page">
   {loading ? <Loading/> : <TableContainer component={Paper}>
      <div className="table-header">
        <h1 className="rows__title">Orders ({newOrders?.length})</h1>
        <div className="category-selector">
          <select onChange={handleCategory} name="category" id="category">
            <option value="ACCEPTED">Accepted</option>
            <option value="SUCCESS">Success</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </div>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell align="right">Comment</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Confirm</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newOrders?.map((order: any) => (
            <StyledTableRow key={order?._id}>
              <StyledTableCell component="th" scope="row">
                {order?._id}
              </StyledTableCell>
              <StyledTableCell align="right">{order?.comment?.slice(0, 15) || "No comment"}</StyledTableCell>
              <StyledTableCell align="right">{convertTimestamp(order?.createdAt)}</StyledTableCell>
              <StyledTableCell align="right"><Chip className={`status ${order?.status.toLowerCase()}`} label={order?.status}/></StyledTableCell>
              <StyledTableCell className="action-btn-container" align="right">
                <button className="cancel-btn" onClick={() => cancelOrder(order?._id)}><CancelIcon /></button>
                <button className="confirm-btn" onClick={() => confirmOrder(order?._id)}><NoCrashIcon /></button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
  </div>;
};

export default AllOrdersPage;
