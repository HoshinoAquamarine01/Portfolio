import { Award, ExternalLink } from "lucide-react";
import CertificateCard from "./CertificateCard";

const certificates = [
  {
    id: 1,
    title: "Accelerate Your Job Search with AI",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/D7J5OS86QOY6?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    id: 2,
    title: "Software Developer Career Guide and Interview Preparation",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/70Z46E9UH6RQ?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    id: 3,
    title: "Node.js & MongoDB: Developing Back-end Database Applications",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/9Z3PPJIFHXGD",
  },
  {
    id: 4,
    title: "The Ultimate SQL Bootcamp : Go From Zero to Hero",
    issuer: "Udemy",
    date: "2026",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-388e4002-e794-4bab-b7b1-1e38430326e9/",
  },
  {
    id: 5,
    title: "Advanced React",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/0VY30WJYA44O",
  },
  {
    id: 6,
    title: "React basics",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/IJO8IVOTNTO0",
  },
  {
    id: 7,
    title: "Meta React Specialization",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/9DZJ1H8QH9R2",
  },
  {
    id: 8,
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/SQ91AQ7X0TZX",
  },
  {
    id: 9,
    title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/H35YB6MAIBDG",
  },
  {
    id: 10,
    title: "Essential Google Cloud Infrastructure: Foundation",
    issuer: "Coursera",
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/I3MK8X80HT1U",
  },
];

const CertificateSection = () => {
  return (
    <section id="certificates" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Certificates</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professional learning journey through verified courses and technical
          certifications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
