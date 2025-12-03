// src/AppContent.tsx
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import UserInfoScreen from './screens/UserInfoScreen';

type Page = 'login' | 'dashboard' | 'userInfo';

export default function AppContent() {
  const [page, setPage] = useState<Page>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email });
    setPage('dashboard');
  };

  const handleSignOutRequest = () => setPage('userInfo');

  const handleConfirmSignOut = () => {
    setUser(null);
    setPage('login');
  };

  const handleCancelSignOut = () => setPage('dashboard');

  if (page === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (page === 'userInfo' && user) {
    return <UserInfoScreen user={user} onConfirmSignOut={handleConfirmSignOut} onCancel={handleCancelSignOut} />;
  }

  return <DashboardScreen user={user!} onSignOut={handleSignOutRequest} />;
}
