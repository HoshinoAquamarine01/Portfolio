import { Award, ExternalLink } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

const CertificateCard = ({ certificate }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className="bg-card p-6 rounded-lg shadow-xs card-hover"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Award className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          Verified
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 leading-snug">
        {certificate.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-1">{certificate.issuer}</p>
      <p className="text-muted-foreground text-sm mb-5">
        Issued: {certificate.date}
      </p>

      <a
        href={certificate.credentialUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity duration-300"
      >
        View credential <ExternalLink size={16} />
      </a>
    </article>
  );
};

export default CertificateCard;
