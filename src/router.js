import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import CreateArticle from './views/Article/CreateArticle.vue'
import CreateCategory from './views/Article/CreateCategory.vue'
import ListArticle from './views/Article/ListArticle.vue'
import EditArticle from './views/Article/EditArticle.vue'
import UserList from './views/User/index.vue'
import EditUser from './views/User/Edituser.vue'
import CreateUser from './views/User/CreateUser.vue'
import Login from './views/Login.vue'
// import EditArticle from './views/EditArticle.vue'
// import EditArticle from './views/EditArticle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/articles/index',
      component: Login
    },
    {
      path: '/articles/index',
      name: 'list-article',
      component: ListArticle
    },
    {
      path: '/articles/create',
      name: 'create-article',
      component: CreateArticle
    },
    {
      path: '/category/create',
      name: 'create-category',
      component: CreateCategory
    },
    {
      path: '/articles/:id/edit',
      name: 'edit-article',
      component: EditArticle
    },
    {
      path: '/users/index',
      name: 'users-list',
      component: UserList
    }, {
      path: '/users/:id/edit',
      name: 'edit-user',
      component: EditUser
    }, {
      path: '/users/create',
      name: 'create-user',
      component: CreateUser
    }, {
      path: '/articles/:id/edit',
      name: 'edit-article',
      component: EditArticle
    }, {
      path: '/articles/:id/edit',
      name: 'edit-article',
      component: EditArticle
    },

  ]
})
