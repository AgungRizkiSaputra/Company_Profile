import { MetadataRoute } from 'next';
import { products } from '@/lib/products-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const locales = ['en', 'id'];
  const routes = ['', '/products', '/services', '/about', '/contact', '/privacy-policy', '/terms-of-use'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static Pages for both locales
  for (const lang of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    // Dynamic Product Detail Pages
    for (const product of products) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
