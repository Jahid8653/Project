import React from 'react'
import AddProduct from '../Components/Add-Product/Add-Product'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Components/Layout/Header/Header'
import ViewItem from '../Components/View-Item/View-Item'
import AddItem from '../Components/Add-Product/Add-Item/Add-Item'
import EditItem from '../Components/EditItem'

export default function RootRouting() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="view-item" element={<ViewItem />} />
                    <Route path="add-item" element={<AddItem />} />
                    <Route path="edit-item/:id" element={<EditItem />} />
                </Routes>
            </Router>
        </>
    )
}
