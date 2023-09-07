import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const [renderUI, setRenderUI] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    setRenderUI(true);
  }, []);

  if (!renderUI) return <p>Loading ...</p>;

  return <>{props.children}</>;
};

export default ProtectedRoute;
