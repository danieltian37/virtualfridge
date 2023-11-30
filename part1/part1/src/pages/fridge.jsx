import openedFridge from ".././assets/openedfridge.svg";
import covering from ".././assets/covering.svg";
import React, { useContext, useState } from "react";
import AddButton from "../components/button.jsx";
import ItemContext from "../context/ItemContext";
import FridgeItem from "../components/FridgeItem";
import AuthenticationContext from '../context/AuthenticationContext';

import "../graphics.css";


const OpenFridge = () => {
  const { itemList } = useContext(ItemContext);
  const authContext = useContext(AuthenticationContext);
  const name = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).name

  return (
    <>
      <h2>{name}'s fridge: </h2>
      <p className="logout">not you? <a onClick={authContext.handleLogout} href="/">log out</a></p>
      <a target="_blank">
        <img src={openedFridge} className="fridge" alt="Fridge" />
        <img src={covering} className="covering" alt="Fridge" />
        <AddButton />
        <div class="flex-container">
        {itemList !== null
          ? itemList.map((item) => (
            <>
              <FridgeItem name={item.name} key={item.name} />
            </>
            ))
          : ""}
        </div>
      </a>
    </>
  );
};

export default OpenFridge;
