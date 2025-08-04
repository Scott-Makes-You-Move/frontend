import React from 'react';
import Image from 'next/image';
import { draftMode } from 'next/headers';
import { StructuredText } from 'react-datocms';
import requireAuth from '@/lib/auth/requireAuth';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { Button } from '@/components/ui/Button';

type PageQueryResult = {
  page: {
    id: string;
    sections: Array<
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
          } | null;
        }
      | {
          __typename: 'FeatureListSectionRecord';
          id: string;
          featuresHeader: string;
          featuresSubheader: string;
          features: Array<{
            id: string;
            featureTitle: string;
            featureDescription: string;
            featureIcon: {
              alt: string;
              title: string;
              url: string;
              height: number;
              width: number;
            };
          }>;
        }
      | {
          __typename: 'DetailSectionRecord';
          id: string;
          imagePosition: 'left' | 'right' | string;
          details: {
            value: string;
          };
          image: {
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

const query = graphql<string, never>(`
  query MyQuery {
    page(filter: { slug: { eq: "home" } }) {
      id
      sections {
        __typename
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
        ... on FeatureListSectionRecord {
          id
          featuresHeader
          featuresSubheader(markdown: false)
          features {
            id
            featureTitle
            featureDescription(markdown: false)
            featureIcon {
              alt
              title
              url
              height
              width
            }
          }
        }
        ... on DetailSectionRecord {
          id
          imagePosition
          details {
            value
          }
          image {
            height
            alt
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

const Home = async () => {
  await requireAuth({ callbackUrl: '/' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { page } = await executeQuery<PageQueryResult, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return (
    <section className="min-h-screen bg-background font-body text-gray-900">
      {page.sections.map((section) => {
        switch (section.__typename) {
          case 'HeroSectionRecord':
            return (
              <section
                key={section.id}
                role="region"
                aria-labelledby="hero-heading"
                className="bg-primary text-white py-24 px-6 md:px-20 text-center"
              >
                <div className="max-w-5xl mx-auto">
                  <h1 id="hero-heading" className="text-4xl md:text-6xl font-title font-bold mb-6">
                    {section.heroTitle}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    {section.heroSubtitle}
                  </p>

                  {section.buttons.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4">
                      {section.buttons.map((button, idx) => (
                        <Button
                          key={idx}
                          as="a"
                          href={button.url}
                          variant={button.primary ? 'default' : 'outline'}
                          size="default"
                          className={
                            button.primary
                              ? 'text-primary bg-white hover:bg-gray-100'
                              : 'text-white border-white hover:bg-white hover:text-primary'
                          }
                        >
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );

          case 'FeatureListSectionRecord':
            return (
              <section
                key={section.id}
                className="bg-white py-20 px-6 md:px-20 text-center"
                role="region"
                aria-labelledby="feature-heading"
              >
                <div className="max-w-4xl mx-auto">
                  <h2
                    id="feature-heading"
                    className="text-3xl font-title font-semibold text-primary mb-4"
                  >
                    {section.featuresHeader}
                  </h2>
                  <p className="text-gray-700 mb-12">{section.featuresSubheader}</p>

                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    {section.features.map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary shadow-sm"
                      >
                        {feature.featureIcon && (
                          <Image
                            src={feature.featureIcon.url}
                            alt={feature.featureIcon.alt}
                            width={feature.featureIcon.width}
                            height={feature.featureIcon.height}
                            className="h-12 mb-4 object-contain"
                          />
                        )}
                        <h3 className="text-xl font-semibold font-title mb-2">
                          {feature.featureTitle}
                        </h3>
                        <p className="text-gray-700">{feature.featureDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'DetailSectionRecord':
            return (
              <section
                key={section.id}
                className="bg-gray-100 py-20 px-6 md:px-20"
                role="region"
                aria-labelledby="detail-heading"
              >
                <div
                  className={`max-w-5xl mx-auto flex flex-col ${
                    section.imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-10 text-center md:text-left`}
                >
                  <div className="w-full md:w-1/2">
                    <h2
                      id="detail-heading"
                      className="text-3xl font-title font-semibold text-primary mb-4"
                    >
                      The App
                    </h2>
                    <div className="text-gray-700 mb-4">
                      <StructuredText data={section.details} />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image
                      src={section.image.url}
                      alt={section.image.alt}
                      width={section.image.width}
                      height={section.image.height}
                      className="rounded-lg shadow-md w-full max-w-md mx-auto object-contain"
                    />
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

export default Home;
