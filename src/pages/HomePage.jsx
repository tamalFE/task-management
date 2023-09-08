import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Task Management App</h1>
              <p className="mb-5">
                Streamline your productivity with our intuitive task management
                app. Easily create, organize, and prioritize tasks. Set
                deadlines, assign team members, and track progress effortlessly.
                Stay on top of your goals and achieve more with our
                user-friendly, feature-rich app.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
