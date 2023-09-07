import Footer from './Footer';
import NavBar from './NavBar';

const Layout = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
