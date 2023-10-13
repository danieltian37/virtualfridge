import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//initial state

const initialState = {
    showMore: false,
    showMilk: false,
    itemList: [{ name: "milk", expDate: 1697132997, image: "milk.svg", quantity: 1 },
    { name: "eggs", expDate: 1697132997, image: "eggs.svg", quantity: 1 }]
};

const ItemContext = createContext({
    showMilk: false,
    setShowMilk: () => { },
    showMore: false,
    setShowMore: () => { },
});

const ItemContextProvider = ({ children }) => {
    const [showMilk, setShowMilk] = useState(initialState.showMilk);
    const [showMore, setShowMore] = useState(initialState.showMore);
    const [itemList, setItemList] = useState(initialState.itemList);
    
    useEffect(() => {
        if (localStorage.getItem("showMilk") === null) {
            setShowMilk(false);
        } 
        if (showMilk !== undefined) {
            localStorage.setItem("showMilk", showMilk);
        };
    }, [showMilk]);


    const updateShowMore = async () => {
        setShowMore(!showMore);
    }

    const updateShowMilk = async () => {
        setShowMilk(true);
    }

    const removeMilk = () => {
        setShowMilk(false);
    }

    const addItem = (name, expDate, image, quantity) => {
        setItemList([...itemList, { name, expDate, image, quantity }]);
        console.log(itemList);
    }

    const removeItem = (item) => {

    }


    return (
        <ItemContext.Provider value={{
            showMore,
            updateShowMore,
            showMilk,
            updateShowMilk,
            addItem,
            removeMilk
        }}>
            {children}
        </ItemContext.Provider>
    );
};

ItemContextProvider.propTypes = {
    children: PropTypes.any
};

export default ItemContext;

export {
    ItemContextProvider
};