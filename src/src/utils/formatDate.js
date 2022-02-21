import { format } from 'date-fns';

// ----------------------------------------------------------------------

export function fDateFromLong(number) {
  const t = new Date(Number(number));

  return format(t, 'dd/MM/yyyy hh:mm');
}

export function fFullDateTime(dateTime) {
  const t = new Date(dateTime);

  return format(t, 'dd/MM/yyyy hh:mm');
}
