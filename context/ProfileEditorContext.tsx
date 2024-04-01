import { useAuth } from "@clerk/nextjs";
import { Profile } from "@prisma/client";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const DEFAULT_PROFILE: Profile = {
  id: "",
  userId: "",
  title: "",
  description: "",
  profileImageUrl: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface ProfileEditorContextState {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile>>;
  save: () => Promise<void>;
}

const ProfileEditorContext = createContext<ProfileEditorContextState | null>(
  null
);

export const ProfileEditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userId } = useAuth();
  const [editedProfile, setEditedProfile] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile?userId=${userId}`);
        const fetchedProfile = response.data.data;
        setEditedProfile(fetchedProfile);
      } catch (err) {
        console.log("fetchProfile err:\n", err);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [userId]);

  const save = async () => {
    try {
      const response = await axios.request({
        method: editedProfile.id ? "PUT" : "POST",
        url: "/api/profile",
        data: editedProfile,
      });

      const updatedProfile = response.data.data;
      if (updatedProfile) {
        setEditedProfile(updatedProfile);
      } else {
        throw new Error("Failed saving");
      }
    } catch (err) {
      toast.error("Failed to save Profile");
    }
  };

  return (
    <ProfileEditorContext.Provider
      value={{
        editedProfile,
        setEditedProfile,
        save,
      }}
    >
      {children}
    </ProfileEditorContext.Provider>
  );
};

export function useProfileEditorContext() {
  const context = useContext(ProfileEditorContext);
  if (!context) {
    throw new Error(
      "useProfileEditorContext must be used within a ProfileEditorProvider"
    );
  }

  return context;
}
