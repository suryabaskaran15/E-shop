import { Card, CardContent, Typography, Button } from "@mui/material";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

const CartSummary = ({ total, onCheckout }: CartSummaryProps) => {
  return (
    <Card sx={{ padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={onCheckout}>
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
