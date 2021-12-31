import React from 'react'

export default function EditableRow( { inventoryItem, handleInventoryItemEdit }) {
    
    function handleChange(changes) {
        handleInventoryItemEdit(inventoryItem.id, {...inventoryItem, ...changes})
    }

    return (
        <tr>
            <td>
                <input
                    className="editing-input"
                    type="text"
                    required="required"
                    placeholder="Item Name"
                    name="itemName"
                    value={inventoryItem.name}
                    onChange={e => handleChange({name: e.target.value})}
                >
                </input>
            </td>
            <td>
                <input
                    className="editing-input"
                    type="number"
                    required="required"
                    placeholder="Quantity"
                    name="itemQuantity"
                    value={inventoryItem.quantity}
                    onChange={e => handleChange({quantity: parseInt(e.target.value) || "" })}
                >
                </input>
            </td>
            <td>
                <input
                    className="editing-input"
                    type="date"
                    required="required"
                    name="itemDate"
                    value={inventoryItem.date}
                    onChange={e => handleChange({date: e.target.value})}
                >
                </input>
            </td>
            <td>
                <button type="submit" className="btn">Save</button>
            </td>
            
        </tr>
    )
}
