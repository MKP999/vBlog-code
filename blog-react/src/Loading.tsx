import React from 'react';
import './Loading.scss'
const loading = () => {
  return (
      <div className="loading">
        <div className="monsterText">
            <h2>LOADING</h2>
        </div>
        <div className="monster">
            <div className="eye">
                <div className="eyeball"></div>
            </div>
            <div className="mouth"></div>
        </div>
        <div className="monster blue">
            <div className="eye">
                <div className="eyeball"></div>
            </div>
            <div className="mouth"></div>
        </div>
      </div>
    );
}
export default loading