<template>
  <el-table :data="users" style="width: 100%">
    <el-table-column prop="username" label="用户名"></el-table-column>
    <el-table-column prop="password" label="密码"></el-table-column>
    <el-table-column prop="createDate" label="注册时间">
      <template slot-scope="scope">{{scope.row.createDate | dateFormat}}</template>
    </el-table-column>
    <!-- <el-table-column fixed="right" label="操作" width="100" v-if="username==='chenzulu'"> -->
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row._id,scope.row.username)" type="text" size="small" v-if="username==='chenzulu'">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
	data() {
		return {
			users: [],
		};
	},
	created() {
		this.getUsers();
	},
	computed: {
		username() {
			return sessionStorage.getItem('username') || '';
		},
	},
	methods: {
		getUsers() {
			this.$http.get('/users').then(res => {
				// debugger
				if (res.data.status === '200' && res.data.message === 'success') {
					this.users = res.data.data;
				}
			});
		},
		edit(id) {
			this.$router.push(`/userInfo/${id}/edit`)
		},
		remove(id, username) {
			this.$confirm(`此操作将永久删除用户${username}, 是否继续?`, '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$http.delete(`/users/${id}`).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: `${username}删除成功！`,
								type: 'success',
							});
							this.getUsers();
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: `${username}已取消删除！`,
					});
				});
		},
	},
};
</script>
<style>
</style>
