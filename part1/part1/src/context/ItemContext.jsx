import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    const [counter, setCounter] = useState(initialState.itemList);

    useEffect(() => {
        axios
            .get('http://localhost:3001/itemList').then(response => {
                const notes = response.data;
                console.log(notes);
                setItemList(notes);
        })

        /* LOCAL STORAGE CODE
        const localItemList = JSON.parse(localStorage.getItem("itemList"));
        if (localItemList !== null) {
            setItemList(localItemList);
        } else {
            console.log("failure"); 
            setItemList([]);
        }
        */
    }, [])
    /*
    useEffect(() => {
        if (itemList != []) {
            localStorage.setItem("itemList", JSON.stringify(itemList));
        }

    }, [itemList])
    */
    
    



    const updateShowAdd = async () => {
        setShowAdd(!showAdd);
        console.log(showAdd);
    }


    const updateShowRemove = () => {
        setShowRemove(!showRemove);
    }

    const addItem = (name, expDate, image, quantity, id) => {
        setItemList([...itemList, { name, expDate, image, quantity, id }]);
        console.log(itemList);

    }

    const removeItem = (name, deleteList) => {
        console.log("hi: ", deleteList);
        setItemList(itemList.filter(function(e) {return e.name != name}))

        for (let i = 0; i < deleteList.length; i++) {
            axios.delete('http://localhost:3001/itemList/' + deleteList[i].id)
        }
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
            counter,
            setCounter,
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