import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Grid, Paper, Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const OrderDetailsPage = () => {
    const { orderId } = useParams(); // Get the order ID from the URL
    const userOrders = useSelector((state: RootState) => state.order.orders); // Assuming you have an orders slice

    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        // Find the specific order by its ID
        const foundOrder = userOrders.find((o: any) => o.id === parseInt(orderId!)); // Match order by ID
        if (foundOrder) {
            setOrder(foundOrder);
        }
    }, [orderId, userOrders]);

    if (!order) {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Order not found
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary">
                    We couldn't find the order you were looking for.
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Order #{order.id} Details
            </Typography>

            <Paper sx={{ padding: 3, boxShadow: 3 }}>
                {/* Order Date and Status */}
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6">Order Date: {new Date(order.date).toLocaleDateString()}</Typography>
                    <Typography variant="body1" color="textSecondary">Status: {order.status}</Typography>
                </Box>

                {/* Order Items */}
                <Typography variant="h6" gutterBottom>
                    Items in your order:
                </Typography>
                <Grid container spacing={3}>
                    {order.items.map((item: any) => (
                        <Grid item xs={12} sm={6} md={4} key={item.name}>
                            <Link to={`/items/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body1">Quantity: {item.quantity}</Typography>
                                    <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
                                </Paper>
                            </Link>

                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ marginY: 4 }} />

                {/* Total Amount */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5">Total: ${order.total.toFixed(2)}</Typography>
                    {/* <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Contact Support
          </Button> */}
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderDetailsPage;
