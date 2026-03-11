import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Users,
  MessageCircle,
  UserCheck,
  Menu,
  X,
  ExternalLink,
  Shield,
} from "lucide-react";

const navItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Onboarding", path: "/onboarding", icon: UserCheck },
  { title: "Curriculum", path: "/curriculum", icon: BookOpen },
  { title: "Mentors", path: "/mentors", icon: Users },
  { title: "Chat", path: "/chat", icon: MessageCircle },
];

export function QuickExitButton() {
  return (
    <a
      href="https://weather.com"
      className="fixed bottom-4 right-4 z-[100] flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs font-medium text-muted-foreground shadow-md transition-all hover:bg-muted-foreground hover:text-muted"
      title="Quick Exit"
    >
      <ExternalLink className="h-3.5 w-3.5" />
      Exit
    </a>
  );
}

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <span className="text-sm font-semibold tracking-wide text-foreground">
          overcome
        </span>

        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
        </div>
      </header>

      {/* Drawer overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <span className="text-base font-semibold text-foreground">
                  overcome
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 p-3">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4.5 w-4.5" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-border p-4">
                <p className="text-xs text-muted-foreground">
                  Your privacy is our priority.
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
