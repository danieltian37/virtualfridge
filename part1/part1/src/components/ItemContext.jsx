import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//initial state

const initialState = {
    showMore: false,
    showMilk: false,
};

const ItemContext = createContext({
    showMilk: false,
    setShowMilk: () => { },
    showMore: false,
    setShowMore: () => { },
});

const ItemContextProvider = ( {children} ) => {
    const [showMore, setShowMore] = useState(initialState.showMore);
    const [showMilk, setShowMilk] = useState(initialState.showMilk);
    console.log("please dont reload")

    const updateShowMore = () => {
        setShowMore(!showMore);
    }

    const updateShowMilk = () => {
        setShowMilk(true);
        console.log(showMilk);
    }


    return (
      <ItemContext.Provider value={{
        showMore,
        updateShowMore,
        showMilk,
        updateShowMilk,
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