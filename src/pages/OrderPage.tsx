import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Paper, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const userOrders = useSelector((state: any) => state.order.orders); // Assuming you have an orders slice

  useEffect(() => {
    // Fetching orders data (Mock data for now)
    setOrders(userOrders);
  }, [userOrders]);

  // Function to get the displayable status chip color
  const getStatusChip = (status: string) => {
    switch (status) {
      case "Pending":
        return <Chip label="Pending" color="warning" size="small" />;
      case "Shipped":
        return <Chip label="Shipped" color="primary" size="small" />;
      case "Delivered":
        return <Chip label="Delivered" color="success" size="small" />;
      default:
        return <Chip label="Unknown" color="default" size="small" />;
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          You have no orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order: any) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3 }}>
                {/* Order ID and Date */}
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(order.date).toLocaleDateString()}
                </Typography>

                {/* Order Status */}
                <Box sx={{ marginTop: 1 }}>
                  <Typography variant="body2">Status: </Typography>
                  {getStatusChip(order.status)}
                </Box>

                {/* Total Price */}
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  Total: ${order.total.toFixed(2)}
                </Typography>

                {/* View Details */}
                <Box sx={{ marginTop: 2 }}>
                  <Link to={`/order/${order.id}`} style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                      View Order Details
                    </Typography>
                  </Link>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default OrdersPage;
