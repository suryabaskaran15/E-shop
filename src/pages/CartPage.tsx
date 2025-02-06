import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Snackbar,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, updateQuantity } from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";
import { RootState } from "../redux/store";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total: number, item: any) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems.map((item) => ({
        id:item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: parseFloat(calculateTotal()),
      date: new Date().toISOString(),
    };

    dispatch(placeOrder(order));
    dispatch(clearCart());
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 4 }}>
          Your cart is empty. Start adding items to your cart.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {cartItems.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: 3,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: "cover", borderRadius: "10px" }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                      ${item.price.toFixed(2)}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        size="small"
                        sx={{ width: 80, textAlign: "center", backgroundColor: "#fff", borderRadius: "5px" }}
                        inputProps={{ min: 1 }}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromCart(item.id)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>Total: ${calculateTotal()}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "12px 24px", fontSize: "16px", borderRadius: "8px" }}
              onClick={handlePlaceOrder}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Order placed successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
};

export default CartPage;
