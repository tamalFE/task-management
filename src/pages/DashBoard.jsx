import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';

const DashBoard = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1>Hello from DashBoard</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default DashBoard;
