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
    showRemove: false,
    setShowRemove: () => { },
});

const ItemContextProvider = ({ children }) => {

    const [showMilk, setShowMilk] = useState(undefined);
    const [showAdd, setShowAdd] = useState(initialState.showAdd);
    const [showRemove, setShowRemove] = useState(initialState.showRemove);
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

    useEffect(() => {
        const localItemList = localStorage.getItem("itemList");
        setItemList(localItemList ? localItemList : "");
    }, [])

    useEffect(() => {
        if (itemList !== undefined) {
            localStorage.setItem("itemList", itemList);
        }

    }, [itemList])

    const updateShowAdd = async () => {
        setShowAdd(!showAdd);
    }

    const updateShowMilk = async () => {
        setShowMilk(!showMilk);
    }

    const updateShowRemove = () => {
        setShowRemove(!showRemove);
    }

    const addItem = (name, expDate, image, quantity) => {
        setItemList([...itemList, { name, expDate, image, quantity }]);
        console.log(itemList);
    }

    const removeItem = (name) => {
        setItemList([itemList.filter(function(e) {return e[0] != name})])
        console.log(itemList);
    }


    return (
        <ItemContext.Provider value={{
            showAdd,
            updateShowAdd,
            showRemove,
            updateShowRemove,
            showMilk,
            updateShowMilk,
            addItem,
            itemList,
            removeItem
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