import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import AppHeader from "./app-header/app-header";
import AppMain from "./app-main/app-main";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/register";
import ForgotPasswordPage from "../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../pages/reset-password/reset-password";
import ProfilePage from "../pages/profile/profile";
import OrdersPage from "../pages/orders/orders";
import {ProtectedRouteElement} from "./protected-route-element/protected-route-element";
import IngredientPage from "../pages/ingredient/ingredient";
import NotFound404Page from "../pages/404-not-found/404-not-found";
import {Modal} from "./modal/modal";
import {IngredientDetails} from "./ingredient-details/ingredient-details";
import { getItems } from "../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { authStep } from "../selectors/selectors";

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;
    let item = location.state && location.state.item;
    const dispatch = useDispatch();
    const step = useSelector(authStep);

    const handleModalClose = () => {
      navigate(-1);
    };

    useEffect(() => {
      dispatch<any>(getItems());
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<AppMain />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement anonymous={true} element={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                anonymous={true}
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                anonymous={true}
                element={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                anonymous={true}
                element={
                  step === 2 ? <ResetPasswordPage /> : <Navigate to="/" />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRouteElement element={<OrdersPage />} />}
          />
          <Route path="/ingredient/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFound404Page />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredient/:id"
              element={
                <Modal header="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails ingredient={item} />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    );
  };
  return (
    <BrowserRouter>
      <div className="App">
        <ModalSwitch />
      </div>
    </BrowserRouter>
  );
}

export default App;
