import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Bell, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { useThemeStore } from '@/stores/themeStore';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <FadeIn>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </FadeIn>

        {/* Appearance */}
        <FadeIn delay={0.1}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how Ekaiva looks on your device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        'flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200',
                        theme === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        theme === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground'
                      )}>
                        <option.icon className="w-6 h-6" />
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Notifications */}
        <FadeIn delay={0.2}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your meetings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get push notifications in your browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Meeting Reminders</Label>
                  <p className="text-sm text-muted-foreground">Remind me before meetings start</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Weekly Summary</Label>
                  <p className="text-sm text-muted-foreground">Get a weekly digest of your meetings</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Language & Region */}
        <FadeIn delay={0.3}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
              <CardDescription>Set your language and timezone preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Button variant="outline" className="w-full justify-start">
                    English (US)
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Button variant="outline" className="w-full justify-start">
                    (UTC-05:00) Eastern Time
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">MM/DD/YYYY</Button>
                  <Button variant="outline" size="sm">DD/MM/YYYY</Button>
                  <Button variant="outline" size="sm">YYYY-MM-DD</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
