import React, { createContext, useContext, useEffect, useState } from 'react';
import ItemContext from "../context/ItemContext"
import ItemForm from "./ItemForm.jsx"
import RemoveForm from "./RemoveForm.jsx"

const AddButton = () => {
  const itemContext = useContext(ItemContext);

  return (
    <>
      {itemContext.showAdd && !itemContext.showRemove ? <ItemForm/> : null}

      {itemContext.showAdd || itemContext.showRemove ? null : <button className='add'
      onClick={() => itemContext.updateShowAdd()}> Add item </button>}


      {itemContext.showRemove && !itemContext.showAdd ? <RemoveForm/> : ""}
      {itemContext.showRemove || itemContext.showAdd ? null :     
      <button className='remove'
        onClick={() => itemContext.updateShowRemove()}>
          Remove item
      </button>}

      {itemContext.showAdd ?     
        <button className='add'
        onClick={() => itemContext.updateShowAdd()}>
          Cancel
      </button> :     
      null}

      {itemContext.showRemove ?     
        <button className='add'
        onClick={() => itemContext.updateShowRemove()}>
          Cancel
      </button> :     
      null}

    </>
  );
}


export default AddButton;