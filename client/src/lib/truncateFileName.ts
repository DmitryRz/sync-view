export const truncateFileName = (name: string, maxLength: number = 20) => {
  if (name.length <= maxLength) return name;

  const ext = name.split('.').pop();
  const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));

  return `${nameWithoutExt.substring(0, maxLength)}...${ext ? '.' + ext : ''}`;
};