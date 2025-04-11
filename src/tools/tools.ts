import { General, Salary, SubjectAbbr } from "src/models/salary.model";
import * as _ from 'lodash'

export function groupSalaryByMonth(salaryData: Salary[]) {
  // Group by year and month
  const groupedByMonth = _.groupBy(salaryData, (salary: Salary) => {
    const date = new Date(salary.date);
    const month = date.toLocaleString('default', { month: 'long' })
    return `${date.getFullYear()} ${month}`; // Format YYYY-MM
  });
  console.log("Grouped by month",groupedByMonth);


  // Now, you can perform calculations like total price and total hours
  const result = _.map(groupedByMonth, (salaries, month) => {
    const totalPrice = _.sumBy(salaries, 'price');
    const totalHours = _.sumBy(salaries, (salary) => parseFloat(salary.total_hours));

    return {
      month,
      totalPrice,
      totalHours
    };
  });

  return {result,groupedByMonth};
}


export function getSubjectAbbr(value: string): string {
  const obj:any= (Object.keys(SubjectAbbr) as string[]).filter((key)=>key == value);
  const SubjectAbbre:General = {...SubjectAbbr}
  return SubjectAbbre[obj[0]];
}


export function removeSubjectFromSchedule<T extends object>(schedule: T, subject: string): T {
  return _.mapValues(schedule, (value) => {
      if (_.isArray(value)) {
          return _.without(value, subject);
      }
      return value;
  }) as T;
}

export function isDateToday(dateToCheck: Date): boolean {
  const today = new Date();

  // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  return dateToCheck.getTime() === today.getTime();
}