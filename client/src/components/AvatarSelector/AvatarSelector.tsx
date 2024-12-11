// src/components/AvatarSelector/AvatarSelector.tsx
import React, { useState, useEffect } from "react";
import * as S from "./styles";

// Import local avatar images
import ArcherElf from "@src/assets/avatars/archer-elf.jpg";
import GingerElf from "@src/assets/avatars/ginger-elf.jpg";
import LadyElf from "@src/assets/avatars/lady-elf.jpg";

interface AvatarSelectorProps {
  selectedAvatar: File | null;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<File | null>>;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  setSelectedAvatar,
}) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Predefined avatars
  const predefinedAvatars = [
    { id: 1, name: "Archer Elf", src: ArcherElf },
    { id: 2, name: "Ginger Elf", src: GingerElf },
    { id: 3, name: "Lady Elf", src: LadyElf },
  ];

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
    <S.AvatarContainer>
      <label>Select an Avatar:</label>
      <S.AvatarOptions>
        {predefinedAvatars.map((avatar) => (
          <S.AvatarImage
            key={avatar.id}
            src={avatar.src}
            alt={avatar.name}
            selected={selectedUrl === avatar.src}
            onClick={() => handleAvatarClick(avatar.src)}
          />
        ))}
      </S.AvatarOptions>
      <label htmlFor="avatar-upload">Or Upload Your Own:</label>
      <S.UploadInput
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
    </S.AvatarContainer>
  );
};

export default AvatarSelector;
