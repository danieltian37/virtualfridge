import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AuthenticationContext from '../context/AuthenticationContext';

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
    const authContext = useContext(AuthenticationContext);
    const [showAdd, setShowAdd] = useState(initialState.showAdd);
    const [showRemove, setShowRemove] = useState(initialState.showRemove);
    const [itemList, setItemList] = useState(initialState.itemList);
    const [counter, setCounter] = useState(initialState.itemList);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            setToken(JSON.parse(window.localStorage.getItem('loggedNoteappUser')).token)
        } catch (error) {
            setToken(null);
            console.log("OOPSIE POOPSIE")
        }

        if (token !== null) {
            try {
                console.log()
                axios
                .get('http://localhost:3002/api/items', { headers: { Authorization: token } }
                ).then(response => {
                    const notes = response.data;
                    console.log(notes);
                    setItemList(notes);
                })
            } catch (error) {
                window.alert("not logged in!")
            }
        }

        /* LOCAL STORAGE CODE
        const localItemList = JSON.parse(localStorage.getItem("itemList"));
        if (localItemList !== null) {
            setItemList(localItemList);
        } else {
            console.log("failure"); 
            setItemList([]);
        }
        */
    }, [authContext.token, token, authContext.user])
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
        const config = {
            headers: { Authorization: authContext.token },
        }
        for (let i = 0; i < deleteList.length; i++) {
            axios.delete('http://localhost:3002/api/items/' + deleteList[i].id, config)
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