import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//initial state

const initialState = {
    showAdd: false,
    showMilk: false,
    itemList: []
};

const ItemContext = createContext({
    showMilk: false,
    setShowMilk: () => { },
    showAdd: false,
    setShowAdd: () => { },
});

const ItemContextProvider = ({ children }) => {

    const [showMilk, setShowMilk] = useState(undefined);

    const [showAdd, setShowAdd] = useState(initialState.showAdd);
    const [itemList, setItemList] = useState(initialState.itemList);
    console.log(showMilk);

    useEffect(() => {
        const localMilk = localStorage.getItem("showMilk");
        setShowMilk(localMilk ? localMilk : '');
    }, [])
    
    useEffect(() => {
        if (showMilk !== undefined) {
            localStorage.setItem("showMilk", showMilk); 
        }
    }, [showMilk]);

    const updateShowAdd = async () => {
        setShowAdd(!showAdd);
    }

    const updateShowMilk = async () => {
        setShowMilk(!showMilk);
    }

    const addItem = (name, expDate, image, quantity) => {
        setItemList([...itemList, { name, expDate, image, quantity }]);
        console.log(itemList);
    }

    const removeItem = (item) => {

    }


    return (
        <ItemContext.Provider value={{
            showAdd,
            updateShowAdd,
            showMilk,
            updateShowMilk,
            addItem,
            itemList
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