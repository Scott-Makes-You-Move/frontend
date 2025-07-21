import requireAuth from '@/lib/auth/requireAuth';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import FAQ from './faq';

type PageQueryResult = {
  page: {
    id: string;
    sections: Array<{
      __typename: 'FaqSectionRecord';
      id: string;
      title: string;
      questions: Array<{
        id: string;
        question: string;
        answer: { value: any };
      }>;
    }>;
  };
};

const query = graphql<string, never>(`
  query MyQuery {
    page(filter: { slug: { eq: "faq" } }) {
      id
      sections {
        __typename
        ... on FaqSectionRecord {
          id
          title
          questions {
            id
            question
            answer {
              value
            }
          }
        }
      }
    }
  }
`);

export const revalidate = 60;

const faqPage = async () => {
  await requireAuth({ callbackUrl: '/faq' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const {
    page: { sections },
  } = await executeQuery<PageQueryResult, never>(query, {
    includeDrafts: isDraftModeEnabled,
  });

  return <FAQ sections={sections} />;
};

export default faqPage;
