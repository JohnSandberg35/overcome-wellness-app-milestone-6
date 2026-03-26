import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, EyeOff, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function AccountPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 pb-24 pt-8 text-center md:max-w-2xl md:px-8 md:pb-16 md:pt-10">
        <p className="text-sm text-muted-foreground">
          You need to be signed in to view your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password.");
      } else {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-8 md:max-w-2xl md:px-8 md:pb-16 md:pt-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Your Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information and settings.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start md:gap-6">
          <div className="flex flex-col gap-6">
            {/* Account info */}
            <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Account Info
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Anonymous mode */}
            <div className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Anonymous Mode</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your identity is kept private throughout the app. Your email is
                  never shown to other users or mentors unless you choose to share it.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Change password */}
            <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Change Password
                </p>
              </div>

              <form className="flex flex-col gap-3" onSubmit={handleChangePassword}>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {passwordError && (
                  <p className="text-sm text-destructive">{passwordError}</p>
                )}

                {passwordSuccess && (
                  <p className="text-sm text-primary">Password changed successfully!</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted-foreground/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
