import React from 'react'
import { NavLink } from 'react-router-dom'
function PostIndex() {
    function allChecked() {
        let element = document.querySelector('.all-checkbox');
        let allChecked = document.querySelectorAll(".single-checkbox");
        for (let i = 0; i < allChecked.length; i++) {
            if (element.checked) {
                allChecked[i].checked = true;
                document.querySelector(".select_operation").disabled = false;
                document.querySelector(".apply_btn").disabled = false;

            } else {
                allChecked[i].checked = false;
                document.querySelector(".select_operation").disabled = true;
                document.querySelector(".apply_btn").disabled = true;
            }
        }
    }
    function singleCheck() {
        let allChecked = document.querySelectorAll(".single-checkbox");
        let atLeastOneChecked = false;

        for (let i = 0; i < allChecked.length; i++) {
            if (allChecked[i].checked) {
                atLeastOneChecked = true;
            } else {
                allChecked.checked = false;
            }
        }
        if (atLeastOneChecked) {
            document.querySelector(".select_operation").disabled = false;
            document.querySelector(".apply_btn").disabled = false;
        } else {
            document.querySelector(".select_operation").disabled = true;
            document.querySelector(".apply_btn").disabled = true;
        }
    }

    return (
        <div className="main-content app-content">
            <div className="container-fluid">
                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">All Posts</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="javascript:void(0);">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">All Posts</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card custom-card">
                            <div className="card-header d-block">
                                <div className="row">
                                    <div className="col-lg-6 d-flex align-items-center">
                                        <div className="card-title">
                                            All Posts
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        <div className='d-flex justify-content-end mx-3'>
                                            <select name="delete-datatable_length" aria-controls="delete-datatable"
                                                className="form-select form-select-sm select_operation" disabled>
                                                <option value="">Select Action</option>
                                                <option value="publish">Publish</option>
                                                <option value="draft">Draft</option>
                                                <option value="delete">Delete</option>
                                            </select>
                                            <button id="button" className="btn btn-primary btn-sm apply_btn" disabled>Apply</button>
                                        </div>
                                        <div>
                                            <NavLink to="/admin/post/create">
                                                <button id="button" className="btn btn-dark btn-sm"><i className="bi bi-plus"></i> Add Post</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="deleted-table table-responsive">
                                    <div id="delete-datatable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row mb-3">
                                            <div className="col-sm-12 col-md-6">
                                                <div className="dataTables_length" id="delete-datatable_length">
                                                    <label>Show
                                                        <select name="delete-datatable_length" aria-controls="delete-datatable" className="form-select form-select-sm">
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                        </select>
                                                        entries
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="delete-datatable_filter" className="dataTables_filter">
                                                    <label>
                                                        <input type="search" className="form-control form-control-sm" placeholder="Search..." aria-controls="delete-datatable" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <table id="delete-datatable" className="table table-bordered text-nowrap dataTable no-footer" aria-describedby="delete-datatable_info">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: "10px" }}>
                                                                <input className="form-check-input form-checked-dark all-checkbox" onClick={allChecked} type="checkbox" value="" id="darkChecked" />
                                                            </th>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Position</th>
                                                            <th>Office</th>
                                                            <th>Age</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <input className="form-check-input form-checked-dark single-checkbox" onClick={singleCheck} type="checkbox" value="" id="darkChecked" />
                                                            </td>
                                                            <td>1</td>
                                                            <td>Accountant</td>
                                                            <td>Tokyo</td>
                                                            <td>33</td>
                                                            <td>2008/11/28</td>
                                                            <td>
                                                                <div className="btn-list">
                                                                    <NavLink to="/admin/post/edit">
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-primary-light waves-effect waves-light"><i className="ri-edit-line"></i></button>
                                                                    </NavLink>
                                                                    <button className="btn btn-sm btn-icon btn-wave btn-danger-light waves-effect waves-light"><i className="ri-delete-bin-line"></i></button>
                                                                    <NavLink to="/admin/post/edit" style={{ margin: "0 0.375rem 0.375rem 0.375rem" }}>
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-success-light waves-effect waves-light"><i className="bi bi-eye"></i></button>
                                                                    </NavLink>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <input className="form-check-input form-checked-dark single-checkbox" onClick={singleCheck} type="checkbox" value="" id="darkChecked" />
                                                            </td>
                                                            <td>1</td>
                                                            <td>Accountant</td>
                                                            <td>Tokyo</td>
                                                            <td>33</td>
                                                            <td>2008/11/28</td>
                                                            <td>
                                                                <div className="btn-list">
                                                                    <NavLink to="/admin/post/edit">
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-primary-light waves-effect waves-light"><i className="ri-edit-line"></i></button>
                                                                    </NavLink>
                                                                    <button className="btn btn-sm btn-icon btn-wave btn-danger-light waves-effect waves-light"><i className="ri-delete-bin-line"></i></button>
                                                                    <NavLink to="/admin/post/edit" style={{ margin: "0 0.375rem 0.375rem 0.375rem" }}>
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-success-light waves-effect waves-light"><i className="bi bi-eye"></i></button>
                                                                    </NavLink>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <input className="form-check-input form-checked-dark single-checkbox" onClick={singleCheck} type="checkbox" value="" id="darkChecked" />
                                                            </td>
                                                            <td>1</td>
                                                            <td>Accountant</td>
                                                            <td>Tokyo</td>
                                                            <td>33</td>
                                                            <td>2008/11/28</td>
                                                            <td>
                                                                <div className="btn-list">
                                                                    <NavLink to="/admin/post/edit">
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-primary-light waves-effect waves-light"><i className="ri-edit-line"></i></button>
                                                                    </NavLink>
                                                                    <button className="btn btn-sm btn-icon btn-wave btn-danger-light waves-effect waves-light"><i className="ri-delete-bin-line"></i></button>
                                                                    <NavLink to="/admin/post/edit" style={{ margin: "0 0.375rem 0.375rem 0.375rem" }}>
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-success-light waves-effect waves-light"><i className="bi bi-eye"></i></button>
                                                                    </NavLink>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <input className="form-check-input form-checked-dark single-checkbox" onClick={singleCheck} type="checkbox" value="" id="darkChecked" />
                                                            </td>
                                                            <td>1</td>
                                                            <td>Accountant</td>
                                                            <td>Tokyo</td>
                                                            <td>33</td>
                                                            <td>2008/11/28</td>
                                                            <td>
                                                                <div className="btn-list">
                                                                    <NavLink to="/admin/post/edit">
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-primary-light waves-effect waves-light"><i className="ri-edit-line"></i></button>
                                                                    </NavLink>
                                                                    <button className="btn btn-sm btn-icon btn-wave btn-danger-light waves-effect waves-light"><i className="ri-delete-bin-line"></i></button>
                                                                    <NavLink to="/admin/post/edit" style={{ margin: "0 0.375rem 0.375rem 0.375rem" }}>
                                                                        <button className="btn btn-sm btn-icon btn-wave btn-success-light waves-effect waves-light"><i className="bi bi-eye"></i></button>
                                                                    </NavLink>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row" style={{ margin: "0.6rem 0em" }}>
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info" id="delete-datatable_info" role="status" aria-live="polite">
                                                    Showing 1 to 10 of 57 entries
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-7">
                                                <nav aria-label="Page navigation" className="pagination-style-3 d-flex justify-content-end">
                                                    <ul className="pagination mb-0 flex-wrap">
                                                        <li className="page-item disabled">
                                                            <a className="page-link" href="javascript:void(0);">
                                                                Prev
                                                            </a>
                                                        </li>
                                                        <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="javascript:void(0);">
                                                                <i className="bi bi-three-dots"></i>
                                                            </a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">16</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link text-primary" href="javascript:void(0);">
                                                                next
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostIndex