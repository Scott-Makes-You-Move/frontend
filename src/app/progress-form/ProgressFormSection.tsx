import Image from 'next/image';
import ProgressForm from './ProgressForm';

type Props = {
  accessToken: any;
  accountId: string;
  type: 'biometrics' | 'mobility';
};

const ProgressFormSection: React.FC<Props> = ({ accessToken, accountId, type }) => {
  return (
    <section className="max-w-screen px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <ProgressForm accessToken={accessToken} accountId={accountId} type={type} />
        </div>

        <div className="w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="https://placehold.co/800x600.png"
            alt="User reviewing data"
            width={800}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ProgressFormSection;
