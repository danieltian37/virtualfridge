import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import ItemContext from './ItemContext'
import AddMilk from "../components/Graphics"


const ItemForm = ()=> {
    // const { showMilk, setShowMilk, showMore, setShowMore } = useContext(ItemContext);
    const itemContext = useContext(ItemContext);

    const [name, setName] = useState("");
    const [expDate, setExpDate] = useState("");

    const AddItem = () => {
        itemContext.updateShowMore();
        itemContext.updateShowMilk();
        console.log(itemContext.showMilk);

        console.log("you entered " + name);
        console.log("this expires " + expDate);
    }
    
    
    return (
        <div className='Inputs'>
        <form>
            <label>
                enter name of item: <input type='text' value = {name} onChange ={(e) => setName(e.target.value)} />
            </label>
        </form>
        <form>
            <label>
                enter expiration date of item: <input type='date' value = {expDate} onChange = {(f) => setExpDate(f.target.value)}/>
            </label>
        </form>
            {itemContext.showMore ? < button className='submitButton'
                onClick = {AddItem} > 
                Add item to fridge
                </button> : "" }

                {itemContext.showMilk ? <AddMilk/> : ""}
        </div>
    )
}

export default ItemForm;