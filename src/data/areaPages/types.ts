export type AreaSection = {
  heading: string;
  paragraphs: string[];
};

export type AreaFaq = {
  question: string;
  answer: string;
};

export type AreaPageData = {
  slug: string;
  title: string;
  regionLabel: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroImage: string;
  cardImage: string;
  intro: string;
  sections: AreaSection[];
  highlights: string[];
  faqs: AreaFaq[];
  relatedSlugs: string[];
  cities: string[];
};
