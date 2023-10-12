import openedFridge from '.././assets/openedfridge.svg'
import React, { useContext, useState } from 'react';
import Button from "../components/button.jsx";
import AddMilk from "../components/Graphics"
import ItemContext from "../components/ItemContext"

const OpenFridge = () => {
    const itemContext = useContext(ItemContext);

    return (
        <>
        <h2>daniel's fridge: </h2>
        <a target="_blank">
            <img src={openedFridge} className="fridge" alt="Fridge" />
            <Button/>
            {itemContext.showMilk ? <AddMilk/> : ""}
        </a>
        </>
    );
}


export default OpenFridge;