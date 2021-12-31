import React, { useState, useRef, useEffect, Fragment } from "react";
import TableRow from "./components/TableRow";
import EditableRow from "./components/EditableRow";
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import FilteredInventory from "./components/FilteredInventory";

const LOCAL_STORAGE_KEY = 'react-homestead-app-key'
function App() {
  const [inventoryItems, setInventoryItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInventoryItemID, setSelectedInventoryItemID] = useState()
  const selectedInventoryItem = inventoryItems.find(item => item.id === selectedInventoryItemID)
  

  const inventoryNameRef = useRef()
  const inventoryQuantityRef = useRef()
  const inventoryDateRef = useRef()
  const searchInventoryRef = useRef()

  useEffect(()=> {
    const storedInventoryItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedInventoryItems) setInventoryItems(storedInventoryItems)
  },[])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inventoryItems))
  },[inventoryItems])

  
  function handleAddItem(e) {
    e.preventDefault()
  
    const name = inventoryNameRef.current.value
    const quantity = inventoryQuantityRef.current.value
    const date = inventoryDateRef.current.value

    if(name === '' || quantity === '' || date === '') return
    setInventoryItems(prevInventoryItems => {
      return [...prevInventoryItems, {id: uuidv4(), name: name, quantity: quantity, date: date}]
    })
    inventoryNameRef.current.value = null
    inventoryQuantityRef.current.value = null
    inventoryDateRef.current.value = null
    setSearchTerm("")
  }

  function handleItemDelete(itemId) {
    setInventoryItems(inventoryItems.filter(item => item.id !== itemId))
  }

  function filterInventory(e) {
    const search = e.target.value.toLowerCase()
    const filteredItem = inventoryItems.filter(item => item.name.toLowerCase().includes(search))

    setSearchTerm(filteredItem)
  }

  function handleEditClick(e, id) {
    e.preventDefault()
    setSelectedInventoryItemID(id)
  }

  function handleInventoryItemEdit(id, item) {
    const newInventoryItems = [...inventoryItems]
    const index = newInventoryItems.findIndex(inventoryItem => inventoryItem.id === id)
    newInventoryItems[index] = item
    setInventoryItems(newInventoryItems)
  }

  return (
    <>
      <header className='title'><h1>Hearty Homesteading</h1></header>
      {/* inputs section */}
      <div className='content'>
        <div className='input-container'>
          <form id='form'>
            <input
              ref={inventoryNameRef}
              type="text"
              placeholder="Item Name"
              required="required"
              name="itemName"
              id="itemName"
            />
            <input
              ref={inventoryQuantityRef}
              type="text"
              placeholder="Quantity"
              required="required"
              name="quantity"
              id="quantity"
            />
            <input
              ref={inventoryDateRef}
              type="date"
              required="required"
              name="date"
              id="date"
            />
            <button type='submit' onClick={handleAddItem} className='addBtn'>Add Item</button>
          </form>
        </div>  

        {/* Inventory Table Container */}

        <div className='inventory-container'>
          <input 
            ref={searchInventoryRef}
            type='text' 
            placeholder='Search existing inventory' 
            className='searchBar'
            onChange={(e)=> filterInventory(e)}
          />
          <form className="formTableContainer">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Date</th>
                  <th>Dlt</th>
                </tr>
              </thead>
              <tbody>

                { 
                  searchTerm != 0
                    ?  searchTerm.map(item=> {
                      return (
                        <FilteredInventory key={item.id} {...item} handleItemDelete={handleItemDelete}/>
                      )
                      } )
                    :
                    inventoryItems.map(item=> {
                      return (
                        selectedInventoryItemID === item.id 
                          ? <EditableRow 
                              key={item.id} 
                              inventoryItem={selectedInventoryItem}
                              handleInventoryItemEdit={handleInventoryItemEdit}
                            />
                          : <TableRow 
                              key={item.id} {...item} 
                              handleItemDelete={handleItemDelete} 
                              handleEditClick={handleEditClick}
                            />
                        
                        
                      )
                    } )
                }
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}


export default App;
