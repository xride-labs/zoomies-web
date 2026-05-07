'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Bell,
  Shield,
  Globe,
  Mail,
  Palette,
  Save,
  RotateCcw,
} from 'lucide-react'
import { adminApi, type AdminSettings } from '@/lib/server/admin'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [initialSettings, setInitialSettings] = useState<AdminSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    adminApi
      .getSettings()
      .then((data) => {
        if (!isMounted) return
        setSettings(data)
        setInitialSettings(data)
        setError(null)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Failed to load settings')
      })
      .finally(() => {
        if (!isMounted) return
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const isDirty = useMemo(() => {
    if (!settings || !initialSettings) return false
    return JSON.stringify(settings) !== JSON.stringify(initialSettings)
  }, [settings, initialSettings])

  const updateSetting = <K extends keyof AdminSettings>(
    key: K,
    value: AdminSettings[K],
  ) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleSave = async () => {
    if (!settings) return
    setIsSaving(true)
    try {
      const updated = await adminApi.updateSettings(settings)
      setSettings(updated)
      setInitialSettings(updated)
      toast.success('Settings saved')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (!initialSettings) return
    setSettings(initialSettings)
  }

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading settings...</div>
  }

  if (!settings) {
    return (
      <div className="text-sm text-destructive">
        {error ?? 'Failed to load settings'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-150">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(event) => updateSetting('siteName', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(event) => updateSetting('siteUrl', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    value={settings.supportEmail}
                    onChange={(event) => updateSetting('supportEmail', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => updateSetting('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Phoenix">
                        America/Phoenix (MST)
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        America/Los Angeles (PST)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        America/New York (EST)
                      </SelectItem>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Features</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Disable access for non-admin users
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to sign up
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowRegistration}
                      onCheckedChange={(checked) => updateSetting('allowRegistration', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketplace</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable marketplace features
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketplaceEnabled}
                      onCheckedChange={(checked) => updateSetting('marketplaceEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Club Creation</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to create clubs
                      </p>
                    </div>
                    <Switch
                      checked={settings.clubCreationEnabled}
                      onCheckedChange={(checked) => updateSetting('clubCreationEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireAdmin2FA}
                    onCheckedChange={(checked) => updateSetting('requireAdmin2FA', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto logout after inactivity
                    </p>
                  </div>
                  <Select
                    value={String(settings.sessionTimeoutMinutes)}
                    onValueChange={(value) =>
                      updateSetting('sessionTimeoutMinutes', Number(value))
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password Requirements</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimum password strength
                    </p>
                  </div>
                  <Select
                    value={settings.passwordStrength}
                    onValueChange={(value) =>
                      updateSetting('passwordStrength', value as AdminSettings['passwordStrength'])
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                      <SelectItem value="medium">Medium (+ numbers)</SelectItem>
                      <SelectItem value="strong">Strong (+ symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Attempts</Label>
                    <p className="text-sm text-muted-foreground">
                      Max failed attempts before lockout
                    </p>
                  </div>
                  <Select
                    value={String(settings.loginAttempts)}
                    onValueChange={(value) =>
                      updateSetting('loginAttempts', Number(value))
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">OAuth Providers</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Google Sign-In</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow sign in with Google
                      </p>
                    </div>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Phone OTP</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow sign in with phone OTP
                      </p>
                    </div>
                    <Switch checked disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure admin notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new users sign up
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyNewUser}
                    onCheckedChange={(checked) => updateSetting('notifyNewUser', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify on new user reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyNewReports}
                    onCheckedChange={(checked) => updateSetting('notifyNewReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Club Verification Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify on verification requests
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyClubVerification}
                    onCheckedChange={(checked) =>
                      updateSetting('notifyClubVerification', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Critical system notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifySystemAlerts}
                    onCheckedChange={(checked) =>
                      updateSetting('notifySystemAlerts', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Daily activity digest email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyDailySummary}
                    onCheckedChange={(checked) => updateSetting('notifyDailySummary', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Settings
              </CardTitle>
              <CardDescription>Configure email delivery settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(event) => updateSetting('smtpHost', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={String(settings.smtpPort)}
                    onChange={(event) =>
                      updateSetting('smtpPort', Number(event.target.value || 0))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={settings.smtpUser}
                    onChange={(event) => updateSetting('smtpUser', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">SMTP Password</Label>
                  <Input
                    id="smtpPass"
                    type="password"
                    value={settings.smtpPass}
                    onChange={(event) => updateSetting('smtpPass', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    value={settings.fromEmail}
                    onChange={(event) => updateSetting('fromEmail', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.fromName}
                    onChange={(event) => updateSetting('fromName', event.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Email Templates</h4>
                <div className="space-y-2">
                  <Label htmlFor="welcomeEmail">Welcome Email Subject</Label>
                  <Input
                    id="welcomeEmail"
                    value={settings.welcomeEmailSubject}
                    onChange={(event) =>
                      updateSetting('welcomeEmailSubject', event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeBody">Welcome Email Body</Label>
                  <Textarea
                    id="welcomeBody"
                    rows={4}
                    value={settings.welcomeEmailBody}
                    onChange={(event) => updateSetting('welcomeEmailBody', event.target.value)}
                  />
                </div>
              </div>

              <Button variant="outline">Send Test Email</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    {['#f97316', '#ef4444', '#22c55e', '#3b82f6', '#8b5cf6'].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-lg border-2 transition-colors ${
                            settings.primaryColor === color
                              ? 'border-foreground'
                              : 'border-transparent hover:border-foreground/20'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateSetting('primaryColor', color)}
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode by default
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkModeDefault}
                    onCheckedChange={(checked) => updateSetting('darkModeDefault', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use smaller spacing and fonts
                    </p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" onClick={handleReset} disabled={!isDirty}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} disabled={isSaving || !isDirty}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
