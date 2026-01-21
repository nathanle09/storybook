import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  photos: string;
}

const products: Product[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Perfect for capturing your most treasured moments",
    price: 79,
    photos: "24 photos",
    features: [
      "24 high-quality photos",
      "1 video message",
      "Hardcover binding",
      "Standard delivery",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    description: "Our most popular choice for family stories",
    price: 129,
    photos: "36 photos",
    popular: true,
    features: [
      "36 high-quality photos",
      "1 video message",
      "Premium linen cover",
      "Gift box included",
      "Priority delivery",
    ],
  },
  {
    id: "legacy",
    name: "Legacy",
    description: "The ultimate keepsake for generations to come",
    price: 199,
    photos: "48 photos",
    features: [
      "48 high-quality photos",
      "1 video message",
      "Leather-bound cover",
      "Luxury gift box",
      "Express delivery",
      "Archival-quality paper",
    ],
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-elevated ${
        product.popular
          ? "border-primary shadow-elevated scale-[1.02]"
          : "border-border shadow-card"
      }`}
    >
      {product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl font-medium mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-serif font-medium">${product.price}</span>
          <span className="text-muted-foreground text-sm">USD</span>
        </div>
        <p className="text-primary text-sm font-medium mt-2">{product.photos}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={product.popular ? "hero" : "outline"}
        className="w-full"
        size="lg"
        asChild
      >
        <Link to={`/arrange/${product.id}`}>
          Choose {product.name}
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  );
}

const Shop = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Products
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Choose Your Storybook
            </h1>
            <p className="text-muted-foreground text-lg">
              Select the perfect package to preserve your family's cherished memories
              in a beautiful, lasting keepsake.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16 pt-12 border-t border-border">
            <p className="text-muted-foreground mb-2">
              All packages include free design consultation
            </p>
            <p className="text-sm text-muted-foreground">
              30-day satisfaction guarantee • Secure payment • Worldwide shipping
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
