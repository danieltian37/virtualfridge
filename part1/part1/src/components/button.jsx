import React, { createContext, useContext, useEffect, useState } from 'react';
import ItemContext from "./ItemContext"
import ItemForm from "./ItemForm.jsx"

const Button = () => {
  const itemContext = useContext(ItemContext);

  return (
      <>
      {itemContext.showMore ? <ItemForm/> : ""}
    <button 
      onClick={() => itemContext.updateShowMore()}
    >

      {itemContext.showMore ? "Cancel" : "Add item"}
    </button>
      </>
  );
}

export default Button;