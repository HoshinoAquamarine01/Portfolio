import { Mail, Phone, Map, Linkedin, Facebook, Github } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
      <div className="space-y-6 justify-center">
        <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium"> Email</h4>
            <a
              href="mailto:phamgiabao141105@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all duration-300 smooth-link"
            >
              phamgiabao141105@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium"> Phone</h4>
            <a
              href="tel:+840353754605"
              className="text-muted-foreground hover:text-primary transition-all duration-300 smooth-link"
            >
              +84353754605
            </a>
          </div>
        </div>
        <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
          <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
            <Map className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium"> Location</h4>
            <p className="text-muted-foreground">
              Ho Chi Minh City, Vietnam
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <h4 className="font-medium mb-4"> Connect With Me </h4>
        <div className="flex space-x-4 justify-center">
          <a
            href="https://www.linkedin.com/in/baogia2005/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/HoshinoAquamarine01"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
          >
            <Github />
          </a>
          <a
            href="https://www.facebook.com/pham.gia.bao.543583/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook profile"
            className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
          >
            <Facebook />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
