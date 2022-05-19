export class DateUtil {
  static isInRange(date: Date, rangeInHours) {
    const now = new Date();

    const msBetweenDates = Math.abs(now.getTime() - date.getTime());

    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    return hoursBetweenDates < rangeInHours;
  }
}
