import '.././graphics.css'
import milk from '.././assets/milk.svg'
import eggs from '.././assets/eggs.svg'
import ItemContext from "../context/ItemContext"
import React, { useContext, useState } from 'react';

function AddMilk () {
    return (
        <>
        <img src={eggs} className="eggs" alt="Eggs" />
        <img src={milk} className="milk" alt="Milk" />
        </>
    );
}


export default AddMilk;