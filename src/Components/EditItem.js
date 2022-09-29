import React, { useEffect, useState } from 'react'
import './EditItem.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditItem() {
  const navigate = useNavigate();
  const {id} = useParams();
  const[state, setState] = useState({item_name: "", item_color:"", price:"", description:""})
  console.log("Item Name", id);
  const getItem= async() => {
    const response= await axios.get(`http://localhost:1234/item/${id}`);
    return response
  }
  useEffect(() => {
    getItem()
    .then((res) => {
      console.log("Data to be edited: ", res.data);
      setState(res.data);
  })
  .catch((err) => {
    console.log("Error to find the item:", err);
  });
  }, [setState]);
  const handleSubmit= (e) => {
    e.preventDefault();
    console.log("Submitted value: ", state);
    axios.put(`http://localhost:1234/item/${state.id}`, state)
    .then((res) => {
      console.log("Update response: ", res.data);
      alert("Data updated successully")
      navigate("/view-item");
    })
    .catch((err) => {
      console.log("Update err: ", err);
      alert("Error to updated")
      navigate("/view-item");
    });
  };
  return (
    <div className='Edit_Item'> <strong>Edit Item</strong> <br /> 
      <form className=' Edit_Item2' onSubmit={handleSubmit}>
      <div className="Item_Color">
          <label><b>Item_Name:</b></label>
          <input
            type="text"
            name='item_name'
            value={state.item_name}
            onChange={(event) => 
            setState((prev) => ({...prev, item_name: event.target.value}))
            }
            className="form-control"
            placeholder="Item Name"
          
          />
          
        </div>
        <div className="Item_Color">
          <label><b>Item_Color:</b></label>
          <input
            type="text"
            name='item_color'
            value={state.item_color}
            onChange={(event) => 
            setState((prev) => ({...prev, item_color: event.target.value}))
            }
            className="form-control"
            placeholder="Item Color"
       
          />
          
        </div>
        <div className="Item_Color">
          <label><b>Price:</b></label>
          <input
            type="text"
            name='price'
            value={state.price}
            onChange={(event) => 
            setState((prev) => ({...prev, price: event.target.value}))
            }
            className="form-control"
            placeholder="Price"
           
          />
          
        </div>
        <div className="Item_Color">
          <label><b>Description:</b></label>
          <input
            type="text"
            name='description'
            value={state.description}
            onChange={(event) => 
            setState((prev) => ({...prev, description: event.target.value}))
            }
            className="form-control"
            placeholder="Description"
        
          />
          
        </div> <br /> 
        <button type="submit" className="Style_Submit">
            <b> Submit </b>
          </button>
        </form>
        </div>
  )
}
