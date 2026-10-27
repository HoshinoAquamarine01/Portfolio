import { UserCheck, MapPin, Clock, Mail } from "lucide-react";

export const DevStatusCard = ({ avatarUrl, currentTime }) => {
  return (
    <div className="bg-card/40 backdrop-blur-md border border-border/70 rounded-2xl p-6 shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Current Status
          </h3>
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>

        <div className="flex flex-col items-center text-center my-6">
          <div className="relative mb-4 group">
            <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img
              src={avatarUrl || "https://github.com/HoshinoAquamarine01.png"}
              alt="Developer Avatar"
              className="w-20 h-20 rounded-full border-2 border-primary/50 relative z-10"
              onError={(e) => {
                e.target.src = "https://github.com/HoshinoAquamarine01.png";
              }}
            />
          </div>
          <h4 className="font-bold text-lg text-foreground">Pham Gia Bao</h4>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Ho Chi Minh City, Vietnam
          </p>
          <div className="mt-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold uppercase tracking-wider">
            Active & Open for Work
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/40">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4.5 w-4.5 text-primary shrink-0" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Local Time (ICT)</p>
            <p className="font-mono text-sm font-semibold tracking-wider text-foreground">
              {currentTime || "--:--:--"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Contact Email</p>
            <a
              href="mailto:phamgiabao141105@gmail.com"
              className="text-sm font-semibold hover:text-primary transition-colors text-foreground"
            >
              phamgiabao141105@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevStatusCard;
