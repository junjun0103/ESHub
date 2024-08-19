import type React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/common/Layout';
import StoriesSection from '../components/home/StoriesSection';
import PremiumSection from '../components/home/PremiumSection';
import EscortsSection from '../components/home/EscortsSection';
import { selectEscortsStatus, setEscorts, setStatus } from '../features/escorts/escortsSlice';
import { fetchEscorts } from '../features/escorts/escortsAPI';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectEscortsStatus);

  useEffect(() => {
    const getEscorts = async () => {
      dispatch(setStatus('loading'));
      try {
        // Set this to true to use mock data, false to use Firebase data
        const useMockData = true; 
        const escorts = await fetchEscorts(useMockData);
        dispatch(setEscorts(escorts));
        dispatch(setStatus('idle'));
      } catch (error) {
        console.error('Failed to fetch escorts:', error);
        dispatch(setStatus('failed'));
      }
    };

    getEscorts();
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-8">
        <StoriesSection />
        <PremiumSection />
        {status === 'loading' && <p>Loading escorts...</p>}
        {status === 'failed' && <p>Failed to load escorts. Please try again later.</p>}
        {status === 'idle' && <EscortsSection />}
      </div>
    </Layout>
  );
};

export default Home;