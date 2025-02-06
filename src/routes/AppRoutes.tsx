import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ItemsPage from "../pages/ItemsPage";
import ItemDetailsPage from "../pages/ItemDetailsPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrderPage";
import { Header } from "../components";
import OrderDetailsPage from "../pages/OrderDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

export enum ROUTES {
  HOME = "/",
  ITEMS = "/items",
  CART = "/cart",
  ORDERS = "/orders"
}

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ITEMS} element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
