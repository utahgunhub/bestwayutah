export type ServiceSection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroImage: string;
  cardImage: string;
  intro: string;
  sections: ServiceSection[];
  highlights: string[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
};
