import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {}
      <Footer />

    </div>
  );
};

export default Layout;