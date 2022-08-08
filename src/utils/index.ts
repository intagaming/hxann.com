// TODO: move this
export const parseDate = (input: string): Date => {
  const parts = input.split("-");
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10)
  ); // Note: months are 0-based
};
