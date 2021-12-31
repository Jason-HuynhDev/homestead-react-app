import React from 'react'

export default function FilteredInventory(props) {
    const {
        id,
        name,
        quantity,
        date,
        handleItemDelete
    } = props
    
    return (
        <tr>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{date}</td>
            <td><button className='deleteBtn btn' onClick={()=> handleItemDelete(id)}>-</button></td>
        </tr>
    )
}
