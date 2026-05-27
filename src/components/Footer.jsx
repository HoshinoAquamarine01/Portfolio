import { ArrowUp, Facebook, Github, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/baogia2005/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/vanhuy2005",
    icon: Github,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/pham.gia.bao.543583/",
    icon: Facebook,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-border/80 bg-card/80 px-4 pt-14 pb-8 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto grid gap-10 text-left md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-xl font-bold"
          >
            <span className="rounded-md bg-primary/15 px-2 py-1 text-primary">
              Bao
            </span>
            <span className="text-foreground">Portfolio</span>
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Building thoughtful digital experiences with clean code, strong
            visual details, and user-centered interaction.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative inline-flex text-muted-foreground transition-all duration-300 hover:text-primary"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  aria-label={item.label}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-6 text-sm text-muted-foreground md:flex-row">
        <p>&copy; {year} Bao Portfolio. All rights reserved.</p>
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
        >
          Back to top
          <ArrowUp
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
