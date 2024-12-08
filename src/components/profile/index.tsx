import { Box, Typography, Avatar } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/container/searchResult";
import { useEffect, useState } from "react";

interface ProfileData {
  firstName: string;
  lastName: string;
  nickname: string;
  dateOfBirth: string;
  education: {
    degree: string;
    institutionName: string;
    startYear: number;
    endYear: number;
  }[];
  profileImage: string;
}

const Profile = ({
  themeMode,
  searchTerm,
}: {
  themeMode: "light" | "dark";
  searchTerm: string;
}) => {
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Trigger the search query when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      void executeSearch({ variables: { searchTerm } });
    }
  }, [searchTerm, executeSearch]);

  // Update profile data based on search results
  useEffect(() => {
    if (data?.searchPeople?.length > 0) {
      setProfileData(data.searchPeople[0]); // Display the first result as the main profile
    }
  }, [data]);

  if (loading) return <Typography>Loading profile...</Typography>;
  if (error) return <Typography>Error loading profile: {error.message}</Typography>;

  return (
    <Box
      sx={{
        width: "25%",
        minWidth: "300px",
        maxHeight: "100vh",
        bgcolor: themeMode === "light" ? "white" : "#1e1e1e",
        padding: "40px 30px",
        color: themeMode === "light" ? "#ff9800" : "#ff9800",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderLeft: `3px solid ${themeMode === "light" ? "#ff9800" : "#333"}`,
        boxShadow: themeMode === "dark"
          ? "-2px 0px 15px rgba(255, 152, 0, 0.15)"
          : "-2px 0px 15px rgba(255, 90, 0, 0.15)",
        overflowY: "auto",
      }}
    >
      {profileData ? (
        <>
          <Avatar
            alt={profileData.nickname}
            src={`http://localhost:8000/media/${profileData.profileImage}`}
            sx={{
              width: 180,
              height: 180,
              marginBottom: 4,
              border: themeMode === "dark"
                ? "3px solid rgba(255, 152, 0, 0.2)"
                : "3px solid rgba(255, 152, 0, 0.8)",
              boxShadow: themeMode === "dark"
                ? "0px 0px 20px rgba(255, 152, 0, 0.3)"
                : "0px 0px 20px rgba(255, 152, 0, 0.6)",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: themeMode === "light" ? "rgba(255, 90, 0.2)" : "#ff9800",
              marginBottom: 2,
              fontWeight: 600,
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            {profileData.firstName} {profileData.lastName}
          </Typography>
          <Box
            sx={{
              backgroundColor: themeMode === "dark"
                ? "rgba(255, 152, 0, 0.05)"
                : "rgba(255, 152, 0, 0.2)",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: 3,
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: themeMode === "light" ? "#555" : "#e0e0e0",
                textAlign: "center",
                lineHeight: 2,
                fontSize: "0.95rem",
              }}
            >
              Born: {profileData.dateOfBirth}
              <br />
              Nickname: {profileData.nickname}
              <br />
              Education:
              {profileData.education.map((edu, index) => (
                <span key={index}>
                  {edu.degree} from {edu.institutionName} ({edu.startYear} - {edu.endYear})
                  {index < profileData.education.length - 1 && ", "}
                </span>
              ))}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography>No profile data available.</Typography>
      )}
    </Box>
  );
};

export default Profile;
