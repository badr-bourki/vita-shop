import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Package, Heart, LogOut, Settings } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Sub pages
import Profile from "./account/Profile";
import Orders from "./account/Orders";
import Wishlist from "./account/Wishlist";
import AccountSettings from "./account/Settings";

const Account = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: t('account.signedOut'),
      description: t('account.signedOutDesc'),
    });
  };

  const menuItems = [
    {
      icon: User,
      label: t('account.profile'),
      href: "/account/profile",
      description: t('account.profileDesc'),
    },
    {
      icon: Package,
      label: t('account.orders'),
      href: "/account/orders",
      description: t('account.ordersDesc'),
    },
    {
      icon: Heart,
      label: t('account.wishlist'),
      href: "/account/wishlist",
      description: t('account.wishlistDesc'),
    },
    {
      icon: Settings,
      label: t('account.settings'),
      href: "/account/settings",
      description: t('account.settingsDesc'),
    },
  ];

  const isRoot = location.pathname === "/account" || location.pathname === "/account/";

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">{t('account.title')}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          {/* Menu cards on /account root */}
          {isRoot && (
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
          )}

          {/* Back button for sub-pages */}
          {!isRoot && (
            <div className="mb-6">
              <Link
                to="/account"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                ← {t('common.back')}
              </Link>
            </div>
          )}

          {/* Nested routes */}
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="*" element={<Navigate to="/account" replace />} />
          </Routes>

          {/* Sign Out */}
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
