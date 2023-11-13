import React, { Component } from "react";
import Chart from "react-apexcharts";

class Radarchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        title: {
          text: 'Product Trends by Month',
          align: 'center'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        markers: {
            size: 5,
            hover: {
              size: 10
            }
          }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div className="">
          <div className="mixed-chart">
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="radar"
                width="400"
                />
          </div>
      </div>
    );
  }
}

export default Radarchart;