export function getDateAsString(dateString: string | undefined) {
  if (dateString === undefined) {
    return undefined;
  }
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  if (isToday) {
    return date.toLocaleTimeString();
  } else {
    return date.toLocaleDateString("en-GB"); // Format as day/month/year
  }
}
