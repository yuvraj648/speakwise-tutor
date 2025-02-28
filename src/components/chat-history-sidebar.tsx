
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-10 lg:hidden"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 left-0 w-64 bg-white border-r shadow-md z-20 lg:static lg:translate-x-0"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Chat History</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-2 space-y-2">
            {history.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No chat history yet</p>
              </div>
            ) : (
              history.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-white border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelectChat(item.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm line-clamp-2">{item.preview}</p>
                    <div className="flex items-center text-xs text-zinc-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatDistanceToNow(item.timestamp, { addSuffix: true })}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </motion.div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
