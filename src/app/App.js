import React, { useState, useEffect } from "react";
import { shuffle } from "./helpers";
import texts from '../texts';

import "./App.css";

import Celebration from "./Components/Celebration";
import VoiceRecognizer from "./Components/VoiceRecognizer";

/**
 * Center square is a free slot (always on) in the middle
 */
const CENTER_SQUARE = 12;

const Tile = ({ id, children, onToggle, isSet })=> {
  if(id==CENTER_SQUARE){
    return (<div className='tile center-tile'>
        {children}
      </div>
    )
  }
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const data = shuffle(texts);
data.splice(CENTER_SQUARE, 0, "CONF CALL BINGO");

function App() {
  const [state, setState] = useState({ checked: {
    [CENTER_SQUARE]:true
  } });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Bingo</h1>
      <VoiceRecognizer data={data} toggle={toggle}/>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Celebration /> : null}
    </div>
  );
}

export default App;
