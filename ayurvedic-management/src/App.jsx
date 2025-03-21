import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAppointments from './pages/admin/Appointments';
import AdminCreateAppointment from './pages/admin/CreateAppointment';
import EditAppointment from './pages/admin/EditAppointment';
import UserManagement from './pages/admin/UserManagement';
import './App.css';

function App() {
  return (
    <SupabaseProvider>
      <BrowserRouter>
        <div className="page-container">
          <Navbar />
          <main className="flex-grow fade-in">
            <div className="content-wrapper">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected user routes */}
                <Route 
                  path="/book" 
                  element={
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  } 
                />

                {/* Admin routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/appointments" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminAppointments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/create-appointment" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminCreateAppointment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/edit-appointment/:id" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <EditAppointment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <UserManagement />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SupabaseProvider>
  );
}

export default App;
