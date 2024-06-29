import config from "./config.json";
import { DAYS, MONTHS } from "./constants";

export const convertDateToDDMMYYYYFormat = (date) => {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return `${dd < 10 ? "0" : ""}${dd}/${mm < 10 ? "0" : ""}${mm}/${yyyy}`;
};

export const convertTimeToHHMMFormat = (time) => {
  let me = "AM";
  let hh = time.getHours();
  if (hh >= 12) {
    me = "PM";
    hh -= 12;
  }
  if (hh == 0) hh = 12;
  const mm = time.getMinutes();
  return `${hh < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} ${me}`;
};

export const getFileUrl = (file) => {
  return `${config.FILE_SERVER}/uploads/${file}`;
};

export const getEventCardDateFormat = (time) => {
  if (!time) return;
  const obj = new Date(time);
  const mon = MONTHS[obj.getMonth()].code;
  const date = obj.getDate();
  const day = DAYS[obj.getDay()].code;
  return `${day}, ${date} ${mon}`;
};

export const getAddress = (address) => {
  if (!address) return "";
  const array = address.split(", ");
  return `${array[array.length - 4]}, ${array[array.length - 3]}`;
};

export const getSuffix = (n) => {
  if (n == 1 || n == 21 || n == 31) return "st";
  if (n == 2 || n == 22) return "nd";
  if (n == 3 || n == 23) return "rd";
  return "th";
};

export const getEventFormattedDate = (time) => {
  if (!time) return "";
  const ob = new Date(time);
  const date = ob.getDate();
  const month = MONTHS[ob.getMonth()].code;
  const suffix = getSuffix(date);
  return `${date}${suffix} ${month}`;
};
