import apple from '../assets/apple.svg'
import milk from '../assets/milk.svg'
import eggs from '../assets/eggs.svg'
import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpPopup = () => {
    console.log("loggers")
    return (
        <>
            <h1>
                <div className="popup">
                    <p>your item is about to expire!</p>
                </div>
            </h1>
        </>
    )
}

const FridgeItem = ({ name }) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    }
    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const [state, setState] = useState({x: 0, y: 0});
    const handleMouseMove = (e) => {
       setState({ x: e.screenX, y: e.screenY });
    }
    
    switch (name) {
        case 'apple':
            return <img src={apple} className= { name } class="apple" alt = { name }/>
        case 'milk':
            return <>
                    <img src={milk} className= { name } class="milk" alt = { name }
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseOut}
                    onMouseMove={handleMouseMove}/>
                    {isHovering && <ExpPopup/>}
                </>
        case 'eggs':
            return <img src={eggs} className= { name } class="eggs" alt = { name }/>
        default:
            return <img src={name} className= { name } class={ name } alt = { name }/>
    }
}

export default FridgeItem;