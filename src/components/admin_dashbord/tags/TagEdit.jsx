import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
function TagEdit() {
    const navigate = useNavigate();

    // Extract tag_id from useParams
    const { tag_id } = useParams();

    // State variable for image
    const loaderData = useLoaderData();

    // form data object are here 
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        slug: '',
        // ... and other form fields
    });

    // use effect is here for data loding in form fields 

    useEffect(() => {
        handleFormData(loaderData);
        console.log(loaderData)
    }, []);

    // handle form data function is here 
    const handleFormData = (res) => {
        setFormData({
            ...formData,
            name: res.data.data.name,
            slug: res.data.data.slug,
            status: res.data.data.status,
        });

        document.getElementById("name").value = res.data.data.name;
        document.getElementById("slug").value = res.data.data.slug;
        document.getElementById("status").value = res.data.data.status;

    };

    // from fied input change here 
    const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // form field handle submit here 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
         

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/tag-update/${tag_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/tag')
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Error posting form data:', error);
        }
    };
    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">Edit Tag</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Tags</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Edit Tag</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={(e) => (handleSubmit(e))}>
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="card custom-card">
                                <div className="card-header">
                                    <div className="card-title">Update Tag</div>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="tag Name"
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
                                        <button type="submit" className="btn btn-sm btn-primary">Update</button>
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

export default TagEdit

export const editTagData = async ({ params }) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/v1/tag/${params.tag_id}/edit`);
    return res;
} 