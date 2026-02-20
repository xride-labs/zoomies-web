"use client";

import { redirect } from "next/navigation";

export default function ProfilePage() {
    // Redirect to current user's profile
    redirect("/app/profile/me");
}
