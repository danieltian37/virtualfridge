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
    const [showMilk, setShowMilk] = useState(initialState.showMilk);
    const [showMore, setShowMore] = useState(initialState.showMore);

    const updateShowMore = async () => {
        setShowMore(!showMore);
    }

    const updateShowMilk = async () => {
        setShowMilk(true);
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