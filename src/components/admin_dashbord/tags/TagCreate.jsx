import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

function TagCreate() {
    const navigate = useNavigate();


    // form data object init here 
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        slug: '',
        // ... aur baki ke form fields
    });


    // function for handle change in form fields
    const handleChange = (e) => {
       
            setFormData({ ...formData, [e.target.name]: e.target.value });
       
    };

    // form submit function here 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/v1/tag', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/tag')
        } catch (error) {
            console.error('Error posting form data:', error);
        }
    };
    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">Create Tag</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Tags</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Tag</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={(e) => (handleSubmit(e))}>
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="card custom-card">
                                <div className="card-header">
                                    <div className="card-title">New tag</div>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="Name"
                                                        value={formData.name} onChange={(e) => handleChange(e)} />
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor="slug" className="form-label">Slug</label>
                                                    <input type="text" className="form-control" name="slug" id="slug" placeholder="Slug"
                                                        value={formData.slug} onChange={(e) => handleChange(e)} />
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor="status" className="form-label">Published Status</label>
                                                    <select className="form-control" data-trigger name="status" id="status"
                                                        defaultValue={formData.status}
                                                        onChange={(e) => handleChange(e)} >
                                                        <option value="" disabled>Select</option>
                                                        <option value="1">Published</option>
                                                        <option value="0">Draft</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="btn-list text-end">
                                        <button type="submit" className="btn btn-sm btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>

    )
}

export default TagCreate