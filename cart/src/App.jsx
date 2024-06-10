import { useEffect, useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [items, setItems] = useState([])
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


//   const [items, setItems] = useState([]);
// const [quantity, setQuantity] = useState({}); // Object to store quantity for each item id

  useEffect(()=>{
    fetch("https://www.course-api.com/react-useReducer-cart-project").then(response=>response.json()).then((result)=>{setItems(result)})
  },[])
  console.log(items)
  function RemoveAll(){
    console.log("hdftz")
    setItems([])
  }
  function RemoveOne(removeditem){
const newitems = items.filter((item)=>{
  return removeditem !== item
})
setItems(newitems);
  }
  const handleIncrement = (itemId) => {
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      newQuantity[itemId] = (prevQuantity[itemId] || 0) + 1;
      const newItemPrice = parseFloat(items.find(item => item.id === itemId).price); 
      const newTotalPrice = totalPrice + newItemPrice;
      setTotalPrice(newTotalPrice);
      return newQuantity;
    });
  };
  
  
  
  const handleDecrement = (itemId) => {
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      if (newQuantity[itemId] > 0) {
        newQuantity[itemId] -= 1;
        const newItemPrice = parseFloat(items.find(item => item.id === itemId).price);
        const newTotalPrice = totalPrice - newItemPrice;
        setTotalPrice(Math.max(newTotalPrice, 0)); 
      }
      return newQuantity;
    });
  };
  
  
  return (<>
  <header>
    <div className='head'><h1>CartBag :) 
      </h1></div>
      <div className='er'><FontAwesomeIcon
    icon={faCartShopping}
    className='Icon'
/>{totalQuantity > 0 && <span className="cart-quantity">{totalQuantity}</span>}</div>

  </header>
  <div className='items'>

  <div className='bag'><h1>Your Bag</h1></div>
      {items.map((item)=>{
        return(<>
        <div className='Block'><div className='info1'>
          <img src={item.img}/>
          <div className='info'><h2>{item.title}</h2>
          <h4>{item.price}</h4>
          <p className='remove' onClick={()=>{RemoveOne(item)}}>Remove item</p></div>
          </div>
        <div className='ADD'>
        <FontAwesomeIcon
                icon={faCaretUp}
               className='Incre'onClick={() => handleIncrement(item.id)}/> 
               <h4>{quantity[item.id] || 0}</h4>
               <FontAwesomeIcon
                icon={faCaretDown}
               className='Decre'onClick={() => handleDecrement(item.id)} />
        </div>
        </div>
        </>)
      })}
<div className='Total'>
  <p>Total</p>
  <p>{totalPrice.toFixed(2)}</p> 
</div>

      <button onClick={()=>{RemoveAll()}}>CLEAR ITEM</button>
    </div>
  
  </>
  )
}

export default App