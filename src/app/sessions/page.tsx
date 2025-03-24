'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type SessionItem = {
  time: string;
  session: string;
  status: 'completed' | 'not-completed';
};

const SessionsPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const sessionItems: SessionItem[] = [
    { time: '10:00 AM', session: 'Hip', status: 'completed' },
    { time: '1:30 PM', session: 'Shoulder', status: 'not-completed' },
    { time: '3:00 PM', session: 'Back', status: 'completed' },
  ];

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Tasks Completed Today</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Session</th>
                <th className="text-right py-2">Done</th>
              </tr>
            </thead>
            <tbody>
              {sessionItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.time}</td>
                  <td className="py-2">{item.session}</td>
                  <td className="py-2 text-right">
                    {item.status === 'completed' ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
       
          <Calendar onChange={onDateChange} value={date} />
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
