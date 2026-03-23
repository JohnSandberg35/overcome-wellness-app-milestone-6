import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = useCallback(() => {
    setMessage(getRandomMessage());
    setOpen(true);
  }, []);

  const handleClose = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
    setOpen(isOpen);
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const newMessage = useCallback(() => {
    setMessage((prev) => getRandomMessage(prev));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
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

      {/* Hidden audio element — swap calm.mp3 with your own file */}
      <audio ref={audioRef} src="/audio/calm.mp3" loop preload="none" />

      {/* Calming dialog */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md rounded-2xl sm:rounded-2xl">
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
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-light"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Heart className="h-8 w-8 text-sage" />
                </motion.div>
                <DialogTitle className="text-xl font-bold">
                  Breathe. You're okay.
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {message}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 flex flex-col items-center gap-3">
                {/* Audio toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  {isPlaying ? "Pause audio" : "Play calming audio"}
                </Button>

                {/* New message button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={newMessage}
                  className="text-xs text-muted-foreground"
                >
                  Show another message
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
