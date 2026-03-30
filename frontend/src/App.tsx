import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppHeader } from "@/components/AppShell";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Mentors from "./pages/Mentors";
import Chat from "./pages/Chat";
import BookMentor from "./pages/BookMentor";
import ScienceOfRecovery from "./pages/ScienceOfRecovery";
import BuildingNewHabits from "./pages/BuildingNewHabits";
import UnderstandingTriggers from "./pages/UnderstandingTriggers";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import RewireSteps from "./pages/RewireSteps";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { AuthProvider } from "./hooks/useAuth";
import PanicButton from "./components/PanicButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppHeader />
          <PanicButton />
          <main className="min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/curriculum" element={<RewireSteps />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/book" element={<BookMentor />} />
              <Route path="/account" element={<Account />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/science-of-recovery" element={<ScienceOfRecovery />} />
              <Route path="/resources/building-new-habits" element={<BuildingNewHabits />} />
              <Route path="/resources/understanding-triggers" element={<UnderstandingTriggers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
