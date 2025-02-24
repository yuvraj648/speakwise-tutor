
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";

interface ChatHistoryItem {
  id: string;
  timestamp: Date;
  preview: string;
}

interface ChatHistorySidebarProps {
  history: ChatHistoryItem[];
  onSelectChat: (id: string) => void;
}

export function ChatHistorySidebar({ history, onSelectChat }: ChatHistorySidebarProps) {
  return (
    <aside className="w-64 border-r bg-zinc-50/40 backdrop-blur-xl">
      <div className="p-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-zinc-600" />
        <h2 className="font-semibold">Chat History</h2>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectChat(item.id)}
              className="w-full text-left p-3 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <p className="text-sm font-medium truncate">{item.preview}</p>
              <p className="text-xs text-zinc-500 mt-1">
                {format(item.timestamp, "MMM d, h:mm a")}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
