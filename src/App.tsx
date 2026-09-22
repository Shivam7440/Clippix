import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CreditProvider } from './context/CreditContext';
import { ImageJobProvider } from './context/ImageJobContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

// Public Pages
import { Home } from './pages/public/Home';
import { Features } from './pages/public/Features';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';
import { ForgotPassword } from './pages/public/ForgotPassword';

// Authenticated Pages
import { Dashboard } from './pages/authenticated/Dashboard';
import { RemoveBackground } from './pages/authenticated/RemoveBackground';
import { History } from './pages/authenticated/History';
import { Profile } from './pages/authenticated/Profile';
import { Billing } from './pages/authenticated/Billing';

// Admin Page
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Scroll To Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrappers
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F4F4F5]">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen bg-[#09090B] text-[#F4F4F5]">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CreditProvider>
          <ImageJobProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
                <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />
                <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />

                {/* Authenticated Workspace Routes */}
                <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/remove-background" element={<AppLayout><RemoveBackground /></AppLayout>} />
                <Route path="/history" element={<AppLayout><History /></AppLayout>} />
                <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
                <Route path="/billing" element={<AppLayout><Billing /></AppLayout>} />

                {/* Admin Route */}
                <Route path="/admin" element={<AppLayout><AdminDashboard /></AppLayout>} />

                {/* Fallback Catch-All Route */}
                <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
              </Routes>
            </Router>
          </ImageJobProvider>
        </CreditProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
