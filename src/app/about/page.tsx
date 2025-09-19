import Image from 'next/image';
import requireAuth from '@/lib/auth/requireAuth';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { draftMode } from 'next/headers';

type PageQueryResult = {
  page: {
    title: string;
    sections: Array<
      | {
          __typename: 'DetailSectionRecord';
          id: string;
          imagePosition: 'left' | 'right' | string;
          details: {
            value: any;
          };
          image: {
            alt: string;
            height: number;
            url: string;
            title: string;
            width: number;
          };
        }
      | {
          __typename: 'AboutIntroRecord';
          id: string;
          preHeader: string;
          subheader: string;
          introductionText: {
            value: any;
          };
        }
    >;
  };
};

const query = graphql<string, never>(`
  query MyQuery {
    page(filter: { slug: { eq: "about" } }) {
      id
      sections {
        __typename
        ... on DetailSectionRecord {
          id
          imagePosition
          details {
            value
            blocks
          }
          image {
            height
            alt
            url
            title
            width
          }
        }
        ... on AboutIntroRecord {
          id
          preHeader
          subheader(markdown: false)
          introductionText {
            value
          }
        }
      }
    }
  }
`);

export const revalidate = 60;

const AboutPage = async () => {
  await requireAuth({ callbackUrl: '/about' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { page } = await executeQuery<PageQueryResult, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return (
    <section className="min-h-screen bg-background font-body text-gray-900">
      {page.sections.map((section) => {
        switch (section.__typename) {
          case 'AboutIntroRecord':
            return (
              <section
                key={section.id}
                className="bg-primary text-white py-24 px-6 md:px-20 text-center"
              >
                <div className="max-w-5xl mx-auto">
                  {section.preHeader && (
                    <span className="inline-block text-xs tracking-widest uppercase border px-4 py-1 rounded-full border-white mb-4">
                      {section.preHeader}
                    </span>
                  )}
                  <h1 className="text-4xl md:text-6xl font-title font-bold mb-6">
                    {section.subheader}
                  </h1>
                  <div className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
                    <StructuredText data={section.introductionText} />
                  </div>
                </div>
              </section>
            );

          case 'DetailSectionRecord':
            return (
              <section key={section.id} className="bg-gray-100 py-20 px-6 md:px-20">
                <div
                  className={`max-w-5xl mx-auto flex flex-col md:flex-row ${
                    section.imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-10 text-center md:text-left`}
                >
                  {/* Image always comes first in markup */}
                  <div
                    className={`w-full md:w-1/2 ${
                      section.imagePosition === 'left' ? 'order-1 md:order-1' : 'order-1 md:order-2'
                    }`}
                  >
                    {section.image && (
                      <Image
                        src={section.image.url}
                        alt={section.image.alt}
                        width={section.image.width}
                        height={section.image.height}
                        className="rounded-lg shadow-md w-full max-w-md mx-auto object-contain"
                      />
                    )}
                  </div>

                  <div
                    className={`w-full md:w-1/2 ${
                      section.imagePosition === 'left' ? 'order-2 md:order-2' : 'order-2 md:order-1'
                    }`}
                  >
                    <div className="text-gray-700 mb-4">
                      <StructuredText data={section.details} />
                    </div>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </section>
  );
};

export default AboutPage;
