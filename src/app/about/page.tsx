import Image from 'next/image';
import requireAuth from '@/lib/auth/requireAuth';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { draftMode } from 'next/headers';

type ImageRecord = {
  __typename: 'ImageRecord';
  id: string;
  image: {
    responsiveImage: {
      src: string;
      alt?: string;
      width: number;
      height: number;
    };
  };
};

type ImageGalleryBlockRecord = {
  __typename: 'ImageGalleryBlockRecord';
  id: string;
  assets: {
    title: string;
    url: string;
    alt: string;
  }[];
};

type VideoBlockRecord = {
  __typename: 'VideoBlockRecord';
  id: string;
  asset: {
    url: string;
    title: string;
  };
};

type AboutPageQueryResult = {
  page: {
    title: string;
    structuredText: {
      value: any;
      blocks: (ImageRecord | ImageGalleryBlockRecord | VideoBlockRecord)[];
      links: Array<{
        id: string;
        __typename: string;
      }>;
    };
  };
};

const query = graphql<string, never>(`
  query AboutPage {
    page {
      id
      title
      structuredText {
        value
        blocks {
          ... on ImageBlockRecord {
            __typename
            id
            asset {
              responsiveImage {
                src
                alt
                width
                height
              }
            }
          }
          ... on ImageGalleryBlockRecord {
            __typename
            id
            assets {
              title
              url
              alt
            }
          }
          ... on VideoBlockRecord {
            __typename
            id
            asset {
              url
              title
            }
          }
        }
        links {
          id
          __typename
        }
      }
    }
  }
`);

const AboutPage = async () => {
  await requireAuth({ callbackUrl: '/about' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { page } = await executeQuery<AboutPageQueryResult, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return (
    <>
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="https://placehold.co/300x400.png"
          alt="Team working"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="bg-primary text-background px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-background text-background text-xs px-4 py-1 rounded-full mb-6">
            About OptiFit
          </span>

          <h1 className="text-4xl md:text-5xl font-title font-black leading-tight">
            {page?.title || 'About Us'}
          </h1>
        </div>
      </section>

      <section className="bg-muted/20 px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] relative">
            <Image
              src="https://placehold.co/300x400.png"
              alt="Developers working"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
          <div className="text-foreground space-y-4">
            {page?.structuredText?.value && (
              <StructuredText<ImageRecord | ImageGalleryBlockRecord | VideoBlockRecord>
                data={page.structuredText}
                renderBlock={({ record }) => {
                  if (record.__typename === 'ImageRecord') {
                    const img = record.image.responsiveImage;
                    return (
                      <Image
                        key={record.id}
                        src={img.src}
                        alt={img.alt || ''}
                        width={img.width}
                        height={img.height}
                        className="rounded-xl my-6"
                      />
                    );
                  }

                  if (record.__typename === 'ImageGalleryBlockRecord') {
                    return (
                      <div className="grid grid-cols-2 gap-4 my-6">
                        {record.assets.map((asset, i) => (
                          <Image
                            key={i}
                            src={asset.url}
                            alt={asset.alt}
                            width={300}
                            height={200}
                            className="rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    );
                  }

                  if (record.__typename === 'VideoBlockRecord') {
                    return (
                      <div className="aspect-video my-6">
                        <video
                          controls
                          src={record.asset.url}
                          title={record.asset.title}
                          className="rounded-xl w-full h-full"
                        />
                      </div>
                    );
                  }

                  return null;
                }}
                renderLinkToRecord={({ record, children }) => {
                  return (
                    <a
                      href={`/${record.__typename.toLowerCase()}/${record.id}`}
                      className="text-primary underline"
                    >
                      {children}
                    </a>
                  );
                }}
                renderInlineRecord={({ record }) => (
                  <span className="inline-block font-medium text-primary">
                    [{record.__typename} - {record.id}]
                  </span>
                )}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
