import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  slug = '', 
  imageUrl = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800', 
  type = 'website' 
}) {
  const siteUrl = 'https://mrgmwale.com';
  const fullUrl = `${siteUrl}/${slug}`;
  const displayTitle = `${title} | MR GMwale - Premium Enterprise Catalog`;

  return (
    <Helmet>
      {/* Structural Standard Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Protocol Mapping (Facebook / LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="MR GMwale" />

      {/* Twitter Cards Metadata Layer */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Schema Markup Ingestion Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MR GMwale",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-555-MWALE",
            "contactType": "customer service",
            "areaServed": "Global"
          }
        })}
      </script>
    </Helmet>
  );
}