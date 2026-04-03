import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  keywords?: string;
  schema?: any;
}

const SEO = ({
  title = "HerbsEra | Premium Gemstone Soaps & Ayurvedic Skincare",
  description = "Crystallizing nature's healing essence into luxurious rituals. India's first gemstone soaps, crafted for the conscious soul. 100% Herbal, No Chemicals.",
  canonical = "https://herbsera.in",
  ogType = "website",
  ogImage = "https://herbsera.in/og-image.png", // Fallback OG image
  twitterHandle = "@HerbsEra",
  keywords = "gemstone soap, ayurvedic soap, herbal soap, natural skincare, herbsera, luxury soap india",
  schema
}: SEOProps) => {
  const siteName = "HerbsEra";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
