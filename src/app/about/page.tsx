import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import requireAuth from '@/lib/auth/requireAuth';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="space-y-3 p-4 rounded-button hover:bg-primary/5 transition-colors">
      <h3 className="text-xl font-title font-medium text-primary">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const AboutPage = async () => {
  await requireAuth({ callbackUrl: '/about' });

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 font-body">
      <section className="mb-16 animate-fade-in">
        <h1 className="text-4xl font-title font-bold text-primary mb-8">About Us</h1>
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="font-title text-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              At OptiFit, we believe that movement is medicine. Our platform is designed with one
              simple goal: to help you embrace an active, vibrant lifestyle through the power of
              daily movement.
            </p>

            <h2 className="font-title text-2xl font-semibold text-primary mb-4">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                title="Track Progress"
                description="Monitor your daily activity with intuitive tools that help you understand and improve your movement patterns."
              />
              <FeatureCard
                title="Gamified Experience"
                description="Turn your fitness journey into an engaging adventure with our gamification features that make staying active fun and rewarding."
              />
              <FeatureCard
                title="Daily Motivation"
                description="Stay inspired with personalized encouragement and achievement tracking that celebrates your progress."
              />
              <FeatureCard
                title="Vitality Focus"
                description="We're not just about exercise – we're about helping you build sustainable habits that enhance your overall vitality."
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default AboutPage;
