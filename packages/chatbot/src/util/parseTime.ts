// https://github.com/vercel/ms

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

export function parseTime(str: string): number {
  const match =
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str,
    );

  const groups = match?.groups as { value: string; type?: string } | undefined;
  if (!groups) {
    return NaN;
  }
  const n = parseFloat(groups.value);
  const type = (groups.type || 'ms').toLowerCase();
  switch (type) {
  case 'years':
  case 'year':
  case 'yrs':
  case 'yr':
  case 'y':
    return n * y;
  case 'weeks':
  case 'week':
  case 'w':
    return n * w;
  case 'days':
  case 'day':
  case 'd':
    return n * d;
  case 'hours':
  case 'hour':
  case 'hrs':
  case 'hr':
  case 'h':
    return n * h;
  case 'minutes':
  case 'minute':
  case 'mins':
  case 'min':
  case 'm':
    return n * m;
  case 'seconds':
  case 'second':
  case 'secs':
  case 'sec':
  case 's':
    return n * s;
  case 'milliseconds':
  case 'millisecond':
  case 'msecs':
  case 'msec':
  case 'ms':
    return n;
  default:
    return n;
  }
}
