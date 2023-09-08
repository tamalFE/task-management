import Footer from './Footer';
import NavBar from './NavBar';

const Layout = (props) => {
  return (
    <div>
      <NavBar />
      <div className="my-5">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
