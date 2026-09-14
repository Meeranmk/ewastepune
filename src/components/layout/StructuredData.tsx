import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { FAQ_DATA } from '../../data/faqData';

export const StructuredData: React.FC = () => {
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "@id": "https://ewastecenterpune.online",
      "url": "https://ewastecenterpune.online",
      "telephone": SITE_CONFIG.formattedPhone,
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_CONFIG.address.street,
        "addressLocality": SITE_CONFIG.address.locality,
        "addressRegion": SITE_CONFIG.address.state,
        "postalCode": SITE_CONFIG.address.pincode,
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": SITE_CONFIG.geo.latitude,
        "longitude": SITE_CONFIG.geo.longitude
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Pune" },
        { "@type": "AdministrativeArea", "name": "Hadapsar" },
        { "@type": "AdministrativeArea", "name": "Hinjewadi" },
        { "@type": "AdministrativeArea", "name": "Kharadi" },
        { "@type": "AdministrativeArea", "name": "Kothrud" },
        { "@type": "AdministrativeArea", "name": "Baner" },
        { "@type": "AdministrativeArea", "name": "Viman Nagar" }
      ],
      "sameAs": [
        `https://wa.me/${SITE_CONFIG.whatsappNumber}`
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Inject script tags
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(faqSchema);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};
