
import './App.scss';
import Appbar from './components/Appbar';
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RecoveryPage from './pages/RecoveryPage';
import NewPasswordPage from './pages/NewPasswordPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'



function App() {

  const token = localStorage.getItem('token');

  if (!token) {
    <Navigate to="/" replace />
  } else {

  }

  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/newpassword/:email/" element={<NewPasswordPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
