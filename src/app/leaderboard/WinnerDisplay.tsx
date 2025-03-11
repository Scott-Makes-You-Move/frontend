import { Trophy } from 'lucide-react';

interface WinnerDisplayProps {
  name: string;
  isMobile: boolean;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ name, isMobile }) => (
  <div className="flex flex-col items-center text-center">
    <Trophy
      className={`${isMobile ? 'w-16 h-16 mb-2' : 'w-24 h-24 mb-4'} text-accent`}
      role="img"
      aria-label="Trophy icon representing the last month's winner"
    />
    <p className="text-sm text-gray-600 font-body" aria-live="polite">
      {"Last month's winner"}
    </p>
    <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium font-title`}>{name}</p>
  </div>
);

export default WinnerDisplay;
