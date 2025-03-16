import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EventDistributionChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
}

export const EventDistributionChart: React.FC<EventDistributionChartProps> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Cleanup function to destroy previous chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!data || data.values.length === 0) {
    return <div className="text-center p-4">Aucune donnée disponible</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#4F46E5',
          '#7C3AED',
          '#EC4899',
          '#EF4444',
          '#F59E0B',
          '#10B981',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Pie
        ref={(element) => {
          if (element) {
            chartRef.current = element;
          }
        }}
        data={chartData}
        options={{
          animation: {
            duration: 750
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
      />
    </div>
  );
};