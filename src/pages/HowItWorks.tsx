import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Video,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Compile Your Photos & Record a Video",
    description:
      "Gather your most meaningful 24 to 48 photos and record a personal video narration. Tell the stories behind the pictures — the laughter, the context, the memories. These are the ingredients that make your Storybook come alive.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Name Your Book",
    description:
      "Give your Storybook a meaningful title — something like \"The Johnson Family Story\" or \"Grandma's 80th Birthday.\" This title will appear on your finished keepsake.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Upload Your Photos",
    description:
      "Select your most meaningful photos and upload them. You can drag and drop to arrange them in exactly the order you want. Each photo is numbered so you always know the sequence.",
  },
  {
    number: "04",
    icon: Video,
    title: "Record a Video",
    description:
      "Upload a personal video narration to accompany your photos. Tell the stories behind the pictures — the laughter, the context, the memories. This is what makes your Storybook come alive.",
  },
  {
    number: "05",
    icon: MapPin,
    title: "Enter Shipping Info",
    description:
      "Fill in your name, email, and shipping address so we know where to send your finished Storybook. We'll also send you a confirmation email with your order details.",
  },
  {
    number: "06",
    icon: Package,
    title: "Place Your Order",
    description:
      "Review your order summary and hit \"Place Order.\" Your photos and video are securely uploaded, and our team gets to work crafting your one-of-a-kind keepsake.",
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-primary">
              How It Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
              From photos on your phone to a keepsake that lasts forever — in just a few simple
              steps.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon size={22} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-primary tracking-wider uppercase">
                        Step {step.number}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-medium mb-2">{step.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="font-serif text-xl md:text-2xl text-foreground mb-8">
              Ready to preserve your memories?
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/arrange/essential">
                Create Your Storybook
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
