import type React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, setUser } from '../../features/user/userSlice';
import { logOut } from '../../utils/firebase';

const Header: React.FC = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await logOut();
    dispatch(setUser(null));
  };

  return (
    <header className="bg-primary text-white">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent-gold">EscortHub</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-accent-gold">Home</Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="hover:text-accent-gold">My Profile</Link>
              <button onClick={handleSignOut} className="hover:text-accent-gold">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-accent-gold">Sign In</Link>
              <Link to="/signup" className="hover:text-accent-gold">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;