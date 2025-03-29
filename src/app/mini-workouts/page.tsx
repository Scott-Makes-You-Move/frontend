'use client';

import Image from 'next/image';

const WorkoutPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-36 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
            <Image
              src="https://fakeimg.pl/64x48"
              alt="Core workout"
              className="w-full h-full object-cover rounded"
              width={64}
              height={48}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
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
            <Image
              src="https://fakeimg.pl/64x48"
              alt="Strength workout"
              className="w-full h-full object-cover rounded"
              width={64}
              height={48}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
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
            <Image
              src="https://fakeimg.pl/64x48"
              alt="Mobility workout"
              className="w-full h-full object-cover rounded"
              width={64}
              height={48}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
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
