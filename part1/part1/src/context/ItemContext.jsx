import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//initial state

const initialState = {
    showAdd: false,
    itemList: JSON.parse(localStorage.getItem("itemList")),
};

const ItemContext = createContext({
    showAdd: false,
    setShowAdd: () => { },
    showRemove: false,
    setShowRemove: () => { },
});

const ItemContextProvider = ({ children }) => {

    const [showAdd, setShowAdd] = useState(initialState.showAdd);
    const [showRemove, setShowRemove] = useState(initialState.showRemove);
    const [itemList, setItemList] = useState(initialState.itemList);

    useEffect(() => {
        const localItemList = JSON.parse(localStorage.getItem("itemList"));
        if (localItemList !== null) {
            setItemList(localItemList);
        } else {
            console.log("failure"); 
            setItemList([]);
        }
    }, [])
    
    useEffect(() => {
        if (itemList != []) {
            localStorage.setItem("itemList", JSON.stringify(itemList));
        }
    }, [itemList])
    

    console.log("locally: " + localStorage.getItem("itemList"));

    const updateShowAdd = async () => {
        setShowAdd(!showAdd);
        console.log(showAdd);
    }


    const updateShowRemove = () => {
        setShowRemove(!showRemove);
    }

    const addItem = (name, expDate, image, quantity) => {
        setItemList([...itemList, { name, expDate, image, quantity }]);
        console.log(itemList);

    }

    const removeItem = (name) => {
        setItemList(itemList.filter(function(e) {return e.name != name}))
        console.log(itemList);
    }


    return (
        <ItemContext.Provider value={{
            showAdd,
            updateShowAdd,
            showRemove,
            updateShowRemove,
            addItem,
            removeItem,
            itemList,
            setItemList,
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