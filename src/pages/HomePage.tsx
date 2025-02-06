import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard"; // Assuming you have ItemCard component
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/slices/categorySlice"; // Redux slice for categories
import { PRODUCTS } from "../constants/products"; // Assuming PRODUCTS contains all products
import { RootState } from "../redux/store";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  // Simulating fetching categories and featured items from an API
  useEffect(() => {
    setFilteredItems(PRODUCTS.slice(0, 5));
    dispatch(setCategories(["Electronics", "Fashion", "Home & Kitchen", "All"])); // Add "All" category
  }, [dispatch]);

  // Filter products based on selected category
  const handleCategoryFilter = (category: string) => {
    if (category === "All") {
      return PRODUCTS.slice(0, 5); // Show all items
    } else {
      return PRODUCTS.filter((item) => item.category === category).slice(0, 5); // Show 5 items max for the selected category
    }
  };

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        Welcome to E-Shop!
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Discover the best deals on electronics, fashion, and home appliances. Start shopping now!
      </Typography>

      {/* Category List */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shop by Category:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category: string, index: number) => (
            <Grid item key={index}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ margin: 1 }}
                onClick={() => setFilteredItems(handleCategoryFilter(category))}
              >
                {category}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Items */}
      <Typography variant="h6" gutterBottom>
        Featured Products:
      </Typography>
      <Grid container spacing={4}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Link to="/items">
          <Button variant="contained" color="primary">
            Shop All Products
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
