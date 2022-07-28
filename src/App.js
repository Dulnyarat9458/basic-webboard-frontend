
import './App.scss';
import Appbar from './components/Appbar';
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RecoveryPage from './pages/RecoveryPage';
import NewPasswordPage from './pages/NewPasswordPage';
import WriteContentPage from './pages/WriteContentPage';
import StagePage from './pages/StagePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage';
import MyPostPage from './pages/MyPostPage';
import FullContentPage from './pages/FullContentPage';
import EditContentPage from './pages/EditContentPage';
import EditCommentPage from './pages/EditCommentPage';
import AdminDashboard from './pages/admin/AdminDashboard';
function App() {

  const token = localStorage.getItem('token');

  if (!token) {
    <Navigate to="/" replace />
  } else {

  }

  return (
    <BrowserRouter>
      <Appbar />
      <div className='adjust-page'></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/stage" element={<StagePage />} />
        <Route path="/writecontent" element={<WriteContentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mypost" element={<MyPostPage />} />
        <Route path="/fullcontent/:id/" element={<FullContentPage />} />
        <Route path="/fullcontent/:id/editcontent" element={<EditContentPage />} />
        <Route path="/fullcontent/:id/editcomment" element={<EditCommentPage />} />
        <Route path="/newpassword/:email/" element={<NewPasswordPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <div className='adjust-page'></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
