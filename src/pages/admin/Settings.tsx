import { useState, useEffect } from 'react';
import { Settings, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getSiteSettings, updateSiteSetting, type SiteSettings } from '@/lib/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (key: keyof SiteSettings) => {
    if (!settings) return;
    
    setIsSaving(key);
    try {
      await updateSiteSetting(key, settings[key]);
      toast({
        title: 'Settings saved',
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} settings have been updated.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(null);
    }
  };

  const updateNestedSetting = (
    section: keyof SiteSettings,
    field: string,
    value: string | number
  ) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Site Settings</h1>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>General store information and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store_name">Store Name</Label>
                <Input
                  id="store_name"
                  value={settings.store.name}
                  onChange={(e) => updateNestedSetting('store', 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store_tagline">Tagline</Label>
                <Input
                  id="store_tagline"
                  value={settings.store.tagline}
                  onChange={(e) => updateNestedSetting('store', 'tagline', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free_shipping">Free Shipping Threshold ($)</Label>
                <Input
                  id="free_shipping"
                  type="number"
                  min="0"
                  value={settings.store.free_shipping_threshold}
                  onChange={(e) => updateNestedSetting('store', 'free_shipping_threshold', parseFloat(e.target.value) || 0)}
                />
              </div>
              <Button onClick={() => handleSave('store')} disabled={isSaving === 'store'}>
                {isSaving === 'store' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save Store Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Settings */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
              <CardDescription>Edit the content displayed on your About page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about_title">Page Title</Label>
                <Input
                  id="about_title"
                  value={settings.about.title}
                  onChange={(e) => updateNestedSetting('about', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about_story">Our Story</Label>
                <Textarea
                  id="about_story"
                  value={settings.about.story}
                  onChange={(e) => updateNestedSetting('about', 'story', e.target.value)}
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about_mission">Mission Statement</Label>
                <Textarea
                  id="about_mission"
                  value={settings.about.mission}
                  onChange={(e) => updateNestedSetting('about', 'mission', e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={() => handleSave('about')} disabled={isSaving === 'about'}>
                {isSaving === 'about' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save About Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact details displayed on your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email Address</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => updateNestedSetting('contact', 'email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact.phone}
                  onChange={(e) => updateNestedSetting('contact', 'phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address">Address</Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact.address}
                  onChange={(e) => updateNestedSetting('contact', 'address', e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_hours">Business Hours</Label>
                <Input
                  id="contact_hours"
                  value={settings.contact.hours}
                  onChange={(e) => updateNestedSetting('contact', 'hours', e.target.value)}
                />
              </div>
              <Button onClick={() => handleSave('contact')} disabled={isSaving === 'contact'}>
                {isSaving === 'contact' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save Contact Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Links to your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  value={settings.social.facebook}
                  onChange={(e) => updateNestedSetting('social', 'facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  value={settings.social.instagram}
                  onChange={(e) => updateNestedSetting('social', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_twitter">Twitter URL</Label>
                <Input
                  id="social_twitter"
                  value={settings.social.twitter}
                  onChange={(e) => updateNestedSetting('social', 'twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_youtube">YouTube URL</Label>
                <Input
                  id="social_youtube"
                  value={settings.social.youtube}
                  onChange={(e) => updateNestedSetting('social', 'youtube', e.target.value)}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
              <Button onClick={() => handleSave('social')} disabled={isSaving === 'social'}>
                {isSaving === 'social' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save Social Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
