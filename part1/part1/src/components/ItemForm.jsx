import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import ItemContext from '../context/ItemContext'
import axios from 'axios';


const ItemForm = () => {
    const itemContext = useContext(ItemContext);

    const [name, setName] = useState("");
    const [expDate, setExpDate] = useState("");

    const AddItem = () => {
        itemContext.updateShowAdd();
        itemContext.addItem(name, expDate, name + ".svg", 1);

        axios
        .post('http://localhost:3001/itemList', {
            name: name, 
            expDate: expDate,
            image: name + ".svg",
            })
        .then(response => {
            console.log("posting: ", response)
        })
        .catch(function (error) {
            console.error(error);
        });

        console.log("you entered " + name);
        console.log("this expires " + expDate);
    }

    
    return (
        <div className='Inputs'>
        <form>  
            <label className="userInput">
                enter name of item: <input type='text' value = {name} onChange ={(e) => setName(e.target.value)} />
            </label>
        </form>
        <form>
            <label className="userInput">
                enter expiration date of item: <input type='date' value = {expDate} onChange = {(f) => setExpDate(f.target.value)}/>
            </label>
        </form>
            {itemContext.showAdd ? < button className='submitButton'
                onClick = {AddItem} > 
                Add item to fridge
                </button> : "" }
        </div>
    )
}

export default ItemForm;