import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/admin_dashbord/Layout.jsx';
import Dashboard from './components/admin_dashbord/Dashboard.jsx';
import PostCreate from './components/admin_dashbord/posts/PostCreate.jsx';
import PostIndex from './components/admin_dashbord/posts/PostIndex.jsx';
import PostEdit from './components/admin_dashbord/posts/PostEdit.jsx';
import CategoryIndex, { categoryData } from './components/admin_dashbord/categories/CategoryIndex.jsx';
import CategoryCreate from './components/admin_dashbord/categories/CategoryCreate.jsx';
import CategoryEdit, { editCategoryData } from './components/admin_dashbord/categories/CategoryEdit.jsx';

function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='admin/dashboard' element={<Dashboard />} />
        <Route path='admin/post' element={<PostIndex />} />
        <Route path='admin/post/create' element={<PostCreate />} />
        <Route path='admin/post/edit/:post_id' element={<PostEdit />} />
        <Route
          loader={categoryData}
          path='admin/category'
          element={<CategoryIndex />}

        />
        <Route path='admin/category/create' element={<CategoryCreate />} />
        <Route
          path='admin/category/edit/:category_id'
          element={<CategoryEdit />}
          loader={editCategoryData}
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
