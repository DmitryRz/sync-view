import { useState } from "react";
import axios from "axios";
import keycloak from "@/lib/keycloak";
import { useDragAndDrop } from "@/hooks/useDragAndDrop.ts"

export const useVideoUpload = (onSuccess?: () => void) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert("Заполни все поля");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setUploading(true);
      await axios.post("/api/videos/upload", formData, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      setIsUploadOpen(false);
      setTitle("");
      setFile(null);
      onSuccess?.();
    } catch (err) {
      console.error("Ошибка загрузки:", err);
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
    state: { isUploadOpen, title, file, uploading, isDragging },
    actions: { setIsUploadOpen, setTitle, setFile, handleUpload },
    dragHandlers
  };
};