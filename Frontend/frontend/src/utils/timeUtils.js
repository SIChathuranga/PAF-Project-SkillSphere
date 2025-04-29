export const isExpired = (timestamp) => {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    return now - new Date(timestamp).getTime() > twentyFourHours;
  };
  