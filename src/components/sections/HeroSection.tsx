import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Vintage photo album with family memories"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-6 md:px-12 py-20">
        <div className="max-w-2xl">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase mb-6">
              <Sparkles size={16} />
              Beyond the picture
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            What if your grandparents' story could{" "}
            <span className="text-primary">last forever?</span>
          </h1>

          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Transform your cherished photos and videos into a timeless keepsake. 
            Storybook preserves your family's legacy in a beautifully crafted 
            memory book that tells your unique story.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                Shop Now
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/#features">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="flex items-center gap-6 mt-10 pt-8 border-t border-border/50 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={16} className="text-primary" />
              <span>Handcrafted with love</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen size={16} className="text-primary" />
              <span>Premium quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
