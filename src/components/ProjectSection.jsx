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
    challenges: "Xử lý đồng bộ giỏ hàng thời gian thực giữa LocalStorage (khách vãng lai) và Database (khi đăng nhập), đồng thời giảm tải tần suất ghi/đọc (write/read requests) vào cơ sở dữ liệu MongoDB khi người dùng bấm tăng giảm số lượng liên tiếp.",
    solutions: "Thiết kế CartContext chuyên dụng kết hợp cơ chế Debouncing. Khi khách hàng nhấn nút tăng/giảm số lượng sản phẩm nhanh, hệ thống sẽ gom và chờ 500ms không có thao tác mới rồi mới bắn một API duy nhất lên backend cập nhật DB.",
    codeSnippet: `// Express.js Cart Controller Example - Syncing & Merging Carts
router.post('/sync', authMiddleware, async (req, res) => {
  const { localCart } = req.body;
  try {
    let userCart = await Cart.findOne({ userId: req.user.id });
    if (!userCart) {
      userCart = new Cart({ userId: req.user.id, items: localCart });
      await userCart.save();
      return res.status(201).json(userCart);
    }
    
    // Merge logic: combine local cart with database cart
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
    challenges: "Đảm bảo tính chính xác và an toàn tuyệt đối khi đối soát thanh toán hóa đơn tự động qua Webhook bên thứ ba (VietQR/SePay). Ngăn chặn tấn công Replay Attack và giả mạo Request giả lập thanh toán thành công.",
    solutions: "Triển khai Middleware xác minh chữ ký bảo mật SHA-256 HMAC đính kèm trong Header của SePay Webhook. Thiết lập cơ chế kiểm tra trùng lặp mã giao dịch (idempotency key) trong cơ sở dữ liệu SQL Server để đảm bảo mỗi hóa đơn chỉ được kích hoạt dịch vụ đúng một lần.",
    codeSnippet: `// SePay Webhook Verification Middleware (SHA256 Signature)
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifySePayWebhook = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-sepay-signature'] as string;
  const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET || 'fallback_secret';

  if (!signature) {
    return res.status(401).json({ error: 'Signature header (x-sepay-signature) is missing' });
  }

  // Create HMAC hash from request body using secret key
  const calculatedHash = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // Securely compare hashes using constant-time string comparison
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
    challenges: "Đồng bộ hóa tức thời vị trí của các thẻ Kanban ứng tuyển khi người dùng đăng nhập trên nhiều thiết bị hoặc mở nhiều tab trình duyệt, tránh trường hợp xung đột dữ liệu trạng thái kéo thả (Drag and Drop conflicts).",
    solutions: "Xây dựng hạ tầng WebSockets với Socket.IO. Khi phát hiện sự kiện 'drag-end' từ UI, client lập tức cập nhật giao diện ngay trước khi có phản hồi (Optimistic UI updates) đồng thời gửi sự kiện WebSocket để đồng bộ tức thời tới các thiết bị khác, song song lưu trữ ngầm vào MongoDB.",
    codeSnippet: `// Socket.IO Sync Gateway Handler for Kanban Boards
import { Server, Socket } from 'socket.io';

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
    
    // Broadcast changes to all other clients in the same workspace room
    socket.to(workspaceId).emit('card-moved-sync', {
      cardId,
      sourceCol,
      destCol,
      index
    });

    // Handle background database write securely
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

      {/* Project Detail Modal */}
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
