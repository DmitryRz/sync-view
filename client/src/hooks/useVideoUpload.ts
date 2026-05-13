import { useState, type DragEvent } from "react";
import axios from "axios";
import keycloak from "@/lib/keycloak";

export const useVideoUpload = (onSuccess?: () => void) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
          "Content-Type": "multipart/form-data",
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

  const dragHandlers = {
    onDragOver: (e: DragEvent) => { e.preventDefault(); setIsDragging(true); },
    onDragLeave: (e: DragEvent) => { e.preventDefault(); setIsDragging(false); },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer?.files?.[0];
      if (droppedFile?.type.startsWith("video/")) {
        setFile(droppedFile);
        if (!title) setTitle(droppedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  return {
    state: { isUploadOpen, title, file, uploading, isDragging },
    actions: { setIsUploadOpen, setTitle, setFile, handleUpload },
    dragHandlers
  };
};