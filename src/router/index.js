import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import FirstPage from "../components/FirstPage";
import Edit from "../components/Edit";
import Notifications from "../components/Notifications";
import Items from "../components/Items";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import Header from "../components/Header";
import sampleEdit from "../components/sampleEdit"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: FirstPage
  },
  {
    path: "/header",
    name: "header",
    component: Header
  },
  {
    path:"/notifications",
    name:"notifications",
    component:Notifications,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/footer",
    name:"footer",
    component:Footer,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/sample",
    name:"sample",
    component:sampleEdit,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/item",
    name:"item",
    component:Items,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/profile",
    name:"profile",
    component:Profile,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/login",
    name:"login",
    component: () =>
    import(/* webpackChunkName: "about" */ "../views/Login.vue")

  },
  {
    path:"/edit",
    name:"edit",
    component:Edit,
    meta: {
      tokenRequired: false
  }
    // component: () =>
    // import(/* webpackChunkName: "about" */ "../components/Edit.vue")

  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
