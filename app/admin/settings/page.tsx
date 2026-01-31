"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Bell,
    Shield,
    Globe,
    Mail,
    Database,
    Palette,
    Save,
    RotateCcw,
} from "lucide-react";

export default function AdminSettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

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
                            <CardDescription>
                                Configure basic application settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Site Name</Label>
                                    <Input id="siteName" defaultValue="Zoomies" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="siteUrl">Site URL</Label>
                                    <Input id="siteUrl" defaultValue="https://zoomies.app" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input id="supportEmail" defaultValue="support@zoomies.app" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="America/Phoenix">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America/Phoenix">America/Phoenix (MST)</SelectItem>
                                            <SelectItem value="America/Los_Angeles">America/Los Angeles (PST)</SelectItem>
                                            <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
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
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>New User Registration</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow new users to sign up
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Marketplace</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Enable marketplace features
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Club Creation</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow users to create clubs
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
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
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Session Timeout</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Auto logout after inactivity
                                        </p>
                                    </div>
                                    <Select defaultValue="30">
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
                                    <Select defaultValue="strong">
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
                                    <Select defaultValue="5">
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
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Phone OTP</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow sign in with phone OTP
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
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
                            <CardDescription>
                                Configure admin notifications
                            </CardDescription>
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
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>New Reports</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Notify on new user reports
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Club Verification Requests</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Notify on verification requests
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>System Alerts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Critical system notifications
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Daily Summary</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Daily activity digest email
                                        </p>
                                    </div>
                                    <Switch />
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
                            <CardDescription>
                                Configure email delivery settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="smtpHost">SMTP Host</Label>
                                    <Input id="smtpHost" defaultValue="smtp.sendgrid.net" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPort">SMTP Port</Label>
                                    <Input id="smtpPort" defaultValue="587" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpUser">SMTP Username</Label>
                                    <Input id="smtpUser" defaultValue="apikey" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPass">SMTP Password</Label>
                                    <Input id="smtpPass" type="password" defaultValue="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fromEmail">From Email</Label>
                                    <Input id="fromEmail" defaultValue="noreply@zoomies.app" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fromName">From Name</Label>
                                    <Input id="fromName" defaultValue="Zoomies" />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Email Templates</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="welcomeEmail">Welcome Email Subject</Label>
                                    <Input
                                        id="welcomeEmail"
                                        defaultValue="Welcome to Zoomies! 🏍️"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="welcomeBody">Welcome Email Body</Label>
                                    <Textarea
                                        id="welcomeBody"
                                        rows={4}
                                        defaultValue="Hi {{name}},\n\nWelcome to Zoomies! We're excited to have you join our community of riders."
                                    />
                                </div>
                            </div>

                            <Button variant="outline">
                                Send Test Email
                            </Button>
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
                            <CardDescription>
                                Customize the look and feel
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <div className="flex gap-2">
                                        {["#f97316", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"].map(
                                            (color) => (
                                                <button
                                                    key={color}
                                                    className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-foreground/20 transition-colors"
                                                    style={{ backgroundColor: color }}
                                                />
                                            )
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
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Compact Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Use smaller spacing and fonts
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Save Actions */}
            <div className="flex items-center justify-end gap-4">
                <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
