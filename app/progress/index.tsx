import React from "react";

// Sample data - to be replaced with database data
const weightData = [
  { month: "Jan", weight: 85 },
  { month: "Feb", weight: 84 },
  { month: "Mar", weight: 83 },
  { month: "Apr", weight: 82 },
];

const biometricsData = {
  weight: "82kg",
  fatPercentage: "14%",
  visceralFat: "7",
};

const mobilityData = {
  hips: 2,
  shoulder: 1,
  back: 2,
};

const ProgressPage: React.FC = () => {
  return (
    <div>
      <h1>Progress Page</h1>
      <p>This is the progress page.</p>
    </div>
  );
};

export default ProgressPage;
