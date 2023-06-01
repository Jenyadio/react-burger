import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header';
import AppMain from './app-main/app-main';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ForgotPasswordPage from '../pages/forgot-password';
import ResetPasswordPage from '../pages/reset-password';
import ProfilePage from '../pages/profile';

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
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
