import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CALMING_MESSAGES } from "@/constants/calmingMessages";

function getRandomMessage(exclude?: string): string {
  const available = exclude
    ? CALMING_MESSAGES.filter((m) => m !== exclude)
    : CALMING_MESSAGES;
  return available[Math.floor(Math.random() * available.length)];
}

export default function PanicButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = useCallback(() => {
    setMessage(getRandomMessage());
    setOpen(true);
  }, []);

  const handleClose = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const newMessage = useCallback(() => {
    setMessage((prev) => getRandomMessage(prev));
  }, []);

  return (
    <>
      {/* Floating panic button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:h-16 sm:w-16"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Need help now — open calming support"
      >
        <Heart className="h-6 w-6 sm:h-7 sm:w-7" />
      </motion.button>

      {/* Calming dialog */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto rounded-2xl sm:rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <DialogHeader className="text-center sm:text-center">
                <motion.div
                  className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-sage-light sm:mb-4 sm:h-16 sm:w-16"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Heart className="h-6 w-6 text-sage sm:h-8 sm:w-8" />
                </motion.div>
                <DialogTitle className="text-xl font-bold">
                  Breathe. You're okay.
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {message}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:gap-3">
                {/* New message button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={newMessage}
                  className="text-xs text-muted-foreground"
                >
                  Show another message
                </Button>

                {/* Link to Listen resources */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleClose(false)}
                >
                  <Link to="/resources#listen">
                    <Headphones className="h-4 w-4" />
                    Listen to something calming
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
