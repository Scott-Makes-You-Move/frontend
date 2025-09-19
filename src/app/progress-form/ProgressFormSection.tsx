import ProgressForm from './ProgressForm';

type Props = {
  accessToken: any;
  accountId: string;
  type: 'biometrics' | 'mobilities';
};

const ProgressFormSection: React.FC<Props> = ({ accessToken, accountId, type }) => {
  return (
    <section className="max-w-screen px-6 py-16">
      <ProgressForm accessToken={accessToken} accountId={accountId} type={type} />
    </section>
  );
};

export default ProgressFormSection;
