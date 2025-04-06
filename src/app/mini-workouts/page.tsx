import EmbeddedVideo from '@/components/EmbeddedVideo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';

const WorkoutPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/mini-workouts');
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-36 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
            <EmbeddedVideo
              videoUrl="https://www.youtube.com/embed/bTWomPwoUj4?si=-5-25LgnvfmFM0b6"
              title="Core Workout"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Move Your Core</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-2">10 min core workout</h2>
            <p className="mb-1">
              Build core strength and stability with this workout. Suitable for all levels.
            </p>
            <p>No equipment needed</p>
          </div>
        </div>

        {/* Workout 2 */}
        <div className="mb-12 flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-36 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
            <EmbeddedVideo
              videoUrl="https://www.youtube.com/embed/5XcVLz6BPTw?si=3moUElINIhyBq2eN"
              title="Strength Moves"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Strength Moves</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-2">30 min bodyweight strength</h2>
            <p className="mb-1">
              Improve your strength and conditioning only using your own bodyweight. Great for
              beginners and more advanced participants.
            </p>
            <p>No equipment needed.</p>
          </div>
        </div>

        {/* Workout 3 */}
        <div className="mb-12 flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-36 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
            <EmbeddedVideo
              videoUrl="https://www.youtube.com/embed/5NTn9c0LIXQ?si=_U3jd5oe2ebiDkdF"
              title="Primal Moves"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Primal Moves</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-2">15 min mobility</h2>
            <p className="mb-1">
              Get stronger, flexible and work on your stability with animal flow and primal
              movement. Explore your instinctive movement patterns.
            </p>
            <p>Suitable for intermediate and advanced movers. No equipment needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
