import { useState } from "react";
import axios from "axios";
import keycloak from "@/lib/keycloak";
import { useDragAndDrop } from "@/hooks/useDragAndDrop.ts"

export const useAvatarUpload = (onSuccess?: () => void) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Выберите файл");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      await axios.post("/api/users/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      setFile(null);
      onSuccess?.();
      return true
    } catch (err) {
      console.error("Ошибка загрузки аватара:", err);
      alert("Не удалось загрузить аватар");
      return false;
    } finally {
      setUploading(false);
    }
  };

  const { isDragging, dragHandlers } = useDragAndDrop((droppedFile) => {
    if (droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    }
  });

  return {
    state: { file, uploading, isDragging},
    actions: { setFile, handleUpload },
    dragHandlers
  };
};