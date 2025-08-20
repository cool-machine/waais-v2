import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import MentorPage from './pages/MentorPage';
import VolunteerPage from './pages/VolunteerPage';
import NewsletterPage from './pages/NewsletterPage';
import WhatsAppGroupPage from './pages/WhatsAppGroupPage';
import StartupsPage from './pages/StartupsPage';
import GiveBackProgramPage from './pages/GiveBackProgramPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import GDPRRequestPage from './pages/GDPRRequestPage';
import AdminLogin from './admin/pages/AdminLogin';
import { AuthProvider } from './admin/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/get-involved/mentor" element={<MentorPage />} />
            <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
            <Route path="/get-involved/newsletter" element={<NewsletterPage />} />
            <Route path="/get-involved/whatsapp" element={<WhatsAppGroupPage />} />
            <Route path="/startup-community/startups" element={<StartupsPage />} />
            <Route path="/startup-community/give-back" element={<GiveBackProgramPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/gdpr-request" element={<GDPRRequestPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthProvider>
  );
}

export default App;