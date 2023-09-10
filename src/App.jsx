import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/auth.context';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import Teams from './pages/Teams';

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
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
