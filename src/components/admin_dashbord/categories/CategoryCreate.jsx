import { useState, useEffect } from "react";
import axios from "axios";
import 'dropify/dist/css/dropify.css';
import $ from 'jquery';
import 'dropify';
import { useNavigate } from 'react-router-dom';

function CategoryCreate() {
    const navigate = useNavigate();
    useEffect(() => {
        $('.dropify').dropify();
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        slug: '',
        // ... aur baki ke form fields
    });
    const [image, setImage] = useState(null); // State variable for image


    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // If the field is an image, update the image state
            setImage(e.target.files[0]);
        } else {
            // For other fields, update the formData state
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('name', formData.name);
            formDataWithImage.append('slug', formData.slug);
            formDataWithImage.append('status', formData.status);
            formDataWithImage.append('image', image);

            const response = await axios.post('http://127.0.0.1:8000/api/v1/category', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/category')
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Error posting form data:', error);
        }
    };
    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">Create Category</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Category</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Category</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={(e) => (handleSubmit(e))}>
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="card custom-card">
                                <div className="card-header">
                                    <div className="card-title">New Category</div>
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
                                        <div className="col-lg-6">
                                            <div>
                                                <input type="file" className="dropify" name="image" onChange={(e) => (handleChange(e))} data-height="200" />
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

export default CategoryCreate