import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-semibold">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-foreground">
                  Storybook
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase -mt-1">
                  Beyond the picture
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Preserve your family's most precious moments in beautifully crafted 
              keepsakes that tell your unique story for generations to come.
            </p>
            <a 
              href="mailto:storybookincubator@gmail.com" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block mt-4"
            >
              Email Us: storybookincubator@gmail.com
            </a>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Storybook. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-primary fill-primary" /> for preserving memories
          </p>
        </div>
      </div>
    </footer>
  );
}
