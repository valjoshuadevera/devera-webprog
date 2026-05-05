import { Link } from 'react-router-dom';
import undertakerImg from '../assets/images/undertaker.jpg'; // make sure path is correct

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 relative overflow-hidden">
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90"></div>

      {/* Undertaker Image */}
      <img
        src={undertakerImg}
        alt="Undertaker"
        className="w-72 md:w-96 mb-6 opacity-80 drop-shadow-[0_0_30px_rgba(128,0,128,0.7)] z-10"
      />

      {/* 404 Text */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-purple-500 tracking-widest mb-4 z-10">
        404
      </h1>

      {/* Message */}
      <p className="text-lg md:text-xl text-gray-300 mb-6 text-center z-10">
        The Deadman has taken this page to the grave...
      </p>

      {/* Button */}
      <Link
        to="/"
        className="z-10 rounded-md bg-purple-700 px-6 py-3 font-bold uppercase tracking-wide hover:bg-purple-500 transition-all shadow-lg shadow-purple-900"
      >
        Return to the Ring
      </Link>
    </div>
  );
};

export default NotFoundPage;