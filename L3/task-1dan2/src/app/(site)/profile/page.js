"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/lib/context/ToastContext";
import * as authApi from "@/lib/api/auth.api";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorText } from "@/components/atoms/ErrorText";

export default function ProfilePage() {
  const { user, refresh, isLoading } = useAuth();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  if (isLoading) return <Spinner />;
  if (!user)
    return <div className="text-center">Please log in to view profile.</div>;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await authApi.updateProfile(profileData);
      await refresh();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    setPasswordError("");
    try {
      await authApi.updatePassword(passwordData);
      toast.success("Password updated successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      setPasswordError(error.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account details and password.
        </p>
      </div>

      <form
        onSubmit={handleProfileSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-5 text-sm font-semibold text-slate-900">
          Personal Information
        </h2>
        <div className="flex flex-col gap-4">
          <FormField
            label="Name"
            name="name"
            value={profileData.name}
            onChange={(e) =>
              setProfileData((p) => ({ ...p, name: e.target.value }))
            }
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData((p) => ({ ...p, email: e.target.value }))
            }
            required
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" isLoading={isUpdatingProfile}>
              Save Details
            </Button>
          </div>
        </div>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-5 text-sm font-semibold text-slate-900">
          Change Password
        </h2>
        <div className="flex flex-col gap-4">
          <FormField
            label="Current Password"
            name="oldPassword"
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData((p) => ({ ...p, oldPassword: e.target.value }))
            }
            required
          />
          <FormField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((p) => ({ ...p, newPassword: e.target.value }))
            }
            required
          />
          <ErrorText>{passwordError}</ErrorText>
          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              isLoading={isUpdatingPassword}
              variant="secondary"
            >
              Update Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
