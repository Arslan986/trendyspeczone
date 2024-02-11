import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';


function PostCreate() {
    // State to store selected options
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Options array
    const options = [
        { key: 'Option1', value: 'Option 1' },
        { key: 'Option2', value: 'Option 2' },
        { key: 'Option3', value: 'Option 3' },
        // Add more options as needed
    ];

    // Event handler to update selected options
    const onSelect = (selectedList) => {
        setSelectedOptions(selectedList);
    };

    // Event handler to update selected options on removal
    const onRemove = (selectedList) => {
        setSelectedOptions(selectedList);
    };

    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">Create Post</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Post</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Post</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="card custom-card">
                            <div className="card-header">
                                <div className="card-title">New Post</div>
                            </div>
                            <div className="card-body">
                                <div className="row gy-3">
                                    <div className="col-xl-12">
                                        <label htmlFor="blog-title" className="form-label">Post Title</label>
                                        <input type="text" className="form-control" id="blog-title" placeholder="Blog Title" />
                                    </div>
                                    <div className="col-xl-12">
                                        <Multiselect
                                            options={options} // Options array
                                            selectedValues={selectedOptions} // Selected options array
                                            onSelect={onSelect} // onSelect event handler
                                            onRemove={onRemove} // onRemove event handler
                                            displayValue="value" // Property to display in the dropdown
                                        />
                                        <label htmlFor="blog-category" className="form-label">Post Category</label>
                                        <select className="form-control" defaultValue="Blogger" data-trigger name="blog-category" id="blog-category">
                                            <option value="">Select Category</option>
                                            <option value="Nature">Nature</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Choice 3">Food</option>
                                            <option value="Choice 3">Travel</option>
                                            <option value="Choice 3">Fashion</option>
                                            <option value="Choice 3">Beauty</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-6">
                                        <label htmlFor="publish-date" className="form-label">Publish Date</label>
                                        <input type="text" className="form-control" id="publish-date" placeholder="Choose date" />
                                    </div>
                                    <div className="col-xl-6">
                                        <label htmlFor="product-status-add" className="form-label">Published Status</label>
                                        <select className="form-control" data-trigger name="product-status-add" id="product-status-add">
                                            <option value="">Select</option>
                                            <option value="Published">Published</option>
                                            <option value="Scheduled">Hold</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-6">
                                        <label htmlFor="blog-tags" className="form-label">Blog Tags</label>
                                        <select className="form-control" name="blog-tags" defaultValue={["Blogger", "Adventure"]} id="blog-tags" multiple>
                                            <option value="Top Blog">Top Blog</option>
                                            <option value="Blogger">Blogger</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Landscape">Landscape</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="form-label">Blog Content</label>
                                        <div id="blog-content"></div>
                                    </div>
                                    <div className="col-xl-12 blog-images-container">
                                        <label htmlFor="blog-author-email" className="form-label">Blog Images</label>
                                        <input type="file" className="blog-images" name="filepond" multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6" />
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="form-label">Blog Type</label>
                                        <div className="d-flex align-items-center">
                                            <div className="form-check me-3">
                                                <input className="form-check-input" type="radio" name="blog-type" id="blog-free1" />
                                                <label className="form-check-label" htmlFor="blog-free1">
                                                    Free
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="blog-type" id="blog-paid1" />
                                                <label className="form-check-label" htmlFor="blog-paid1">
                                                    Paid
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-list text-end">
                                    <button type="button" className="btn btn-sm btn-light">Save As Draft</button>
                                    <button type="button" className="btn btn-sm btn-primary">Post Blog</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default PostCreate