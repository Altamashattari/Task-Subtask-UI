import React, { useState } from 'react';
import './Task.css';

const Task = ({ title, menuOptions = [], selectedIndex = 0, updateStatus }) => {
    // const [selectedIndex, setSelectedIndex] = useState(selectedIndex);

    const onSelectionChange = (event) => {
        updateStatus(menuOptions[event.target.selectedIndex]);
    }
    return (
        <div>
            <header className='header'>

                <div>{title}</div>

                {menuOptions?.length ? <select onChange={onSelectionChange}>
                    {menuOptions.map((option, index) => {
                        return <option selected={index === selectedIndex}>{option}</option>
                    })}
                </select> : null}

            </header>
        </div>
    );
}

export default Task;