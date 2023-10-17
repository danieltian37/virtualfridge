import React, { createContext, useContext, useEffect, useState } from 'react';
import ItemContext from "../context/ItemContext"
import ItemForm from "./ItemForm.jsx"

const AddButton = () => {
  const itemContext = useContext(ItemContext);

  return (
      <>
      {itemContext.showAdd ? <ItemForm/> : ""}
    <button 
      onClick={() => itemContext.updateShowAdd()}
    >

      {itemContext.showAdd ? "Cancel" : "Add item"}
    </button>

      </>
  );
}

const RemoveButton = () => {
  const itemContext = useContext(ItemContext);

  return (
    <>
          {itemContext.showAdd ? <ItemForm/> : ""}
    <button 
      onClick={() => itemContext.updateShowAdd()}
    >

      {itemContext.showAdd ? "Cancel" : "Add item"}
    </button>
    
    </>
  )
}

export default AddButton;