import React,{useContext} from 'react';
import { userContext } from '../../context/UserContext';
import HouseCard from './HouseCard';
export default function MyHouses() {
    const context = useContext(userContext);
    return (
        <>
            {context.user.houses.map((house)=>{
                return(<HouseCard
                    house={house}
                />)
            })}  
        </>
    )
}

