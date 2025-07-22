import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Loader } from 'lucide-react';

import RootLayout from './layout/RootLayout';
import HomePage from './pages/Homepage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import NoPage from './pages/NoPage';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <BrowserRouter data-theme={theme}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
          <Route path="settings" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
          <Route path="profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);