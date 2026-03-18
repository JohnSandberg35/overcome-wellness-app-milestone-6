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
import ScienceOfRecovery from "./pages/ScienceOfRecovery";
import BuildingNewHabits from "./pages/BuildingNewHabits";
import UnderstandingTriggers from "./pages/UnderstandingTriggers";
import NotFound from "./pages/NotFound";
import RewireSteps from "./pages/RewireSteps";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppHeader />
          <main className="min-h-[calc(100vh-3.5rem)]">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/curriculum" element={<RewireSteps />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/resources/science-of-recovery" element={<ScienceOfRecovery />} />
              <Route path="/resources/building-new-habits" element={<BuildingNewHabits />} />
              <Route path="/resources/understanding-triggers" element={<UnderstandingTriggers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <QuickExitButton />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
