import React,{useContext} from 'react';
import HouseCard from './HouseCard';
import { userContext } from '../../context/UserContext';
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
        </>
    )
}
