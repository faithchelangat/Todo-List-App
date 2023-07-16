import React, { useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { type } from '@testing-library/user-event/dist/type';
import DatePicker from 'react-datepicker';
// state - hook use state
//const [newItem, setNewItem] =useState[""];
//helper function

function App() {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [newNum, setPriority] = useState('');
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const[isEditItem, setIsEditItem] = useState(null);
  function addItem(){
    if(!newItem){
      alert("Enter an item❗❗");
      return;
    }
    else if(newItem && !toggleSubmit ){
      setItems(
        items.map((item)=>{
          if(item.id === isEditItem ){
            return{...item, value:newItem}
            
          }
          return item;
          
        }))
       setToggleSubmit(true);
       setNewItem('');
       setIsEditItem(null);
       
    }
    else{
  const item = {
    id: Math.floor(Math.random()*1000),
    value:newItem
  };
  setItems(oldlist  =>[...oldlist, item]);
  setNewItem("");
  console.log(items);}
}
function deleteItem(id){
  const newArray =items.filter(item => item.id !==id);
  setItems(newArray);
}
function handlechange(id){
  const newEditItem= items.find((item)=>{
   return item.id === id
  });
  console.log(newEditItem);
  setToggleSubmit(false);
  setNewItem(newEditItem.value);
  setIsEditItem(id);
};
function toggleComplete(id){
  const updatedItems = [...items].map((item) => {
    if(item.id ===id){
      item.completed = !item.completed
    }
    return item
  })
  setItems(updatedItems)
}

const changeDate = (item) =>{
  setDate(item.target.value);
};
  return (
      <div className='App'>
        {/*1. Header*/}

        <h1>Todo List App 📖</h1>
        {/*2. input(input and button)*/}
      <input className='input' type='text'
      placeholder='Add an Item. '
     value={newItem}
      onChange={e => setNewItem(e.target.value)} />
      
      {
        toggleSubmit ? <button title='Add' onClick={() => addItem()}>➕</button>:
        <button title='update item'  onClick={() => addItem()}>🖊</button>
      }
  
       <ul className='ul'>
        {items.map(item =>{
          return(
            <div>
            <li className='li' key={item.id}>{item.value}
          <input type='checkbox' title='mark as complete' onChange={() => toggleComplete(item.id)} 
            checked={item.completed}/>
            <button title='delete item' 
            className='delet-button' onClick={() => deleteItem(item.id)}>❎</button>
            <button className='handle-change' title='edit item' onClick={() => handlechange(item.id)}>🖊
            </button>
            <input className='date1' type='date' onChange={changeDate} title='select date'
            ref={dateInputRef}
        
            />
           </li>
          </div>)
        
        })}
       </ul>
      </div>
  );
}

export default App;
