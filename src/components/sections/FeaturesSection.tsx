import { Camera, Film, Gift, Heart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "24-48 Photos",
    description: "Include your most treasured photographs in a beautifully curated collection.",
  },
  {
    icon: Film,
    title: "Video Integration",
    description: "Add a personal video message that brings your story to life.",
  },
  {
    icon: Heart,
    title: "Personalized Touch",
    description: "Customize every detail to reflect your family's unique journey.",
  },
  {
    icon: Gift,
    title: "Perfect Gift",
    description: "The most meaningful present for birthdays, anniversaries, or holidays.",
  },
  {
    icon: Shield,
    title: "Lasting Quality",
    description: "Premium materials designed to be treasured for generations.",
  },
  {
    icon: Sparkles,
    title: "Easy Creation",
    description: "Simple upload process makes creating your storybook effortless.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Why Storybook
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Every family has a story worth telling
          </h2>
          <p className="text-muted-foreground text-lg">
            We help you preserve those precious moments in a keepsake that 
            captures the essence of your family's journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card p-8 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
