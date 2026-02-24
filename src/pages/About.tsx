import { Layout } from "@/components/layout/Layout";
import nathanlePhoto from "@/assets/nathanle-profile-pic.png";

const About = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-primary">
              About Storybook
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
              Every Picture Tells a Story. We Help You Tell Yours.
            </p>
          </div>

          <div className="space-y-16 max-w-3xl mx-auto">
            {/* Intro */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-foreground">
                We live in a world where we take more photos than ever before, yet we look at them
                less and less. They sit in the cloud, buried in folders, or lost in an endless
                scroll.
              </p>
              <p className="text-base leading-relaxed text-foreground">
                At Storybook, we believe your memories deserve better. We believe that a photo
                captures a moment, but a voice captures the feeling.
              </p>
            </div>

            {/* Who We Are */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-medium">Who We Are</h2>
              <p className="text-base leading-relaxed text-foreground">
                We are a close-knit team of four friends, engineers, and designers who share a
                simple obsession: The power of storytelling.
              </p>
              <p className="text-base leading-relaxed text-foreground">
                Storybook began with a realization. We noticed that when we showed photos to our
                families, the magic wasn't just in the image on the screen; it was in the
                conversation that happened around it. It was the laughter while explaining a candid
                shot, the context behind a smile, or the nostalgia in a grandparent's voice.
              </p>
              <p className="text-base leading-relaxed text-foreground">
                We asked ourselves: What if we could capture that narration and bind it forever with
                the photos?
              </p>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-medium">What We Do</h2>
              <p className="text-base leading-relaxed text-foreground">
                Storybook is an interactive photo album experience designed to preserve your memories
                forever. We move beyond the picture to create an immersive story.
              </p>
              <p className="text-base leading-relaxed text-foreground">
                We embrace the beauty of curation. Rather than overwhelming you with thousands of
                images, we ask you to select your most meaningful 24 to 48 photos. You then record a
                video narration — your voice, your face, your emotions — guiding the viewer through
                the journey.
              </p>
              <p className="text-base leading-relaxed text-foreground">
                The result is a seamless blend of visual and auditory memory. It's not just an album;
                it's a time capsule.
              </p>
            </div>

            {/* Our Values */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-medium">Our Values</h2>
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <h3 className="font-serif text-lg font-medium mb-2">
                    Intention over Volume
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe 24–48 photos with a story are worth more than 3,000 photos without
                    context.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <h3 className="font-serif text-lg font-medium mb-2">Connection First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Technology should bring us closer, not isolate us. Storybook is built to be
                    shared, watched, and experienced together.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <h3 className="font-serif text-lg font-medium mb-2">Preserving Legacy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We build our products to ensure that your stories — your voice — are preserved
                    for the next generations.
                  </p>
                </div>
              </div>
            </div>

            {/* Meet the Team */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-medium">Meet the Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 text-center">
                  <img
                    src={nathanlePhoto}
                    alt="Nathan Le"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-serif text-lg font-medium">Nathan Le</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder</p>
                  <p className="text-sm text-foreground mt-1">Manages technical operations</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-3xl font-semibold text-primary">DM</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium">Drew Murphy</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder</p>
                  <p className="text-sm text-foreground mt-1">Product Manager</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-3xl font-semibold text-primary">JW</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium">Jacob Williamson</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder</p>
                  <p className="text-sm text-foreground mt-1">
                    Manages marketing and social media
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-3xl font-semibold text-primary">JP</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium">Josh Pedersen</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder</p>
                  <p className="text-sm text-foreground mt-1">Graphic designer</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <p className="font-serif text-xl md:text-2xl text-foreground">
                Your memories are already beautiful. Let's make them unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
