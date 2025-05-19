export const ABOUT_PAGE_QUERY = `
  query AboutPage($slug: String) {
    page(filter: { title: { eq: $slug } }) {
      title
      structuredText {
        value
      }
    }
  }
`;
