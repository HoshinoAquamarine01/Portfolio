# My Portfolio - Full Stack Developer

This portfolio is a modern, fully responsive website built with React and Vite to present my work as a Full Stack Developer.
It highlights selected projects, practical technical strengths, and my approach to building clean, user-focused web products.
The site is structured to help recruiters and hiring managers quickly understand my capabilities, experience, and ways to connect.

## 🎯 Recent Improvements (2026)

- **Enhanced SEO** with structured data, Open Graph tags, and better meta descriptions
- **Form Validation** with real-time error feedback and improved UX
- **Resume Download** feature for easy access to your CV
- **Image Optimization** with lazy loading and error handling
- **Keyboard Accessibility** with full keyboard navigation support
- **WCAG Compliance** with proper ARIA labels and semantic HTML
- **Performance Utilities** for critical image preloading and motion preferences
- **Skip to Main Content** link for screen reader users


## Why this portfolio stands out

- **Clear personal positioning**: Full Stack Developer with product mindset
- **Recruiter-friendly structure**: Hero → About → Skills → Projects → Contact
- **Smooth UX**: responsive navigation, animated sections, dark/light mode
- **Real contact workflow**: integrated EmailJS form with toast notifications
- **Accessibility-first**: WCAG compliant with proper keyboard navigation
- **SEO optimized**: structured data, meta tags, and semantic HTML
- **Clean and maintainable codebase** with reusable components

## Live sections

- Hero introduction with animated tech stack
- About me with professional summary and expertise areas
- Skills with category filtering and proficiency bars
- Featured projects gallery with lazy-loaded images
- Certificate/achievements section
- Contact form with validation
- Social links + Resume download

## Tech stack

- Frontend: React 19, React Router 7, Vite 7
- Styling: Tailwind CSS 4
- UI/Icons: Lucide React
- Notifications: react-hot-toast
- Contact service: EmailJS Browser SDK
- Tooling: ESLint, Vite
- Accessibility: Semantic HTML, ARIA labels, WCAG 2.1 compliant

## Project structure

```text
src/
	components/
		HeroSection.jsx          # Hero section with CTA
		AboutMe.jsx              # About section + Resume download
		SkillSection.jsx         # Categorized skills with filters
		ProjectSection.jsx       # Lazy-loaded project gallery
		ContactSection.jsx       # Form with validation
		CertificateSection.jsx   # Achievements display
		Navbar.jsx               # Accessible navigation
		Footer.jsx               # Social links + quick nav
		ThemeToggle.jsx          # Dark/Light mode
		StarBackground.jsx       # Animated background
	pages/
		Home.jsx                 # Main page with skip link
		Notfound.jsx             # 404 page
	lib/
		utils.js                 # Utility functions
		resume.js                # Resume download utilities
		performance.js           # Performance optimization tools
	App.jsx                      # App routing setup
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables** - Create `.env.local`:

   ```
   VITE_EMAILJS_PUBLIC_KEY=your_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_TEMPLATE_ID_OWNER=your_owner_template_id
   VITE_RECEIVER_EMAIL=your_email@example.com
   ```

3. **Add resume file** - Place your resume at:

   ```
   public/files/resume.pdf
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📋 Customization Guide

### Update Personal Information

- **Navbar**: Edit `navItems` in `src/components/Navbar.jsx`
- **Hero Section**: Update `PROFILE_IMAGE_SRC` and tech stack
- **About Section**: Modify expertise cards and personal bio
- **Projects**: Update project data array in `ProjectSection.jsx`
- **Skills**: Add/remove skills in `SkillSection.jsx`
- **Contact**: Update email and phone in `ContactSection.jsx`
- **Social Links**: Update URLs in `Footer.jsx` and `ContactSection.jsx`

### Styling

- Color scheme: Update CSS variables in `src/index.css` (`:root` and `.dark`)
- Animations: Customize keyframes in `src/index.css`
- Layout: Use Tailwind classes in components

### SEO

- Update canonical URL in `index.html`
- Modify social media meta tags
- Update JSON-LD structured data with your information

## ♿ Accessibility Features

- ✅ Keyboard navigation (Tab, Escape)
- ✅ Screen reader support (ARIA labels, semantic HTML)
- ✅ Skip to main content link
- ✅ Focus management
- ✅ Form validation with error messages
- ✅ Color contrast compliant
- ✅ Mobile-friendly responsive design
- ✅ Reduced motion support

## 🚀 Performance Optimizations

- Image lazy loading
- Async image decoding
- CSS animations with GPU acceleration
- Optimized bundle size with Vite
- Critical CSS inlined
- Form validation on client-side

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design from 320px and up

## 🔗 Quick Links

- **Live Demo**: [Your deployed URL]
- **Source Code**: [GitHub Repository]
- **Contact**: [Your Email]
- **LinkedIn**: [Your Profile]
- **GitHub**: [Your Account]

## 📝 License

This portfolio template is open source. Feel free to use it as a starting point for your own portfolio.

---

**Last Updated**: April 2026
**Status**: ✅ Production Ready with Professional Accessibility & SEO Standards

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Available scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment variables (EmailJS)

Create a `.env` file in project root:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_TEMPLATE_ID_OWNER=your_owner_template_id
VITE_RECEIVER_EMAIL=your_email@example.com
```

## Customization checklist before sending to recruiters

- Replace personal name in `src/components/HeroSection.jsx`
- Replace project list, images, demo URLs, and GitHub URLs in `src/components/ProjectSection.jsx`
- Replace contact email/phone/location/social links in `src/components/ContactSection.jsx`
- Replace CV download link in `src/components/AboutMe.jsx`
- Update GitHub profile link at the bottom of Projects section

## Suggested next upgrades

- Add real project thumbnails from `public/projects/`
- Add performance and SEO pass (meta tags, Open Graph, sitemap)
- Add language toggle (VI/EN)
- Deploy to Vercel/Netlify and attach live URL in CV

## Recruiter snapshot

This portfolio is designed to communicate three things quickly:

- I can build end-to-end web products
- I care about UI quality and user experience
- I can ship and maintain production-ready code


