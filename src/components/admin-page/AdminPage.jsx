import React, { useContext } from "react";
import AllHouses from "./AllHouses";
import { userContext } from "../../context/UserContext";
import HouseChart from "./Chart";
import "./admin.css";
export default function AdminPage() {
  const context = useContext(userContext);

  return (
    <>
      <div className="allhouses">
        <AllHouses />
      </div>
      <div className="charty">
        <HouseChart
          accepted={context.chartStats.accepted}
          regected={context.chartStats.regected}
          pending={context.chartStats.pending}
        />
      </div>
    </>
  );
}
