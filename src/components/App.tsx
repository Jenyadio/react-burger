import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <AppHeader/>
      <Routes>
        <Route path="/" element={<AppMain />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/ingredient" element={<IngredientPage/>}>
            <Route path=":id" element={<IngredientPage />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
