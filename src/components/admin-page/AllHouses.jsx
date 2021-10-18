import React,{useContext} from 'react';
import HouseCard from './HouseCard';
import { userContext } from '../../context/UserContext';
import HouseChart from './Chart';
export default function AllHouses() {

    const context = useContext(userContext);

    return (
        <>
           {context.user.houses.map((house)=>{
               return(
               <HouseCard 
                house={house}
               />)
           })}
           <HouseChart
            accepted={context.chartStats.accepted}
            regected={context.chartStats.regected}
            pending={context.chartStats.pending}
           />
        </>
    )
}
