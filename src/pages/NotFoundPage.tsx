import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import NotFound from "../assets/images/image.png";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mt: 1, mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <img
        src={NotFound}
        alt="404 Not Found"
        style={{ width: "100%", maxWidth: 400, marginBottom: 20 }}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
