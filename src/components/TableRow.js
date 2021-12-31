import React from 'react'


export default function TableRow(props) {
    const {
        id,
        name,
        quantity,
        date,
        handleItemDelete,
        handleEditClick
    } = props
    
    return (
        <tr>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{date}</td>
            <td>
                <button className="btn" onClick={(e)=> handleEditClick(e, id)}>Edit</button>
                <button className='deleteBtn btn' onClick={()=> handleItemDelete(id)}>-</button>
            </td>
        </tr>
    )
}
