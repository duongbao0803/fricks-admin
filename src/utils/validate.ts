import { Dayjs } from "dayjs";

export const validatePhoneNumber = (_: unknown, value: string) => {
  const phoneNumberPattern = /^[0-9]{10}$/;
  if (value && !phoneNumberPattern.test(value)) {
    return Promise.reject(new Error("Số điện thoại phải có 10 số"));
  }
  return Promise.resolve();
};

export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}

export function formatDate2(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

export function formatTimestamp(timestampStr: string | null | undefined): string {
  if (timestampStr === null || timestampStr === undefined) {
    return "-";
  }
  const timestamp = new Date(timestampStr);
  return timestamp.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
}

export function formatTimestampWithHour(timestampStr: string | null | undefined): string {
  if (timestampStr === null || timestampStr === undefined) {
    return "-";
  }
  const timestamp = new Date(timestampStr);
  return timestamp.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  });
}

export function formatDate3(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const hours = localDate.getHours().toString().padStart(2, "0");
    const minutes = localDate.getMinutes().toString().padStart(2, "0");
    const seconds = localDate.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
}

export function formatDate4(dateStr: string | number | Date): string {
  const date = new Date(dateStr);

  const pad = (n: number) => (n < 10 ? "0" + n : n);

  const formattedDate = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  return formattedDate;
}

export function convertDateFormat(
  dateString: Dayjs | string | number | Date | null | undefined,
): string | null {
  if (!dateString) return null;

  let inputDate;
  if (typeof dateString === "number") {
    inputDate = dateString.toString();
  } else if (dateString instanceof Date) {
    const day = dateString.getDate().toString().padStart(2, "0");
    const month = (dateString.getMonth() + 1).toString().padStart(2, "0");
    const year = dateString.getFullYear().toString();
    inputDate = `${day}/${month}/${year}`;
  } else if (typeof dateString === "string") {
    inputDate = dateString.trim();
  } else if (
    typeof dateString === "object" &&
    dateString.format &&
    typeof dateString.format === "function"
  ) {
    inputDate = dateString.format("DD/MM/YYYY");
  } else {
    return null;
  }
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (regex.test(inputDate)) {
    return inputDate.replace(regex, "$3/$2/$1");
  } else {
    return null;
  }
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  type IntervalType = {
    [key: string]: number;
  };

  const intervals: IntervalType = {
    ["năm"]: 31536000,
    ["tháng"]: 2592000,
    ["ngày"]: 86400,
    ["giờ"]: 3600,
    ["phút"]: 60,
  };

  for (const interval in intervals) {
    const value = Math.floor(seconds / intervals[interval]);
    if (value > 1) {
      return `${value} ${interval} trước`;
    } else if (value === 1) {
      return `${value} ${interval} trước`;
    }
  }

  return 'mới';
}
