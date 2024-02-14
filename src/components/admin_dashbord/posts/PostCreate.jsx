import { useState, useEffect, useRef } from "react";
import axios from "axios";
import 'dropify/dist/css/dropify.css';
import $ from 'jquery';
import 'dropify';
import { NavLink, json, useLoaderData, useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import Multiselect from 'multiselect-react-dropdown';


function CategoryCreate() {


    const [allData, setAllData] = useState(useLoaderData());
    const [postContent, setPostContent] = useState("");

    const categoryData = allData.data.categories;
    const tagData = allData.data.tags;
    const metaKeywordsData = allData.data.meta_keywords;
    // multi category select code here 
    const [categorySelectedOptions, setCategorySelectedOptions] = useState([]);

    const categoryOptions = [
        ...categoryData.map((category) => ({ id: category.id, name: category.name }))
    ];

    const onCategorySelect = (selectedList, selectedItem) => {

        setCategorySelectedOptions(selectedList);

    };

    const onCategoryRemove = (selectedList, removedItem) => {
        setCategorySelectedOptions(selectedList);
    };

    // multi tag select code here  
    const [tagSelectedOptions, setTagSelectedOptions] = useState([]);


    const tagOptions = [
        ...tagData.map((tag) => ({ id: tag.id, name: tag.name }))
    ];
    const onTagSelect = (selectedList, selectedItem) => {
        setTagSelectedOptions(selectedList);
    };

    const onTagRemove = (selectedList, removedItem) => {
        setTagSelectedOptions(selectedList);
    };

    // multi meta keyword select code here  
    const [metaKeywordSelectedOptions, setMetaKeywordSelectedOptions] = useState([]);

    const metaKeywordOptions = [
        ...metaKeywordsData.map((metaKeyword) => ({ id: metaKeyword.id, name: metaKeyword.name }))
    ];

    const onMetaKeywordSelect = (selectedList, selectedItem) => {
        setMetaKeywordSelectedOptions(selectedList);
    };

    const onMetaKeywordRemove = (selectedList, removedItem) => {
        setMetaKeywordSelectedOptions(selectedList);
    };

    const editorRef = useRef(null);
    const handleEditorChange = (content, editor) => {
        setPostContent(content)
        // You can store the content in your state or perform any other action.

    };
    const navigate = useNavigate();
    useEffect(() => {
        $('.dropify').dropify();
    }, []);

    // form data object init here 
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        image_alt_text: '',
        meta_title: '',
        meta_description: '',
        status: '',
        // ... aur baki ke form fields
    });
    // image state here 
    const [image, setImage] = useState(null); // State variable for image


    // function for handle change in form fields
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // If the field is an image, update the image state
            setImage(e.target.files[0]);
        } else {
            // For other fields, update the formData state
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // form submit function here 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('title', formData.title);
            formDataWithImage.append('slug', formData.slug);
            formDataWithImage.append('category_id', JSON.stringify(categorySelectedOptions));
            formDataWithImage.append('tag_id', JSON.stringify(tagSelectedOptions));
            formDataWithImage.append('content', postContent);
            formDataWithImage.append('image_alt_text', formData.image_alt_text);
            formDataWithImage.append('meta_title', formData.meta_title);
            formDataWithImage.append('meta_keyword', JSON.stringify(metaKeywordSelectedOptions));
            formDataWithImage.append('meta_description', formData.meta_description);
            formDataWithImage.append('status', formData.status);
            formDataWithImage.append('image', image);

            const response = await axios.post('http://127.0.0.1:8000/api/v1/post', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/post')
        } catch (error) {
            console.error('Error posting form data:', error);
        }
    };
    return (
        <div className="main-content app-content">
            <div className="container-fluid">

                <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                    <h1 className="page-title fw-semibold fs-18 mb-0">Create Post</h1>
                    <div className="ms-md-1 ms-0">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><NavLink to="/admin/post">Posts</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Post</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={(e) => (handleSubmit(e))}>
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="card custom-card">
                                <div className="card-header">
                                    <div className="card-title">New Post</div>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <input type="text" className="form-control" name="title" id="title" placeholder="Title"
                                                        value={formData.title} onChange={(e) => handleChange(e)} />
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor="slug" className="form-label">Slug</label>
                                                    <input type="text" className="form-control" name="slug" id="slug" placeholder="Slug"
                                                        value={formData.slug} onChange={(e) => handleChange(e)} />
                                                </div>
                                                <div className="col-lg-12">
                                                    <div>
                                                        <label htmlFor="image" className="form-label">Image</label>
                                                        <input type="file" className="dropify" id="image" name="image" onChange={(e) => (handleChange(e))} data-height="200" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <label htmlFor="slug" className="form-label">Content</label>
                                                    <Editor
                                                        apiKey='i0mg33ge3md0zdlw6s6d80f22rwer0jeb7sd4eqmoj37e814'
                                                        onEditorChange={handleEditorChange}
                                                        init={{
                                                            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                            tinycomments_mode: 'embedded',
                                                            tinycomments_author: 'Author name',
                                                            mergetags_list: [
                                                                { value: 'First.Name', title: 'First Name' },
                                                                { value: 'Email', title: 'Email' },
                                                            ],
                                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                        }}
                                                        initialValue="Welcome to TinyMCE!"
                                                    />
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
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card custom-card">
                                        <div className="card-header">
                                            <div className="card-title">Post Information</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="status" className="form-label">Categories</label>
                                                            <Multiselect
                                                                options={categoryOptions}
                                                                selectedValues={categorySelectedOptions}
                                                                onSelect={onCategorySelect}
                                                                onRemove={onCategoryRemove}
                                                                displayValue="name"
                                                            />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label htmlFor="status" className="form-label">Tags</label>
                                                            <Multiselect
                                                                options={tagOptions}
                                                                selectedValues={tagSelectedOptions}
                                                                onSelect={onTagSelect}
                                                                onRemove={onTagRemove}
                                                                displayValue="name"
                                                            />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Image Alt Text</label>
                                                            <input type="text" className="form-control" name="image_alt_text" id="image_alt_text" placeholder="Image Alt Text"
                                                                value={formData.image_alt_text} onChange={(e) => handleChange(e)} />
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
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="card custom-card">
                                        <div className="card-header">
                                            <div className="card-title">Seo Information</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="meta_title" className="form-label">Meta Title</label>
                                                            <input type="text" className="form-control" name="meta_title" id="meta_title" placeholder="Meta Title"
                                                                value={formData.meta_title} onChange={(e) => handleChange(e)} />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label htmlFor="status" className="form-label">Meta Keyword</label>
                                                            <Multiselect
                                                                options={metaKeywordOptions}
                                                                selectedValues={metaKeywordSelectedOptions}
                                                                onSelect={onMetaKeywordSelect}
                                                                onRemove={onMetaKeywordRemove}
                                                                displayValue="name"
                                                            />
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <label htmlFor="meta_description" className="form-label">Meta Description</label>
                                                            <textarea name="meta_description" id="meta_description" onChange={(e) => handleChange(e)} cols="30" rows="10" className="form-control">
                                                            </textarea>
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
                </form>

            </div>
        </div>

    )
}

export default CategoryCreate

export const getCategoryTag = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/post/category/tags')
    return res;
}