// ... other imports
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { EventDistributionChart } from '../components/EventDistributionChart';

export const Dashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [pastEvents, setPastEvents] = useState(0);
  const [cancelledEvents, setCancelledEvents] = useState(0);

  useEffect(() => {
    const fetchEventCounts = async () => {
      const now = new Date().toISOString();

      // Fetch upcoming events
      const { count: upcoming } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .gt('date', now)
        .eq('status', 'active');

      // Fetch past events
      const { count: past } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .lt('date', now)
        .eq('status', 'active');

      // Fetch cancelled events
      const { count: cancelled } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .eq('status', 'cancelled');

      setUpcomingEvents(upcoming || 0);
      setPastEvents(past || 0);
      setCancelledEvents(cancelled || 0);
    };

    fetchEventCounts();
  }, []);

  const eventDistributionData = {
    labels: ['À venir', 'Passés', 'Annulés'],
    values: [upcomingEvents, pastEvents, cancelledEvents],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Répartition des événements</h2>
      <EventDistributionChart data={eventDistributionData} />
    </div>
  );
};