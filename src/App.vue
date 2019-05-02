<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1','2','3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>内容管理
          </template>
          <el-menu-item index="/articles/index">文章列表</el-menu-item>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/category/create">分类管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>用户管理
          </template>
          <el-menu-item index="/users/index">用户列表</el-menu-item>
          <el-menu-item index="/users/create" v-if="username==='chenzulu'">创建用户</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-shopping-bag-2"></i>商品管理
          </template>
          <el-menu-item index="/goods/index">商品列表</el-menu-item>
          <el-menu-item index="/goods/create">创建商品</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{username||""}}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
html,
body {
	padding: 0;
	margin: 0;
}
.el-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
}

.el-aside {
	color: #333;
}
</style>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		// 获取用户名
		username() {
			console.log(sessionStorage.getItem('username'));
			return sessionStorage.getItem('username') || '';
		},
	},
	methods: {},
};
</script>
