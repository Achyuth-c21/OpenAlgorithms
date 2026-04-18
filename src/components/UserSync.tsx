import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export function UserSync() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, getToken, isLoaded: authLoaded } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (authLoaded && userLoaded && isSignedIn && user) {
        try {
          const token = await getToken();
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await fetch(`${apiUrl}/api/users/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName || user.username,
              imageUrl: user.imageUrl,
            }),
          });
          
          if (!response.ok) {
            console.error("Failed to sync user with MongoDB");
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    syncUser();
  }, [authLoaded, userLoaded, isSignedIn, user, getToken]);

  return null;
}
