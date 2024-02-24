import React, { useEffect, useState } from 'react'
import "./style.css"

//getting the local storage data back from my myTodoList
const getLocalData = ()=>{
  const lists = localStorage.getItem("myTodoList");

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("")
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(getLocalData()); //getLocalData is the function above created to retreive data from local storage

  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton , setToggleButton] = useState(false)


  const addItem = ()=>{
      if(!inputData){
        alert("Please fill your task!!!");
      }
      else if(inputData!==null && toggleButton===true){ //when we are in edit mode 
        setItems(
          items.map((curElem)=>{ //items.map creates a new array, this new array is then passed to setItems, updating the items with the modified array.
            if(curElem.id === isEditItem){
              return {...curElem, name:inputData} //...(spread operator) creates a shallow copy of the curElem object and allows you to override or add properties to the new objec
            }
            return curElem;
          })
        )
        setInputData("");    //placeholder is set as blank 
        setIsEditItem(null); //once edit is done, set isEditItem to null
        setToggleButton(false); //setting toggle button to false, means get the + sign back at placeholder
      }
      else{
        //if we have entered text into placeholder, we will add into into items using setItems
        const myNewInputData = {
          id: new Date().getTime().toString(),
          name: inputData,
        };
        setItems([...items, myNewInputData]); //create a shallow copy of the existing items array, then appends myNewInputData to the end of the new array. This creates a new array with all the elements of the original items array, followed by the new element (myNewInputData).
        setInputData("");
      }
  };
  //edit the items
  const editItem = (index)=>{
    const editedItem = items.find((val)=>{
      return val.id === index;
    })

    setInputData(editedItem.name); //setting the placeholder to this edit item value
    setIsEditItem(index);   //store the id of the item to be edited
    setToggleButton(true); //bring the edit symbol into the placeholder
  }

  //deleting selected items(sections)
  const deleteItem = (index)=>{
    const updatedItems = items.filter((val)=>{
      return val.id !== index;
    })

    setItems(updatedItems);
  }
  //remove all the the elements
  const removeAll = ()=>{
    setItems([]);
  }
 //during any changes to the items list, we use useEffect to make changes to local storage(myTodoList)
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items))
  }, [items])
  

  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="icon" />
                <figcaption>Add your List Here</figcaption>
            </figure>
            <div className="addItems">
              <input 
              type="text" 
              placeholder="Add Item" 
              className="form-control"
              
                value={inputData}
                onChange={(e)=>setInputData(e.target.value)}
              />


              {/* ternary operator */}
              {toggleButton ? (  //when toggle button is true, means we are in edit mode, hence change the icon to + to edit
              <i className="far fa-edit add-btn" onClick={addItem}></i> )
              : (<i className="fa fa-plus add-btn" onClick={addItem}></i>
              )}
              
            </div>

            <div className="showItems">
              {
                items.map((curElem, index)=>{
                  return (
                  <div className="eachItem" key={index}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                  <i className="far fa-edit add-btn" 
                  onClick={()=>editItem(curElem.id)}></i>

                  <i class="far fa-trash-alt add-btn" 
                  onClick={()=>deleteItem(curElem.id)}></i>
                  
                  </div>
                  </div> )
                })
              }
            </div>

            <div className="showItems">
              <button className="btn effect04"
              data-sm-link-text="REMOVE ALL"

              onClick={removeAll}
              ><span>CHECK LIST</span></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo