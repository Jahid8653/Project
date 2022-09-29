import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './View-Item.css'
import { RiDeleteBin4Fill } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'


export default function ViewItem() {

    const [value, setValue] = useState([]);
    const [search, setSearch] = useState('');
    const fetchData = () => {
        axios.get(`http://localhost:1234/item`)
            .then((res) => {
                console.log("Fetched data: ", res.data);
                setValue(res.data);
            })
            .catch((err) => {
                console.log("Error to fetch data ", err);
            });
    }
    useEffect(() => {
        fetchData();
    }, [setValue]);

    const deleteItem = (item_id) => {
        axios.delete(`http://localhost:1234/item/${item_id}`)
            .then((res) => {
                console.log("Axios res for delete: ", res.data);
                alert("Item deleted successfully")
                fetchData();
                item_id(res.data);
            })
            .catch((err) => {
                console.log("Axios error in details ", err);
            });
    };

    // const editItem = (item_id) => {

    // }
    return (
        <div className='View_Item'>

            <h1 style={{ color: "purple" }}>All Items</h1> <br />

            <input type='text' placeholder='Search' onChange={(event) => {
                setSearch(event.target.value) 
            }}
            />


                <table>
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Name of the item</th>
                            <th> Price</th>
                            <th> Color</th>
                            <th> Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            value.filter((itm) => {
                                if (setSearch == "") {
                                    return itm;
                                } else if (
                                    itm.item_name.toLowerCase().includes(search.toLocaleLowerCase())
                                ) {
                                    return itm;
                                }
                            })
                        .map((itm) => (
                                <tr key={itm.id}>
                                    <td> {itm.id} </td>
                                    <td> {itm.item_name} </td>
                                    <td> {itm.price} </td>
                                    <td> {itm.item_color}  </td>
                                    <td> {itm.description} </td>
                                    <td>
                                        <button onClick={() => { deleteItem(itm.id) }}><RiDeleteBin4Fill /></button>
                                        {/* <button onClick={() => { editItem(itm.id) }}><AiFillEdit/></button> */}
                                        <Link to={`/edit-item/${itm.id}`}>
                                            <button><AiFillEdit /></button>
                                        </Link>
                                    </td>

                                </tr>

                            ))
                        }
                </tbody>
                </table>
                <Link to='/add-item'> <button className='btn2'>Add Item</button></Link>

        </div>
    )
}
