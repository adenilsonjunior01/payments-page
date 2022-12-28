export class Utils {
  
  constructor() {}

  public static getTime(): string {
    const d = new Date();
    let h = this.addZero(d.getHours());
    let m = this.addZero(d.getMinutes());
    let s = this.addZero(d.getSeconds());
    let time = h + ":" + m + ":" + s;

    return time
  }

  private static addZero(value: any) {
    if (value < 10) {value = "0" + value}
    return value;
  }
}