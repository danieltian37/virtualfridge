import openedFridge from '.././assets/openedfridge.svg'
import covering from '.././assets/covering.svg'
import React, { useContext, useState } from 'react';
import AddButton from "../components/button.jsx";
import AddMilk from "../components/Graphics"
import ItemContext from "../context/ItemContext"


import '.././graphics.css'

import milk from '.././assets/milk.svg'

const OpenFridge = () => {
    const {showMilk, setShowMilk} = useContext(ItemContext);
    console.log("in the fridge: " + showMilk)

    return (
        <>
        <h2>daniel's fridge: </h2>
        <a target="_blank">
            <img src={openedFridge} className="fridge" alt="Fridge" />
            <img src={covering} className="covering" alt="Fridge" />
            <AddButton/>
            
            {showMilk ? (<AddMilk/>) : ""}
        </a>
        </>
    );
}


export default OpenFridge;