export class DateUtil {
  static isInRange(date: Date, rangeInHours) {
    const now = new Date();

    const msBetweenDates = Math.abs(now.getTime() - date.getTime());

    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    return hoursBetweenDates < rangeInHours;
  }

  static addDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
}
