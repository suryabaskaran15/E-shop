import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button, Paper, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice"; // Redux slice for cart actions
import { PRODUCTS } from "../constants/products";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const selectedItem = PRODUCTS.find((item: any) => item.id.toString() === id);
      setItem(selectedItem || null);
      setLoading(false);
    }, 500); // Simulate API loading
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      dispatch(addItem(item));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (!item) {
    return (
      <Container>
        <Typography variant="h6" align="center" gutterBottom>
          Item not found.
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6}>
            <img src={item.imageUrl} alt={item.name} width="100%" style={{ borderRadius: 8 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
              ${item.price}
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginTop: 2 }}>
              {item.description || "This is a detailed description of the product."}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ marginRight: 2 }}>
                Add to Cart
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                Back to Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ItemDetailsPage;
