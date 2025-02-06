import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ROUTES } from "../routes/AppRoutes";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menu items
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "primary.main", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Link to={ROUTES.HOME} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              E-Shop
            </Typography>
          </Link>


          {/* Center: Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "1rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemText
                primary={
                  <Typography
                    component={Link}
                    to={item.path}
                    onClick={handleDrawerToggle}
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                      fontSize: "1rem",
                      display: "block",
                      p: 2,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
