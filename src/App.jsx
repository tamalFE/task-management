import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignupPage';
import DashBoard from './pages/DashBoard';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/auth.context';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
