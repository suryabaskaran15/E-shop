import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard"; // Assuming you have ItemCard component
import { PRODUCTS } from "../constants/products";

const ItemsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate API call delay
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>

      {/* Proper Loader */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress size={50} color="primary" />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {PRODUCTS.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Button variant="contained" color="primary">
              View Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ItemsPage;
