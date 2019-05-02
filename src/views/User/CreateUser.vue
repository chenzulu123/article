<template>
    <el-form
        ref="users"
        :rules="rules"
        @submit.native.prevent="saveUser('users')"
        :model="users"
        label-width="80px"
    >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="users.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="users.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rpassword">
            <el-input type="password" v-model="users.rpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.users.repassword !== '') {
					this.$refs.users.validateField('rpassword');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.users.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			users: {
				username: '',
				password: '',
				rpassword: '',
				createDate: new Date(),
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
				],
				password: [{ required: true, validator: validatePass, trigger: 'blur' }],
				rpassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
			},
		};
	},
	methods: {
		saveUser(users) {
			this.$refs[users].validate(valid => {
				if (valid) {
					this.$http.post('/register', this.users).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: `用户${this.users.username}注册成功！`,
								type: 'success',
							});
							this.$router.push('/users/index');
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
<style>
</style>
