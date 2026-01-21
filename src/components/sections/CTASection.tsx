import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="bg-primary rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary-foreground mb-4">
              Ready to preserve your story?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Start creating your family's timeless keepsake today. 
              It only takes a few minutes to begin.
            </p>
            <Button
              variant="secondary"
              size="xl"
              asChild
              className="shadow-elevated"
            >
              <Link to="/shop">
                Get Started
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
