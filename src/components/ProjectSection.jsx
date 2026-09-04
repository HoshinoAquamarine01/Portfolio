import { Search, X } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ffWebImg from "../assets/ff-web.png";
import insuranceImg from "../assets/insurance.png";
import appTrackerImg from "../assets/app-tracker.png";

const projects = [
  {
    id: 1,
    title: "Fresh-Fruit-Web",
    timeline: "09/2025 - 11/2025",
    description:
      "A full-stack e-commerce web application for fresh produce, built to deliver a smooth shopping experience from product discovery to checkout. It includes category-based browsing, detailed product views, cart and quantity management, and a scalable backend structure designed for future admin features such as inventory control, order management, and promotional campaigns.",
    image: ffWebImg,
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS", "Express.js", "Vite"],
    demoUrl: null,
    githubUrl: "https://github.com/vanhuy2005/fresh-fruit-web",
    challenges: "Real-time cart synchronization between LocalStorage (guest users) and Database (upon login), while minimizing MongoDB read/write requests during rapid quantity adjustments.",
    solutions: "Designed a custom CartContext integrated with a Debouncing mechanism. Rapid item quantity changes are batched and delayed by 500ms of inactivity before firing a single API update to the backend DB.",
    codeSnippet: `router.post('/sync', authMiddleware, async (req, res) => {
  const { localCart } = req.body;
  try {
    let userCart = await Cart.findOne({ userId: req.user.id });
    if (!userCart) {
      userCart = new Cart({ userId: req.user.id, items: localCart });
      await userCart.save();
      return res.status(201).json(userCart);
    }
    
    localCart.forEach(localItem => {
      const existingItem = userCart.items.find(
        item => item.productId.toString() === localItem.productId.toString()
      );
      if (existingItem) {
        existingItem.quantity += localItem.quantity;
      } else {
        userCart.items.push(localItem);
      }
    });
    
    await userCart.save();
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: "Cart synchronization failed", error: error.message });
  }
});`
  },
  {
    id: 2,
    title: "Insurance-Management",
    timeline: "03/2026 - 05/2026",
    description:
      "A comprehensive insurance management platform designed to digitalize policy lifecycles, premium tracking, and claims processing. The system features real-time payment monitoring via VietQR/SePay webhook integration, a robust security architecture (DAC/RBAC) with granular column-level access controls, and detailed audit logs for a highly secure and automated workflow.",
    image: insuranceImg,
    tags: [
      "React",
      "Node.js",
      "SQL Server",
      "TailwindCSS",
      "Express.js",
      "TypeScript",
      "Vite",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/HoshinoAquamarine01/Insurance-Managemnt",
    challenges: "Ensuring 100% accuracy and security during automated invoice reconciliation via third-party webhooks (VietQR/SePay), preventing replay attacks and forged payment verification requests.",
    solutions: "Implemented SHA-256 HMAC signature verification middleware for SePay Webhooks. Integrated database idempotency key checks in SQL Server to guarantee each payment triggers service activation exactly once.",
    codeSnippet: `import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifySePayWebhook = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-sepay-signature'] as string;
  const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET || 'fallback_secret';

  if (!signature) {
    return res.status(401).json({ error: 'Signature header (x-sepay-signature) is missing' });
  }

  const calculatedHash = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(calculatedHash),
    Buffer.from(signature)
  );

  if (!isValid) {
    return res.status(403).json({ error: 'Signature verification failed. Potential tampering.' });
  }

  next();
};`
  },
  {
    id: 3,
    title: "Application Job Tracker",
    timeline: "02/2026 - Now",
    description:
      "An ongoing job application tracking system that helps users organize opportunities and stay on top of every application stage. It provides structured status pipelines, deadline reminders, and task-focused workflows to manage follow-ups, interviews, and priorities in one place, making the job search process more transparent, consistent, and easier to maintain over time.",
    image: appTrackerImg,
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "TailwindCSS",
      "Express.js",
      "TypeScript",
      "Vite",
      "Socket.IO",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/HoshinoAquamarine01/Job-Application-Tracker",
    challenges: "Real-time synchronization of job application Kanban card positions across multiple devices or browser tabs to prevent drag-and-drop state conflicts and data desynchronization.",
    solutions: "Architected a WebSocket synchronization layer using Socket.IO. UI states update optimistically while real-time events broadcast changes to parallel sessions, asynchronously persisting updates to MongoDB.",
    codeSnippet: `import { Server, Socket } from 'socket.io';

export const registerKanbanHandlers = (io: Server, socket: Socket) => {
  socket.on('join-workspace', (workspaceId: string) => {
    socket.join(workspaceId);
    console.log(\`Socket \${socket.id} joined workspace \${workspaceId}\`);
  });

  socket.on('card-moved', async (data: {
    cardId: string;
    sourceCol: string;
    destCol: string;
    index: number;
    workspaceId: string;
  }) => {
    const { cardId, sourceCol, destCol, index, workspaceId } = data;
    
    socket.to(workspaceId).emit('card-moved-sync', {
      cardId,
      sourceCol,
      destCol,
      index
    });

    try {
      await JobCard.findByIdAndUpdate(cardId, {
        column: destCol,
        positionIndex: index,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Failed to save Kanban move operation to DB:', err);
    }
  });
};`
  },
];

const ProjectSection = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured<span className="text-primary"> Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects, including both completed and
          ongoing work. Click "View Details" to see system architecture and key code blocks.
        </p>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-border/80 bg-card/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectSection;
