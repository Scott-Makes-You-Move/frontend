import ProgressFormSection from './ProgressFormSection';

export default async function ProgressFormPage() {
  return (
    <div className="max-w-screen pt-20 ">
      <ProgressFormSection accessToken="12345" accountId="1234" type="biometrics" />
      <ProgressFormSection accessToken="12345" accountId="1234" type="mobility" />
    </div>
  );
}
