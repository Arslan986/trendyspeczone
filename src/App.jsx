import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/admin_dashbord/Layout.jsx';
import Dashboard from './components/admin_dashbord/Dashboard.jsx';
import PostCreate, { getCategoryTag } from './components/admin_dashbord/posts/PostCreate.jsx';
import PostIndex, {postData} from './components/admin_dashbord/posts/PostIndex.jsx';
import PostEdit, {editPostData} from './components/admin_dashbord/posts/PostEdit.jsx';
import CategoryIndex, { categoryData } from './components/admin_dashbord/categories/CategoryIndex.jsx';
import CategoryCreate from './components/admin_dashbord/categories/CategoryCreate.jsx';
import CategoryEdit, { editCategoryData } from './components/admin_dashbord/categories/CategoryEdit.jsx';
import TagIndex, { tagData } from './components/admin_dashbord/tags/TagIndex.jsx';
import TagCreate from './components/admin_dashbord/tags/TagCreate.jsx';
import TagEdit, { editTagData } from './components/admin_dashbord/tags/TagEdit.jsx';

function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='admin/dashboard' element={<Dashboard />} />

        <Route
          loader={postData}
          path='admin/post'
          element={<PostIndex />}

        />
        <Route path='admin/post/create'
          loader={getCategoryTag}
          element={<PostCreate />} />
        <Route
          path='admin/post/edit/:post_id'
          element={<PostEdit />}
          loader={editPostData}
        />
        <Route
          loader={categoryData}
          path='admin/category'
          element={<CategoryIndex />}

        />
        <Route path='admin/category/create'
          element={<CategoryCreate />} />
        <Route
          path='admin/category/edit/:category_id'
          element={<CategoryEdit />}
          loader={editCategoryData}
        />
        <Route
          loader={tagData}
          path='admin/tag'
          element={<TagIndex />}

        />
        <Route path='admin/tag/create'
          element={<TagCreate />} />
        <Route
          path='admin/tag/edit/:tag_id'
          element={<TagEdit />}
          loader={editTagData}
        />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
