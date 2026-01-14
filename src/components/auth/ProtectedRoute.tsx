import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { sanitizeRedirectPath } from "@/lib/security";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin, isAdminLoading, refreshAdmin } = useAuth();
  const location = useLocation();

  // ✅ لمنع التعليق للأبد
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setTimedOut(false);
    const t = setTimeout(() => setTimedOut(true), 7000);
    return () => clearTimeout(t);
  }, [location.pathname, requireAdmin]);

  // ✅ للصفحات العادية: ننتظر isLoading فقط
  // ✅ للـ admin: ننتظر session + فحص الأدمن
  const shouldWait = isLoading || (requireAdmin && isAdminLoading);

  if (shouldWait && !timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">
            Loading{requireAdmin ? " (checking admin permission)..." : "..."}
          </p>
        </div>
      </div>
    );
  }

  // ✅ إذا طال: لا تتركه يعلق
  if (shouldWait && timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto p-8">
          <h1 className="font-serif text-2xl font-bold">Taking too long</h1>
          <p className="text-muted-foreground">
            Session/admin check is taking longer than expected.
          </p>

          <button
            onClick={() => refreshAdmin()}
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    const safePath = sanitizeRedirectPath(location.pathname, "/");
    return <Navigate to="/auth/login" state={{ from: { pathname: safePath } }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="font-serif text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};