// --- Basic Types ---

export interface ServiceItem {
  id: number;
  title: string;
  image: string;
  height?: string;
  borderRadius?: string;
  link?: string;
}

export interface StoryItem {
  id: number;
  name: string;
  age: number;
  problem: string;
  image: string;
  history: string;
  protocol: string[];
  result: string;
}

export interface BeforeAfterItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  tag: string;
  description: string;
  details: string;
}

// --- Text Styling Types ---

export interface TextStyle {
  fontSize?: string;      // text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl
  fontWeight?: string;    // font-normal, font-medium, font-semibold, font-bold
  fontFamily?: string;    // font-montserrat, font-serif, font-annabelle
  color?: string;         // text-sage-500, text-charcoal, text-gray-500, etc.
  italic?: boolean;
  uppercase?: boolean;
  letterSpacing?: string; // tracking-tight, tracking-normal, tracking-wide, tracking-widest
}

export interface EditableText {
  content: string;
  style?: TextStyle;
}

export interface EditableImage {
  url: string;
  alt?: string;
}

// --- Section Data Types ---

export interface SocialProofItem {
  id: number;
  value: string;           // "АГМУ", "6+", "85%"
  label: string;           // "образование", "лет в косметологии", etc.
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export interface SocialProofData {
  items: SocialProofItem[];
}

export interface BeforeAfterTab {
  id: string;
  label: string;
}

export interface BeforeAfterData {
  title: EditableText;
  tabs: BeforeAfterTab[];
  items: BeforeAfterItem[];
  footerText: string;
}

export interface ReviewItem {
  id: number;
  name: string;
  procedure: string;
  text: string;
  rating: number;
  date?: string;
}

export interface ReviewScreenshot {
  id: number;
  src: string;
}

export interface ReviewsData {
  title: EditableText;
  subtitle: string;
  textReviews: ReviewItem[];
  screenshots: ReviewScreenshot[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQData {
  title: EditableText;
  items: FAQItem[];
}

export interface QuizOption {
  id: string;
  label: string;
  image?: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  layout: 'grid' | 'list';
  multiSelect?: boolean;
  options: QuizOption[];
}

export interface QuizData {
  sectionTitle: EditableText;
  sectionSubtitle: string;
  completedTitle: string;
  completedSubtitle: string;
  questions: QuizQuestion[];
}

// Blog content block types
export type BlogBlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'callout' | 'columns' | 'image' | 'featureGrid' | 'steps';

export interface BlogBlockBase {
  id: string;
  type: BlogBlockType;
}

export interface BlogParagraphBlock extends BlogBlockBase {
  type: 'paragraph';
  content: string;
  dropCap?: boolean;
  columns?: boolean;
}

export interface BlogHeadingBlock extends BlogBlockBase {
  type: 'heading';
  level: 1 | 2 | 3 | 4;
  content: string;
}

export interface BlogListBlock extends BlogBlockBase {
  type: 'list';
  style: 'bullet' | 'numbered';
  items: { title?: string; text: string }[];
}

export interface BlogQuoteBlock extends BlogBlockBase {
  type: 'quote';
  content: string;
  author?: string;
  authorImage?: string;
}

export interface BlogCalloutBlock extends BlogBlockBase {
  type: 'callout';
  variant: 'info' | 'warning' | 'success';
  title?: string;
  content: string;
}

export interface BlogColumnsBlock extends BlogBlockBase {
  type: 'columns';
  columns: {
    title: string;
    variant: 'allowed' | 'warning';
    items: { title: string; text: string }[];
  }[];
}

export interface BlogImageBlock extends BlogBlockBase {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface BlogFeatureGridBlock extends BlogBlockBase {
  type: 'featureGrid';
  title?: string;
  items: { title: string; text: string }[];
}

export interface BlogStepsBlock extends BlogBlockBase {
  type: 'steps';
  title?: string;
  items: { step: string; title: string; text: string }[];
}

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogListBlock
  | BlogQuoteBlock
  | BlogCalloutBlock
  | BlogColumnsBlock
  | BlogImageBlock
  | BlogFeatureGridBlock
  | BlogStepsBlock;

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  imagePosition?: string;
  readTime: string;
  gridClass: string;
  content: BlogContentBlock[];
}

export interface BlogData {
  title: EditableText;
  posts: BlogPost[];
}

// --- Configuration Types ---

export interface ThemeConfig {
  colors: {
    primary: string; // Main accent (Sage)
    secondary: string; // Backgrounds
    text: string;
    accent: string;
  };
  fonts: {
    primary: string; // Manrope
    serif: string; // Playfair
    cursive: string; // Alex Brush
  };
  borderRadius: string;
}

export interface SectionStyle {
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  hiddenOnMobile?: boolean; // Hide on screens < 768px
  hiddenOnDesktop?: boolean; // Hide on screens >= 768px
  customClasses?: string;
}

export interface BaseSection {
  id: string;
  type: 'hero' | 'socialProof' | 'services' | 'beforeAfter' | 'reviews' | 'faq' | 'blog' | 'quiz' | 'html';
  isVisible: boolean;
  style: SectionStyle;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  data: {
    name: string;
    profession: string;
    photo: string;
    procedurePhoto: string;
    badgeText: string[];
    mainHeading: {
      line1: string;
      line2: string;
    };
    subHeading: string;
    buttonText: string;
  };
}

export interface ServicesSection extends BaseSection {
  type: 'services';
  data: {
    title: string;
    items: ServiceItem[];
  };
}

// Typed sections for each component
export interface SocialProofSection extends BaseSection {
  type: 'socialProof';
  data: SocialProofData;
}

export interface BeforeAfterSection extends BaseSection {
  type: 'beforeAfter';
  data: BeforeAfterData;
}

export interface ReviewsSection extends BaseSection {
  type: 'reviews';
  data: ReviewsData;
}

export interface FAQSection extends BaseSection {
  type: 'faq';
  data: FAQData;
}

export interface BlogSection extends BaseSection {
  type: 'blog';
  data: BlogData;
}

export interface QuizSection extends BaseSection {
  type: 'quiz';
  data: QuizData;
}

export type SectionConfig =
  | HeroSection
  | ServicesSection
  | SocialProofSection
  | BeforeAfterSection
  | ReviewsSection
  | FAQSection
  | BlogSection
  | QuizSection;

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  address: string;
  instagram: string;
  telegram: string;
  vk: string;
  max: string;
  mapLink: string;
  mapImage: string;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
  };
  theme: ThemeConfig;
  contacts: ContactInfo;
  navigation: {
    label: string;
    href: string;
  }[];
  sections: SectionConfig[]; // The order here determines the order on the page
}
