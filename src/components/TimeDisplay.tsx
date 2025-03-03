import React from 'react';

interface TimeDisplayProps {
  nextBreakTime: string;
  nextBreakPrefix: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ nextBreakPrefix, nextBreakTime }) => {
  return (
    <div className="mt-6 p-4 bg-accent text-primary font-body rounded-lg h-max">
      <p>
        {nextBreakPrefix} <span className="font-bold">{nextBreakTime}</span>
      </p>
    </div>
  );
};

export default TimeDisplay;
