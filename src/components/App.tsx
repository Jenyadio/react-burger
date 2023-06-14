import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './app-header/app-header';
import AppMain from './app-main/app-main';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import ForgotPasswordPage from '../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../pages/reset-password/reset-password';
import ProfilePage from '../pages/profile/profile';
import OrdersPage from '../pages/orders/orders';
import ProtectedRouteElement from './protected-route-element/protected-route-element';
import IngredientPage from '../pages/ingredient/ingredient';
import NotFound404Page from '../pages/404-not-found/404-not-found';
import Modal from './modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;
    let item = location.state && location.state.item;

    const handleModalClose = () => {
      navigate(-1);
    };


  return (
    <>
      <AppHeader/>
        <Routes location={background || location}>
          <Route path="/" element={<AppMain />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/ingredient/:id" element={<IngredientPage/>}/>
          <Route path="*" element={<NotFound404Page/>}/>
        </Routes>

          {background && (
           <Routes>
            <Route
              path='/ingredient/:id'
              element={
              <Modal header="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails ingredient={item}/>
              </Modal>
              }
            />
            </Routes>
          )}
    </>
    );
  }
  return (
  <BrowserRouter>
    <div className="App">
      <ModalSwitch/>
    </div>
  </BrowserRouter>
  );
}

export default App;
