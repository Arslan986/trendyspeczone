import React from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { useEffect, useState, } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CategoryIndex() {

    const [data, setData] = useState(useLoaderData());
    const [action, setaction] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [dataDisplayLimit, setdataDisplayLimit] = useState(10);
    const [page, setPage] = useState(1);


    const handleCheckboxChange = (id) => {
        // Toggle the selected state of the checkbox
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    };
    const handleAllCheckboxChange = () => {
        // Toggle the selected state of all checkboxes
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.length === data.length ? [] : data.map((item) => item.id)
        );
    };


    const bulkAction = () => {
        const bulkParam = {
            ids: selectedIds,
            action: action
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.post(`http://127.0.0.1:8000/api/v1/category-bulkaction`, bulkParam);
                fetchData();

                // Use querySelectorAll for checkboxes
                let allChecked = document.querySelectorAll(".single-checkbox");
                let element = document.querySelector('.all-checkbox');
                setaction("");

                let select = document.querySelector('.select_operation');
                select.selectedIndex = 0;
                setTimeout(() => {

                    element.checked = false;
                    for (let i = 0; i < allChecked.length; i++) {
                        allChecked[i].checked = false;
                    }


                }, 1000);
                // Disable elements
                document.querySelector(".select_operation").disabled = true;
                document.querySelector(".apply_btn").disabled = true;

                Swal.fire(
                    'Updated!',
                    'Your data has been Updated.',
                    'success'
                );
            }
        });

    }

    useEffect(() => {
        document.querySelector(".apply_btn").disabled = true;

    }, [])


    const fetchData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/category`);
            // Update data in state
            setData(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = function (id) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/${id}`);
                console.log(response);
                fetchData();

                // Here you would perform your delete action
                // For example, call a delete API or perform the delete operation
                // After the delete action is completed, you can show another alert
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
            }
        });
    }

    const selectPageHandler = (selectPage) => {
        if (selectPage >= 1 && selectPage <= Math.ceil(data.length / dataDisplayLimit) && selectPage !== page)
            setPage(selectPage)
    }

    const showNoOfDataInOnePage = (e) => {
        setdataDisplayLimit(e.target.value)
        unChecked();
    }
    function unChecked() {
        let element = document.querySelector('.all-checkbox');
        let allChecked = document.querySelectorAll(".single-checkbox");
        for (let i = 0; i < allChecked.length; i++) {
            allChecked[i].checked = false;
            element.checked = false;
        }
    }
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
                    <h1 className="page-title fw-semibold fs-18 mb-0">All Categories</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">All Categories</li>
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
                                            All Categories
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        <div className='d-flex justify-content-end mx-3'>
                                            <select name="delete-datatable_length" aria-controls="delete-datatable"
                                                onChange={(e) => (setaction(e.target.value))}
                                                className="form-select form-select-sm select_operation" disabled>
                                                <option value="">Select Action</option>
                                                <option value="publish">Publish</option>
                                                <option value="draft">Draft</option>
                                                <option value="delete">Delete</option>
                                            </select>
                                            <button type='button' id="apply_btn" className="btn btn-primary btn-sm apply_btn" onClick={() => (bulkAction())}>Apply</button>
                                        </div>
                                        <div>
                                            <NavLink to="/admin/category/create">
                                                <button id="button" className="btn btn-dark btn-sm"><i className="bi bi-plus"></i> Add Category</button>
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
                                                        <select name="delete-datatable_length"
                                                            onChange={(e) => (showNoOfDataInOnePage(e))}
                                                            aria-controls="delete-datatable" className="form-select form-select-sm">
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
                                                                <input className="form-check-input form-checked-dark all-checkbox"
                                                                    onClick={allChecked}
                                                                    type="checkbox"
                                                                    value=""
                                                                    id='allCheckbox'
                                                                    checked={selectedIds.length === data.length}
                                                                    onChange={handleAllCheckboxChange} />
                                                            </th>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Slug</th>
                                                            <th>Image</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            data.slice(page * dataDisplayLimit - dataDisplayLimit, page * dataDisplayLimit).map((item, index) => (
                                                                <tr key={item.id}>
                                                                    <td>

                                                                        <input
                                                                            className="form-check-input form-checked-dark single-checkbox"
                                                                            name='category_id'
                                                                            onClick={singleCheck}
                                                                            type="checkbox"
                                                                            value=""
                                                                            id={`checkbox_${item.id}`}
                                                                            checked={selectedIds.includes(item.id)}
                                                                            onChange={() => handleCheckboxChange(item.id)}
                                                                        />

                                                                    </td>
                                                                    <td>{++index}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.slug}</td>
                                                                    <td>
                                                                        {item.image == null ? null :
                                                                            <img src={`http://localhost:8000/images/category/${item.image}`} alt="" style={{ height: "50px", width: "50px" }} />
                                                                        }
                                                                    </td>
                                                                    <td>{item.status == 1 ? <span className="badge rounded-pill bg-success">Publish</span> : <span className="badge rounded-pill bg-warning">Draft</span>}</td>
                                                                    <td>
                                                                        <div className="btn-list">
                                                                            <NavLink to={`/admin/category/edit/${item.id}`}>
                                                                                <button className="btn btn-sm btn-icon btn-wave btn-primary-light waves-effect waves-light"><i className="ri-edit-line"></i></button>
                                                                            </NavLink>
                                                                            <button className="btn btn-sm btn-icon btn-wave btn-danger-light waves-effect waves-light" onClick={() => (handleDelete(item.id))}><i className="ri-delete-bin-line"></i></button>
                                                                            <NavLink to={`/admin/category/edit/${item.id}`} style={{ margin: "0 0.375rem 0.375rem 0.375rem" }}>
                                                                                <button className="btn btn-sm btn-icon btn-wave btn-success-light waves-effect waves-light"><i className="bi bi-eye"></i></button>
                                                                            </NavLink>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            )
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row" style={{ margin: "0.6rem 0em" }}>
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info" id="delete-datatable_info" role="status" aria-live="polite">
                                                    Showing {Math.min(page * dataDisplayLimit - dataDisplayLimit + 1, data.length)} to {Math.min((page * dataDisplayLimit), data.length)} of {data.length} entries
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-7">
                                                <nav aria-label="Page navigation" className="pagination-style-3 d-flex justify-content-end">
                                                    {
                                                        data.length > 0 &&
                                                        <div>
                                                            <ul className="pagination mb-0 flex-wrap">
                                                                <li className={page > 1 ? "page-item" : "page-item diabled_page"}>
                                                                    <span className="page-link"
                                                                        onClick={() => selectPageHandler(page - 1)}>
                                                                        Prev

                                                                    </span>
                                                                </li>
                                                                {[...Array(Math.ceil(data.length / dataDisplayLimit))].map((__, i) => (
                                                                    <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                                                        <span className="page-link" onClick={() => selectPageHandler(i + 1)}>
                                                                            {i + 1}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                                <li className={page < data.length / dataDisplayLimit ? "page-item" : "page-item diabled_page"}>
                                                                    <span className="page-link"

                                                                        onClick={() => selectPageHandler(page + 1)}>
                                                                        Next
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    }



                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CategoryIndex

export const categoryData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/v1/category`);
    return res.data.data;
}