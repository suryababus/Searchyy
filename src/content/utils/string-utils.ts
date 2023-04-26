export const insertStringAt = (string: string, index: number, key: string) => {
  if (index > 0) {
    return (
      string.substring(0, index) + key + string.substring(index, string.length)
    );
  }

  return key + string;
};
