import { Salary } from "src/models/salary.model";
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
