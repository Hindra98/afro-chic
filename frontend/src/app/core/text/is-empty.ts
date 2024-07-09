export const isEmpty = (value: string): boolean => {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  