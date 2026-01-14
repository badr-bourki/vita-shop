import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container-custom py-12">
      <h1 className="font-serif text-3xl font-bold mb-2">Profile</h1>
      <p className="text-muted-foreground mb-6">
        Manage your personal information
      </p>

      <div className="p-6 bg-card border border-border rounded-xl">
        <p className="font-medium mb-2">Email</p>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  );
}
