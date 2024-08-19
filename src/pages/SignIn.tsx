import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUser, setStatus, setError, selectUserStatus, selectUserError } from '../features/user/userSlice';
import { signIn } from '../utils/firebase';
import Layout from '../components/common/Layout';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStatus('loading'));
    try {
      const userCredential = await signIn(email, password);
      dispatch(setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name: userCredential.user.displayName || 'User',
        userType: 'customer', // You might want to fetch this from your database
      }));
      navigate('/');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-accent-gold text-white p-2 rounded hover:bg-opacity-80"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;