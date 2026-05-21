import { useState, type DragEvent } from "react";

export const useDragAndDrop = (onFileDrop: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const dragHandlers = {
    onDragOver: (e: DragEvent) => { e.preventDefault(); setIsDragging(true); },
    onDragLeave: (e: DragEvent) => { e.preventDefault(); setIsDragging(false); },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) onFileDrop(file);
    }
  };

  return { isDragging, dragHandlers };
};