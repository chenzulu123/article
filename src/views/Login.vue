<template>
    <el-form
        ref="users"
        :rules="rules"
        @submit.native.prevent="login('users')"
        :model="users"
        label-width="80px"
    >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="users.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="users.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
	data() {
		return {
			users: {},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
				],
				password: [{ required: true, message: '请输入密码', trigger: 'change' }],
			},
		};
	},
	methods: {
		login(users) {
			this.$refs[users].validate(valid => {
				if (valid) {
					this.$http.post('/login', this.users).then(res => {
						debugger;
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: `用户${res.data.data.username}登录成功！`,
								type: 'success',
							});
							//设置token值
							sessionStorage.setItem('token', res.data.token);
							sessionStorage.setItem('username', res.data.data.username);
							this.$router.push('/articles/index');
						} else {
							this.$message({
								message: res.data.message,
								type: 'error',
							});
						}
					});
				} else {
					this.$message({
						message: `请输入完整的用户注册信息！`,
						type: 'error',
					});
					return false;
				}
			});
		},
	},
};
</script>
<style lang="less" scoped>
</style>

