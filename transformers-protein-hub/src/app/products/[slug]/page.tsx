import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { SITE_URL } from "@/lib/constants";

type ProductPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ProductPageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.brand}`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.batchCode,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="mx-auto max-w-8xl px-6">
          <nav className="font-mono text-xs text-graphite mb-8 tracking-wide">
            <span className="hover:text-gold transition-colors cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-gold transition-colors cursor-pointer">
              {product.category}
            </span>
            <span className="mx-2">/</span>
            <span className="text-bone">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <ProductGallery images={product.images} name={product.name} />
            <ProductPurchasePanel product={product} />
          </div>

          <ProductInfoTabs product={product} />
          <RelatedProducts products={related} />
        </div>
      </div>
    </>
  );
}
