import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; // Order Icon
import { useState } from "react";
import { ROUTES } from "../routes/AppRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sample counts (Replace with actual Redux/Context state)
  const cartCount = useSelector((state:RootState)=>state.cart.items).length; 
  const orderCount = useSelector((state:RootState)=>state.order.orders).length; 

  // Menu items with icons
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart", icon: <ShoppingCartIcon />, count: cartCount },
    { label: "Orders", path: "/orders", icon: <ReceiptLongIcon />, count: orderCount },
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
              <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.count !== undefined ? (
                  <Badge badgeContent={item.count} color="secondary">
                    <Typography
                      component={Link}
                      to={item.path}
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        fontSize: "1rem",
                        "&:hover": { textDecoration: "underline" },
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Typography>
                  </Badge>
                ) : (
                  <Typography
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
                )}
              </Box>
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
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    {!!item.count ? (
                      <Badge badgeContent={item.count} color="secondary">
                        {item.icon}
                      </Badge>
                    ) : null}
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
