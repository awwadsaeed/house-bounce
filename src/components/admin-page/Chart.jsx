import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const HouseChart = (props) => {
  const data = {
    labels: [`Regected`, `Pending`, `accepted`],
    datasets: [
      {
        label: "# of Votes",
        data: [props.regected, props.pending, props.accepted],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(64, 235, 64, 0.4)",
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(64, 255, 64, 1)",

          
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>
      <Pie data={data} />
    </>
  );
};

export default HouseChart;
