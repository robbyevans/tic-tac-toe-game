// src/components/AvatarSelector.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface AvatarSelectorProps {
  selectedAvatar: File | null;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<File | null>>;
}

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
`;

const AvatarImage = styled.img<{ selected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${(props) =>
    props.selected ? "3px solid #3498db" : "2px solid #ccc"};
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 3px solid #3498db;
  }
`;

const UploadInput = styled.input`
  margin-top: 10px;
`;

const predefinedAvatars = [
  "https://example.com/avatars/avatar1.png",
  "https://example.com/avatars/avatar2.png",
  "https://example.com/avatars/avatar3.png",
  // Add more URLs as needed
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  setSelectedAvatar,
}) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync selectedAvatar with selectedUrl
  useEffect(() => {
    if (!selectedAvatar) {
      setSelectedUrl(null);
    }
  }, [selectedAvatar]);

  const handleAvatarClick = (url: string) => {
    setSelectedUrl(url);
    setSelectedAvatar(null); // Clear any uploaded avatar
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Unsupported file type. Please upload a JPEG, PNG, GIF, WEBP, or SVG image."
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setError("File size exceeds 5MB.");
        return;
      }
      setSelectedAvatar(file);
      setSelectedUrl(null); // Clear any selected predefined avatar
      setError(null);
    }
  };

  return (
    <AvatarContainer>
      <label>Select an Avatar:</label>
      <AvatarOptions>
        {predefinedAvatars.map((url, index) => (
          <AvatarImage
            key={index}
            src={url}
            alt={`Avatar ${index + 1}`}
            selected={selectedUrl === url}
            onClick={() => handleAvatarClick(url)}
          />
        ))}
      </AvatarOptions>
      <label htmlFor="avatar-upload">Or Upload Your Own:</label>
      <UploadInput
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display Preview if a File is Selected */}
      {selectedAvatar && (
        <div style={{ marginTop: "10px" }}>
          <p>Selected File: {selectedAvatar.name}</p>
          <img
            src={URL.createObjectURL(selectedAvatar)}
            alt="Selected Avatar"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </div>
      )}
      {/* Display Preview if a Predefined Avatar is Selected */}
      {selectedUrl && (
        <div style={{ marginTop: "10px" }}>
          <p>Selected Predefined Avatar:</p>
          <img
            src={selectedUrl}
            alt="Selected Predefined Avatar"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </div>
      )}
    </AvatarContainer>
  );
};

export default AvatarSelector;
