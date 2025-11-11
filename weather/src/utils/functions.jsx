export const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const isToday = (date, tzoffset = 0) => {
  const today = dateWithOffset(tzoffset);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date, tzoffset = 0) => {
  const today = dateWithOffset(tzoffset);
  const tomorrow = dateWithOffset(tzoffset);
  tomorrow.setDate(today.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const getWeekday = (date) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getDay()];
};

export const getDay = (datetime, tzoffset) => {
  var date = new Date(datetime);
  // Reverse conversion from utc to locale time
  const offset = date.getTimezoneOffset() * 60000;
  date = new Date(date.getTime() + offset);

  if (isToday(date, tzoffset)) {
    return "Today";
  } else if (isTomorrow(date, tzoffset)) {
    return "Tomorrow";
  } else {
    return getWeekday(date);
  }
};

function dateWithOffset(tzoffset) {
  // Current UTC time
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  // Apply offset
  return new Date(utc + tzoffset * 3600000);
}
