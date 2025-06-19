
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// This component acts as a wrapper/router for the dashboard
// It will redirect to the appropriate dashboard (guest or host)
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      if (user?.role === 'host') {
        navigate('/dashboard/host');
      } else {
        navigate('/dashboard/guest');
      }
    }
  }, [navigate, user]);
  
  return <Outlet />;
};

export default Dashboard;
