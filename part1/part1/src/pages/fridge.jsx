import openedFridge from '.././assets/openedfridge.svg'
import React, { useContext, useState } from 'react';
import Button from "../components/button.jsx";
import AddMilk from "../components/Graphics"
import ItemContext from "../context/ItemContext"


import '.././graphics.css'

import milk from '.././assets/milk.svg'

const OpenFridge = () => {
    const itemContext = useContext(ItemContext);

    console.log("fridge is " + itemContext.showMilk);

    const thingChecker = () => {
        console.log("checking addmilk is " + itemContext.showMilk);
    }

    return (
        <>
        <h2>daniel's fridge: </h2>
        <a target="_blank">
            <img src={openedFridge} className="fridge" alt="Fridge" />
            <Button/>
            {itemContext.showMilk ? (<AddMilk/>) : null}
        </a>
        </>
    );
}


export default OpenFridge;