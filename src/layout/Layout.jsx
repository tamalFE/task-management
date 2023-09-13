import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[78vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
