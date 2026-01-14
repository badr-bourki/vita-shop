import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!user) {
        if (!cancelled) setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("useAdmin error:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data?.role === "admin");
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return isAdmin;
}