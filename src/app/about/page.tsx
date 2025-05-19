import Image from 'next/image';
import requireAuth from '@/lib/auth/requireAuth';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { draftMode } from 'next/headers';

type AboutPageQueryResult = {
  page: {
    title: string;
    structuredText: {
      value: string;
    };
  };
};

const query = graphql<string, never>(`
  query AboutPage {
    page {
      id
      title
      structuredText {
        blocks {
          ... on ImageBlockRecord {
            id
            asset {
              url
              alt
            }
          }
          ... on ImageGalleryBlockRecord {
            id
            assets {
              title
              url
              alt
            }
          }
          ... on VideoBlockRecord {
            id
            asset {
              url(imgixParams: {})
              title
            }
          }
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
              <StructuredText
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

                  return null;
                }}
              />
            )}
            {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold">Who We Are</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              At OptiFit, we believe that movement is medicine. Our platform is designed with one
              simple goal: to help you embrace an active, vibrant lifestyle through the power of
              daily movement.
            </p> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
