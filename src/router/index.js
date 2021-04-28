import Vue from 'vue'
import VueRouter from 'vue-router'
import authAdmin from '../middleware/authAdmin'
import auth from '../middleware/auth'

//Shops
import Home from '../views/Home.vue'
import Vehicle from '../views/shop/Vehicle.vue'
import VehicleFilter from '../views/shop/VehicleFilter.vue'
import AddProducts from '../views/shop/AddProduct.vue'
import MyProducts from '../views/shop/MyProducts.vue'
import UpdateProduct from '../views/shop/UpdateProduct.vue'
import Product from '../views/shop/Product.vue'
import Whish from '../views/shop/Whish.vue'
import Cancel from '../views/shop/Cancel.vue'
import Success from '../views/shop/Success.vue'

//Authentication
import Login from '../views/authentication/Login.vue'
import Signup from '../views/authentication/Signup.vue'
import Profil from '../views/authentication/Profil.vue'

//Offers
import MyOffers from '../views/offers/MyOffers.vue'
import ProductOffers from '../views/offers/ProductOffers.vue'

//Back Office
import AdminProductOffers from '../views/admin/ProductOffers.vue'
import AdminUserOffers from '../views/admin/UserOffers.vue'
import AdminProducts from '../views/admin/Products.vue'
import UpdateProductAdmin from '../views/admin/UpdateProduct.vue'
import AdminUsers from '../views/admin/Users.vue'
import UpdateUser from '../views/admin/UpdateUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: Vehicle
  },
  {
    path: '/vehicleFilter',
    name: 'VehicleFilter',
    component: VehicleFilter
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/mySales/addProduct',
    name: 'AddProducts',
    component: AddProducts,
    beforeEnter: auth
  },
  {
    path: '/mySales/myProducts',
    name: 'MyProducts',
    component: MyProducts,
    beforeEnter: auth
  },
  {
    path: '/mySales/updateProduct/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
    beforeEnter: auth
  },
  {
    path: '/whish',
    name: 'Whish',
    component: Whish
  },
  {
    path: '/myOffers/:status',
    name: 'MyOffers',
    component: MyOffers,
    beforeEnter: auth
  },
  {
    path: '/productOffers/:product',
    name: 'ProductOffers',
    component: ProductOffers
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    beforeEnter: auth
  },
  {
    path: '/admin/productOffers/:product',
    name: 'AdminProductOffers',
    component: AdminProductOffers,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/userOffers/:user',
    name: 'AdminUserOffers',
    component: AdminUserOffers,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/Products/:vehicle',
    name: 'AdminProducts',
    component: AdminProducts,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/Users',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/updateProduct/:id',
    name: 'UpdateProductAdmin',
    component: UpdateProductAdmin,
    beforeEnter: authAdmin
  },
  {
    path: '/admin/updateUser/:id',
    name: 'UpdateUser',
    component: UpdateUser,
    beforeEnter: auth
  },
  {
    path: '/cancel',
    name: 'Cancel',
    component: Cancel
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
