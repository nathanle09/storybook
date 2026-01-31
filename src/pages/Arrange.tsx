import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

const productDetails: Record<string, { name: string; photos: string; price: number }> = {
  essential: { name: "Essential", photos: "24 photos", price: 79 },
  signature: { name: "Signature", photos: "36 photos", price: 129 },
  legacy: { name: "Legacy", photos: "48 photos", price: 199 },
};

const Arrange = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productDetails[productId || "essential"];

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in session storage for checkout
    sessionStorage.setItem("arrangeData", JSON.stringify({ ...formData, productId, product }));
    navigate("/checkout");
  };

  if (!product) {
    navigate("/shop");
    return null;
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate("/shop")}
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Personalize Your Storybook
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              {product.name} Package
            </h1>
            <p className="text-muted-foreground">
              {product.photos} • ${product.price}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Title Section */}
            <div className="bg-card rounded-xl p-8 shadow-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <h2 className="font-serif text-xl font-medium">Book Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base">Book Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., The Johnson Family Story"
                    className="mt-2"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle" className="text-base">Subtitle (Optional)</Label>
                  <Input
                    id="subtitle"
                    placeholder="e.g., 1950 - Present"
                    className="mt-2"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base">Personal Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write a heartfelt message that will appear on the first page of your storybook..."
                    className="mt-2 min-h-[120px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Cover Style Section */}
            <div className="bg-secondary/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Your Selection</span>
                <span className="text-2xl font-serif font-medium">${product.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {product.name} Package • {product.photos} • 1 video
              </p>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Continue to Checkout
                <ArrowRight size={18} />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Arrange;
