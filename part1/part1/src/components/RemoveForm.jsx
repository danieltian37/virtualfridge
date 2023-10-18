import React, { createContext, useContext, useEffect, useState } from 'react';
import ItemContext from '../context/ItemContext';


const RemoveForm = () => {
    const itemContext = useContext(ItemContext);

    const [name, setName] = useState("");
    const [expDate, setExpDate] = useState("");

    const RemoveItem = () => {
        itemContext.updateShowRemove();
        itemContext.removeItem(name);

    }


    return (
        <div className='Inputs'>
        <form>
            <label className="removeInput">
                enter name of item to remove: <input type='text' value = {name} onChange ={(e) => setName(e.target.value)} />
            </label>
        </form>

            {itemContext.showRemove ? < button className='removeButton'
                onClick = {RemoveItem} > 
                Remove item from fridge
                </button> : "" }
        </div>
    )
}

export default RemoveForm;