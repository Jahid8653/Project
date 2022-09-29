import './Add-Item.css'
import Axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function AddItem() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({ errorMsg: { itemname: "", itemcolor: "", price: "", description: "" } })
  const validItemName = RegExp('^[A-Z]{1}[A-Za-z]{1,29}$')
  const validItemColor = RegExp('^[A-Za-z]{1,10}$')
  const validPrice = RegExp('^[0-9.]{1,6}$')
  const validDescription = RegExp('^(.|s)*[a-zA-Z]+(.|s)*$')
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target
    const error = { ...inputState.errorMsg }
    switch (name) {
      case 'itemname': error.itemname = validItemName.test(value) ? "" :
        "*Contains only character, should start with capital letter, Must be more than 2 character"
        break;
      case 'itemcolor': error.itemcolor = validItemColor.test(value) ? "" :
        "*Contains only character, Should start with capital letter"
        break;
      case 'price': error.price = validPrice.test(value) ? "" :
        "*Contains only number"
        break;
      case 'description': error.description = validDescription.test(value) ? "" :
        "*Contains min 15 and max 120 characters,should start with capital letter"
        break;
      default: break;
    }

    setInputState({ ...inputState, [name]: value, errorMsg: error })
    console.log("Error: ", inputState.errorMsg);
  }

  const handle_submit = (event) => {
    event.preventDefault();
    console.log("Submitted value ", inputState);
    let data2 = {
      item_name: inputState.itemname,
      item_color: inputState.itemcolor,
      price: inputState.price,
      description: inputState.description,
    }
    Axios.post(`http://localhost:1234/item`, data2)
    .then((res) => {
      console.log("Axios res in add items: ", res.data);
      alert("data added");
      navigate('/view-item')
    })
    .catch((err) => {
      console.log("Axios error in add items ", err);
    })
  }

  // let formik = useFormik({
  //   initialValues: {
  //     item_name: "", item_color: "", price: "", description: ""
  //   },
  // onSubmit: (formValue) => {
  //   console.log("Submitted Value: ", formValue);



return (
  <div className='Add_Item'> <strong>Add Item</strong> <br />
    <form className=' View_Item2' onSubmit={handle_submit}>
      <div className="brod">
        <label className='col'><b>Item_Name:</b></label>
        <input
          type="text"
          name='itemname'
          className="form-control"
          placeholder="Item Name"
          onChange={handleChange}
          
        />
{inputState.errorMsg.itemname.length > 0 ? <span className='Text'>{inputState.errorMsg.itemname}</span> : ""}
      </div>
      <div className="brod">
        <label className='col'><b>Item_Color:</b></label>
        <input
          type="text"
          name='itemcolor'
          className="form-control"
          placeholder="Item Color"
          onChange={handleChange}
          
        />
{inputState.errorMsg.itemcolor.length > 0 ? <span className='Text'>{inputState.errorMsg.itemcolor}</span> : ""}
      </div>
      <div className="brod">
        <label className='col'><b>Price:</b></label>
        <input
          type="text"
          name='price'
          className="form-control"
          placeholder="Price"
          onChange={handleChange}
         
        />
 {inputState.errorMsg.price.length > 0 ? <span className='Text'>{inputState.errorMsg.price}</span> : ""}
      </div>
      <div className="brod">
        <label className='col'><b>Description:</b></label>
        <input
          type="text"
          name='description'
          className="form-control"
          placeholder="Description"
          onChange={handleChange}
          
        />
{inputState.errorMsg.description.length > 0 ? <span className='Text'>{inputState.errorMsg.description}</span> : ""}
      </div> <br />
      <button type="submit" className="stl2">
        <b> Submit </b>
      </button>
    </form>
  </div>

)
  }