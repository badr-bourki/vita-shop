import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Account = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  const menuItems = [
    { icon: User, label: 'Profile', href: '/account/profile', description: 'Manage your personal information' },
    { icon: Package, label: 'Orders', href: '/account/orders', description: 'View your order history and status' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', description: 'Products you\'ve saved for later' },
    { icon: Settings, label: 'Settings', href: '/account/settings', description: 'Account preferences and security' },
  ];

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {menuItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-medium transition-all animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <div className="text-center">
            <Button variant="ghost" onClick={handleSignOut} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
