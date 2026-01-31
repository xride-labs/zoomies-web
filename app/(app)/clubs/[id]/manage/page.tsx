"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ChevronLeft,
    Settings,
    Users,
    Shield,
    Bell,
    Trash2,
    UserMinus,
    Crown,
    MoreHorizontal,
    Check,
    X,
    AlertTriangle,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data
const mockClub = {
    id: "c1",
    name: "Desert Eagles MC",
    description: "Brotherhood of riders exploring the Arizona desert roads.",
    location: "Phoenix, AZ",
    isPublic: true,
    requireApproval: true,
    allowMemberInvites: true,
    showMemberList: true,
};

const mockMembers = [
    { id: "u1", name: "Mike Rodriguez", username: "roadking_mike", role: "FOUNDER", joinedAt: "2023-06-15", status: "active" },
    { id: "u2", name: "Sarah Chen", username: "sarah_twowheels", role: "ADMIN", joinedAt: "2023-07-20", status: "active" },
    { id: "u3", name: "Raj Patel", username: "raj_thunder", role: "OFFICER", joinedAt: "2023-08-10", status: "active" },
    { id: "u4", name: "Sneha Reddy", username: "sneha_rides", role: "MEMBER", joinedAt: "2023-09-05", status: "active" },
    { id: "u5", name: "Tom Johnson", username: "tomjmoto", role: "MEMBER", joinedAt: "2024-01-15", status: "active" },
];

const mockPendingRequests = [
    { id: "r1", user: { id: "u6", name: "Alex Thompson", username: "alex_rider" }, message: "Been riding for 5 years, looking for a solid crew!", requestedAt: "2026-01-28" },
    { id: "r2", user: { id: "u7", name: "Maria Garcia", username: "maria_moto" }, message: "Love desert rides! Would be honored to join.", requestedAt: "2026-01-27" },
];

const roleOptions = ["MEMBER", "OFFICER", "ADMIN"];

const roleColors = {
    FOUNDER: "bg-amber-100 text-amber-700",
    ADMIN: "bg-red-100 text-red-700",
    OFFICER: "bg-blue-100 text-blue-700",
    MEMBER: "bg-gray-100 text-gray-700",
};

export default function ClubManagePage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("members");
    const [clubSettings, setClubSettings] = useState(mockClub);
    const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteClubDialogOpen, setIsDeleteClubDialogOpen] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleApproveRequest = (requestId: string) => {
        // API call would go here
        console.log("Approving request:", requestId);
    };

    const handleRejectRequest = (requestId: string) => {
        // API call would go here
        console.log("Rejecting request:", requestId);
    };

    const handleRoleChange = (memberId: string, newRole: string) => {
        // API call would go here
        console.log("Changing role:", memberId, newRole);
    };

    const handleRemoveMember = () => {
        // API call would go here
        console.log("Removing member:", selectedMember?.id);
        setIsRemoveDialogOpen(false);
        setSelectedMember(null);
    };

    const handleDeleteClub = () => {
        if (deleteConfirmText === mockClub.name) {
            // API call would go here
            console.log("Deleting club");
            router.push("/app/clubs");
        }
    };

    return (
        <div className="min-h-screen p-4 lg:p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Manage Club</h1>
                    <p className="text-sm text-muted-foreground">{mockClub.name}</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="members" className="gap-2">
                        <Users className="w-4 h-4" />
                        Members
                    </TabsTrigger>
                    <TabsTrigger value="requests" className="gap-2">
                        <Bell className="w-4 h-4" />
                        Requests
                        {mockPendingRequests.length > 0 && (
                            <Badge variant="destructive" className="ml-1">
                                {mockPendingRequests.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                    </TabsTrigger>
                    <TabsTrigger value="danger" className="gap-2 text-red-600">
                        <Shield className="w-4 h-4" />
                        Danger Zone
                    </TabsTrigger>
                </TabsList>

                {/* Members Tab */}
                <TabsContent value="members">
                    <Card>
                        <CardHeader>
                            <CardTitle>Club Members ({mockMembers.length})</CardTitle>
                            <CardDescription>
                                Manage member roles and permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {member.name.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{member.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            @{member.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {member.role === "FOUNDER" ? (
                                                    <Badge className={roleColors.FOUNDER}>
                                                        <Crown className="w-3 h-3 mr-1" />
                                                        FOUNDER
                                                    </Badge>
                                                ) : (
                                                    <Select
                                                        defaultValue={member.role}
                                                        onValueChange={(val) => handleRoleChange(member.id, val)}
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roleOptions.map((role) => (
                                                                <SelectItem key={role} value={role}>
                                                                    {role}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </TableCell>
                                            <TableCell>{formatDate(member.joinedAt)}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    Active
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {member.role !== "FOUNDER" && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => {
                                                                    setSelectedMember(member);
                                                                    setIsRemoveDialogOpen(true);
                                                                }}
                                                            >
                                                                <UserMinus className="w-4 h-4 mr-2" />
                                                                Remove Member
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Requests Tab */}
                <TabsContent value="requests">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Join Requests</CardTitle>
                            <CardDescription>
                                Review and approve member requests
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {mockPendingRequests.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No pending requests
                                </div>
                            ) : (
                                <ScrollArea className="h-[400px]">
                                    <div className="space-y-4">
                                        {mockPendingRequests.map((request) => (
                                            <div
                                                key={request.id}
                                                className="flex items-start gap-4 p-4 border rounded-lg"
                                            >
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {request.user.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">{request.user.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                @{request.user.username}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatDate(request.requestedAt)}
                                                        </p>
                                                    </div>
                                                    {request.message && (
                                                        <p className="mt-2 text-sm bg-muted p-3 rounded-lg">
                                                            "{request.message}"
                                                        </p>
                                                    )}
                                                    <div className="flex gap-2 mt-3">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleApproveRequest(request.id)}
                                                        >
                                                            <Check className="w-4 h-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleRejectRequest(request.id)}
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Club Information</CardTitle>
                                <CardDescription>
                                    Update your club's basic information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Club Name</Label>
                                    <Input
                                        id="name"
                                        value={clubSettings.name}
                                        onChange={(e) =>
                                            setClubSettings({ ...clubSettings, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={clubSettings.description}
                                        onChange={(e) =>
                                            setClubSettings({ ...clubSettings, description: e.target.value })
                                        }
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={clubSettings.location}
                                        onChange={(e) =>
                                            setClubSettings({ ...clubSettings, location: e.target.value })
                                        }
                                    />
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy & Access</CardTitle>
                                <CardDescription>
                                    Control who can see and join your club
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Public Club</p>
                                        <p className="text-sm text-muted-foreground">
                                            Anyone can find and view this club
                                        </p>
                                    </div>
                                    <Switch
                                        checked={clubSettings.isPublic}
                                        onCheckedChange={(checked) =>
                                            setClubSettings({ ...clubSettings, isPublic: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Require Approval</p>
                                        <p className="text-sm text-muted-foreground">
                                            New members must be approved
                                        </p>
                                    </div>
                                    <Switch
                                        checked={clubSettings.requireApproval}
                                        onCheckedChange={(checked) =>
                                            setClubSettings({ ...clubSettings, requireApproval: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Allow Member Invites</p>
                                        <p className="text-sm text-muted-foreground">
                                            Members can invite others
                                        </p>
                                    </div>
                                    <Switch
                                        checked={clubSettings.allowMemberInvites}
                                        onCheckedChange={(checked) =>
                                            setClubSettings({ ...clubSettings, allowMemberInvites: checked })
                                        }
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Show Member List</p>
                                        <p className="text-sm text-muted-foreground">
                                            Non-members can see the member list
                                        </p>
                                    </div>
                                    <Switch
                                        checked={clubSettings.showMemberList}
                                        onCheckedChange={(checked) =>
                                            setClubSettings({ ...clubSettings, showMemberList: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Danger Zone Tab */}
                <TabsContent value="danger">
                    <Card className="border-red-200">
                        <CardHeader>
                            <CardTitle className="text-red-600">Danger Zone</CardTitle>
                            <CardDescription>
                                These actions are irreversible. Proceed with caution.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    Deleting a club will permanently remove all club data including
                                    member lists, ride history, and conversations. This action cannot
                                    be undone.
                                </AlertDescription>
                            </Alert>
                            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                                <div>
                                    <p className="font-medium text-red-600">Delete Club</p>
                                    <p className="text-sm text-muted-foreground">
                                        Permanently delete this club and all its data
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsDeleteClubDialogOpen(true)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Club
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Remove Member Dialog */}
            <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Member</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove {selectedMember?.name} from the club?
                            They will need to request to join again.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRemoveMember}>
                            Remove Member
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Club Dialog */}
            <Dialog open={isDeleteClubDialogOpen} onOpenChange={setIsDeleteClubDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Delete Club</DialogTitle>
                        <DialogDescription>
                            This action is permanent and cannot be undone. All club data will be lost.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="confirm">
                            Type <strong>{mockClub.name}</strong> to confirm deletion
                        </Label>
                        <Input
                            id="confirm"
                            className="mt-2"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="Enter club name"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteClubDialogOpen(false);
                                setDeleteConfirmText("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={deleteConfirmText !== mockClub.name}
                            onClick={handleDeleteClub}
                        >
                            Delete Forever
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
