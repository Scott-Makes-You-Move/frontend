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
  const [date, setDate] = useState<any>(new Date());

  const sessionItems: SessionItem[] = [
    { time: '10:00 AM', session: 'Hip', status: 'completed' },
    { time: '1:30 PM', session: 'Shoulder', status: 'not-completed' },
    { time: '3:00 PM', session: 'Back', status: 'completed' },
  ];

  const onDateChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8 flex flex-col justify-between items-center md:flex-row">
      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading" className="text-xl font-semibold mb-4">
          Tasks Completed Today
        </h2>

        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">
                  Time
                </th>
                <th scope="col" className="px-4 py-2 font-medium">
                  Session
                </th>
                <th scope="col" className="px-4 py-2 font-medium">
                  Done
                </th>
              </tr>
            </thead>
            <tbody>
              {sessionItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 whitespace-nowrap">{item.time}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.session}</td>
                  <td className="px-4 py-2">
                    <span
                      role="img"
                      aria-label={item.status === 'completed' ? 'Completed' : 'Not completed'}
                      className={item.status === 'completed' ? 'text-green-600' : 'text-red-600'}
                    >
                      {item.status === 'completed' ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Calendar Section">
        <div className="max-w-md">
          <Calendar
            onChange={onDateChange}
            value={date}
            aria-label="Select date"
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default SessionsPage;
