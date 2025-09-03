import { draftMode } from 'next/headers';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import PilotChallenge from './PilotChallenge';

const query = graphql<string, never>(`
  query MyQuery {
    page(filter: { slug: { eq: "pilot-challenge" } }) {
      id
      sections {
        __typename
        ... on HeroSectionRecord {
          id
          heroTitle
          heroSubtitle
          heroDescription(markdown: false)
          image {
            alt
            height
            width
            url
            title
          }
          buttons {
            id
            label
            primary
            url
          }
          callToActionForms {
            id
            name
            email
            buttonText
            primary
          }
        }
        ... on FeatureListSectionRecord {
          id
          featuresHeader
          featuresSubheader(markdown: false)
          features {
            featureTitle
            featureDescription(markdown: false)
            featureIcon {
              alt
              title
              url
              height
              width
            }
            id
          }
        }
        ... on TestimonialsSectionRecord {
          id
          reviewTitle
          subheader(markdown: false)
          reviews {
            id
            name
            jobTitle
            initials
            rating
            review {
              value
            }
          }
        }
        ... on FooterLandingPageRecord {
          id
          companyName
          companyTagLine(markdown: false)
          copyrightText(markdown: false)
          button {
            primary
            label
            url
          }
        }
      }
    }
  }
`);

export const revalidate = 60;

const Page = async () => {
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { page } = await executeQuery<typeof query, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return <PilotChallenge page={page} />;
};

export default Page;
