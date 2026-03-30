import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login, isLoading, error, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already signed in, don't show onboarding CTA.
  if (!isLoading && user) {
    return <Navigate to="/curriculum" replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await login({ email, password });
      navigate("/curriculum");
    } catch {
      // error is shown via `error`
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8 md:max-w-lg md:px-8 md:pb-16 md:pt-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Pick up right where you left off.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5 text-left">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-70"
        >
          {isLoading ? "Signing in..." : "Sign In"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        New here?{" "}
        {!user && (
          <Link
            to="/onboarding"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Start your onboarding
          </Link>
        )}
        .
      </p>
    </div>
  );
}

