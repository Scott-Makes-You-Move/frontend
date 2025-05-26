'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface SessionsPageProps {
  accountId: string;
  accessToken: string;
}

type SessionItem = {
  time: string;
  session: string;
  status: 'completed' | 'not-completed';
};

const SessionsPage = ({ accountId, accessToken }: SessionsPageProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [sessionItems, setSessionItems] = useState<SessionItem[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(
          `https://smym-backend-service.azurewebsites.net/api/v1/account/${accountId}/sessions`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        if (Array.isArray(data.content)) {
          const selectedDate = date.toLocaleDateString('en-CA');

          const formatted = data.content
            .filter((session: { sessionStartTime: string }) =>
              session.sessionStartTime.startsWith(selectedDate),
            )
            .map((session: any) => {
              const time = new Date(session.sessionStartTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return {
                time,
                session:
                  session.exerciseType.charAt(0) + session.exerciseType.slice(1).toLowerCase(),
                status: session.sessionStatus === 'COMPLETED' ? 'completed' : 'not-completed',
              };
            });

          setSessionItems(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch session data:', error);
      }
    };

    fetchSessions();
  }, [date]);

  const onDateChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col justify-between items-center md:flex-row font-body border border-red-500 md:gap-x-4">
      {/* Task Table */}
      <section aria-labelledby="tasks-heading" className="w-full md:w-1/2 mb-8 md:mb-0">
        <h2 id="tasks-heading" className="text-xl font-semibold mb-4">
          Tasks Completed on {date.toLocaleDateString()}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full text-sm text-left" role="table">
            <thead className="bg-gray-100 text-gray-700" role="rowgroup">
              <tr role="row">
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
            <tbody role="rowgroup">
              {sessionItems.map((item, index) => (
                <tr key={index} className="border-t" role="row">
                  <td className="px-4 py-2 whitespace-nowrap" role="cell">
                    {item.time}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap" role="cell">
                    {item.session}
                  </td>
                  <td className="px-4 py-2" role="cell">
                    <span
                      aria-label={item.status === 'completed' ? 'Completed' : 'Not completed'}
                      role="img"
                      className={`inline-block text-lg ${
                        item.status === 'completed' ? 'text-green-800' : 'text-red-800'
                      }`}
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

      {/* Calendar */}
      <section aria-labelledby="calendar-heading" className="w-full md:w-1/2">
        <h2 id="calendar-heading" className="sr-only">
          Select a Date from the Calendar
        </h2>

        <div className="max-w-md">
          <Calendar
            onChange={onDateChange}
            value={date}
            aria-label="Select a date"
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default SessionsPage;
