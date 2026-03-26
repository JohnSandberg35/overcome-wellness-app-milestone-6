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

function pathIsActive(path: string, pathname: string) {
  if (path === "/resources") {
    return pathname === "/resources" || pathname.startsWith("/resources/");
  }
  return pathname === path;
}

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

  const desktopLinkClass = (active: boolean) =>
    `rounded-lg px-2.5 py-2 text-xs font-medium transition-colors lg:px-3 lg:text-sm ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
    }`;

  const signInClass =
    "flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-400/[0.09] px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.55)] transition-all hover:border-emerald-400/50 hover:bg-emerald-400/[0.16] hover:text-white hover:shadow-[0_10px_28px_-10px_rgba(16,185,129,0.45)] active:scale-[0.98] lg:gap-2 lg:px-4 lg:text-sm";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/10 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 md:justify-start md:gap-2 md:px-6 lg:gap-4 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative z-10 -ml-1 flex items-center gap-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo — always visible */}
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0 select-none transition-opacity hover:opacity-90 md:static md:shrink-0 md:translate-x-0 md:translate-y-0 lg:mr-2"
          >
            <img
              src="/shield_logo.png"
              alt=""
              aria-hidden
              className="h-12 w-12 object-contain md:h-14 md:w-14"
              width={56}
              height={56}
            />
            <span className="-ml-1 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-50/95 transition-[text-shadow,opacity] md:-ml-1.5 [text-shadow:0_0_12px_rgba(52,211,153,0.55),0_0_24px_rgba(45,212,191,0.25),0_1px_2px_rgba(0,0,0,0.35)]">
              overcome
            </span>
          </Link>

          <nav
            className="mx-2 hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 md:flex lg:gap-x-1"
            aria-label="Main navigation"
          >
            {visibleNavItems.map((item) => {
              const active = pathIsActive(item.path, location.pathname);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={desktopLinkClass(active)}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            {user ? (
              <div className="hidden items-center gap-2 border-l border-border/50 pl-3 md:flex lg:gap-3 lg:pl-4">
                <span className="hidden max-w-[10rem] truncate text-xs text-muted-foreground xl:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground lg:text-sm"
                >
                  <LogOut className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="md:border-l md:border-border/50 md:pl-4 lg:pl-5">
                <Link to="/login" className={signInClass}>
                  <LogIn className="h-3.5 w-3.5 opacity-90 lg:h-4 lg:w-4" />
                  Sign in
                </Link>
              </div>
            )}
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
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col bg-card/95 shadow-2xl backdrop-blur-2xl md:hidden"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <span className="text-base font-semibold text-emerald-50/95 [text-shadow:0_0_14px_rgba(52,211,153,0.45),0_0_28px_rgba(45,212,191,0.2)]">
                  overcome
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 p-3">
                {visibleNavItems.map((item) => {
                  const active = pathIsActive(item.path, location.pathname);
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

              <div className="flex flex-col gap-3 border-t border-border p-4">
                {user ? (
                  <>
                    <p className="truncate text-xs text-muted-foreground">
                      Signed in as{" "}
                      <span className="font-medium text-foreground">{user.email}</span>
                    </p>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
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
                      className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] px-3 py-2.5 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-400/45 hover:bg-emerald-400/[0.14]"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign in
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
