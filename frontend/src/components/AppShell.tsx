import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Library,
  Users,
  MessageCircle,
  UserCheck,
  Menu,
  X,
  Shield,
  LogIn,
  LogOut,
  CircleUser,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { title: "Home", path: "/", icon: Home, hideWhenAuthed: false, authOnly: false },
  { title: "Onboarding", path: "/onboarding", icon: UserCheck, hideWhenAuthed: true, authOnly: false },
  { title: "Curriculum", path: "/curriculum", icon: BookOpen, hideWhenAuthed: false, authOnly: false },
  { title: "Mentors", path: "/mentors", icon: Users, hideWhenAuthed: false, authOnly: false },
  { title: "Chat", path: "/chat", icon: MessageCircle, hideWhenAuthed: false, authOnly: false },
  { title: "Resources", path: "/resources", icon: Library, hideWhenAuthed: false, authOnly: false },
  { title: "Account", path: "/account", icon: CircleUser, hideWhenAuthed: false, authOnly: true },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const visibleNavItems = navItems.filter((item) => {
    if (item.hideWhenAuthed && user) return false;
    if (item.authOnly && !user) return false;
    return true;
  });

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between px-4 bg-background/10 backdrop-blur-xl">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <span className="text-sm font-semibold tracking-[0.16em] uppercase text-foreground/80">
          overcome
        </span>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/30">
            <Shield className="h-4 w-4 text-emerald-300/90" />
          </div>
        </div>
      </header>

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
              className="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col bg-card/95 backdrop-blur-2xl shadow-2xl"
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
                {visibleNavItems.map((item) => {
                  const active =
                    item.path === "/resources"
                      ? location.pathname === "/resources" ||
                        location.pathname.startsWith("/resources/")
                      : location.pathname === item.path;
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

              <div className="border-t border-border p-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <p className="text-xs text-muted-foreground truncate">
                      Signed in as <span className="font-medium text-foreground">{user.email}</span>
                    </p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">
                      Your privacy is our priority.
                    </p>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
