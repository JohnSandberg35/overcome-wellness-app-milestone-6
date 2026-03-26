import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type ArticleLayoutProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: string;
  children: ReactNode;
};

export function ArticleLayout({
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-8 md:max-w-2xl md:px-8 md:pb-16 md:pt-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mb-8 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentColor}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="leading-relaxed text-foreground">{children}</div>
    </div>
  );
}
