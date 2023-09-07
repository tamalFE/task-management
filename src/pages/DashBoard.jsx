import ProtectedRoute from '../component/HOC/ProtectedRoute';

const DashBoard = () => {
  return (
    <ProtectedRoute>
      <h1>Hello from DashBoard</h1>
    </ProtectedRoute>
  );
};

export default DashBoard;
