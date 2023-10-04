import openedFridge from '.././assets/openedfridge.svg'
import React, { useContext, useState } from 'react';
import Button from "../components/button.jsx";

const OpenFridge = () => {

    return (
        <>
        <h2>daniel's fridge: </h2>
        <a target="_blank">
            <img src={openedFridge} className="fridge" alt="Fridge" />
            <Button/>
        </a>
        </>
    );
}


export default OpenFridge;