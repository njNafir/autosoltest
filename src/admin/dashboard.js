import { Doughnut } from 'react-chartjs-2';
// import { getLastMonths } from '../snippets/utils.js';

export default function DashBoard(props) {

  // const months = getLastMonths()

  // console.log(months)

  let value_nums = [0.001]

  props.values.map((object) => {
    value_nums.push(object[2])
  })

  // console.log(value_nums)

  const data = {
      // labels: months,
      datasets: [
          {
          label: 'Monthly post',
          // fill: false,
          // lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          // borderColor: 'rgba(75,192,192,0.4)', // 'rgba(75,192,192,1)',
          // borderCapStyle: 'butt',
          // borderDash: [],
          // borderDashOffset: 0.0,
          // borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointRadius: 1,
          // pointHitRadius: 10,
          data: value_nums
          }
      ]
      };

  return (
    <Doughnut data={data} />
  );
}
