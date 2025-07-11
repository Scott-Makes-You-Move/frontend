import { draftMode } from 'next/headers';
import EmbeddedVideo from '@/components/EmbeddedVideo';
import requireAuth from '@/lib/auth/requireAuth';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';

type PageQueryResult = {
  page: {
    id: string;
    sections: Array<
      | {
          __typename: 'VideoSectionRecord';
          id: string;
          videoHeader: string;
          videoSubheader: string;
          video: {
            title: string;
            url: string;
          };
        }
      | {
          __typename: 'HeroSectionRecord';
          id: string;
          heroTitle: string;
          heroSubtitle: string;
          buttons: Array<{
            label: string;
            primary: boolean;
            url: string;
          }>;
          heroImage: {
            alt: string;
            height: number;
            url: string;
            title: string;
            width: number;
          };
        }
    >;
  };
};

const query = graphql<string, never>(/* GraphQL */ `
  query MyQuery {
    page(filter: { slug: { eq: "mini-workouts" } }) {
      id
      sections {
        __typename
        ... on VideoSectionRecord {
          id
          videoHeader
          videoSubheader(markdown: false)
          video {
            title
            url
          }
        }
        ... on HeroSectionRecord {
          id
          heroTitle
          heroSubtitle(markdown: false)
          buttons {
            label
            primary
            url
          }
          heroImage {
            alt
            height
            url
            title
            width
          }
        }
      }
    }
  }
`);

export const revalidate = 60;

const WorkoutPage: React.FC = async () => {
  await requireAuth({ callbackUrl: '/mini-workouts' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { page } = await executeQuery<PageQueryResult, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return (
    <div className="p-6">
      {page.sections.map((section) => {
        if (section.__typename === 'HeroSectionRecord') {
          return (
            <section
              key={section.id}
              className="bg-primary text-white py-24 px-6 md:px-20 text-center mb-12"
            >
              <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-title font-bold mb-6">
                  {section.heroTitle}
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{section.heroSubtitle}</p>
                {section.buttons.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4">
                    {section.buttons.map((button, idx) => (
                      <a
                        key={idx}
                        href={button.url}
                        className={`px-6 py-3 rounded font-semibold transition ${
                          button.primary
                            ? 'bg-white text-primary hover:bg-gray-100'
                            : 'border border-white text-white hover:bg-white hover:text-primary'
                        }`}
                      >
                        {button.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        }

        if (section.__typename === 'VideoSectionRecord') {
          return (
            <section key={section.id} className="mb-12 flex flex-col md:flex-row max-w-4xl mx-auto">
              <div className="relative w-full md:w-64 h-48 md:h-36 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
                <EmbeddedVideo videoUrl={section.video.url} title={section.video.title} />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{section.videoHeader}</h1>
                <p className="text-xl md:text-2xl font-medium mb-2">{section.videoSubheader}</p>
              </div>
            </section>
          );
        }

        return null; // fallback for unknown section types
      })}
    </div>
  );
};

export default WorkoutPage;
