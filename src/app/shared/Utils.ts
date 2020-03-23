export class Utils {

  public static formatRule(values: string[]): number[] {
    let nums: number[] = [];

    values.forEach(function(num) {
      if (!isNaN(Number(num))) {
        nums.push(Number(num));
      }
    });

    return nums;
  }
}
