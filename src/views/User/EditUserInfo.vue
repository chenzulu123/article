<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="星座">
                <el-select v-model="form.constellation" placeholder="请选择">
                    <el-option
                        v-for="item in constellations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
                <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
	data() {
		return {
			form: {
				sex: '1',
			},
			constellations: [
				{
					id: '1',
					name: '白羊座',
				},
				{
					id: '2',
					name: '金牛座',
				},
				{
					id: '3',
					name: '双子座',
				},
				{
					id: '4',
					name: '巨蟹座',
				},
				{
					id: '5',
					name: '狮子座',
				},
				{
					id: '6',
					name: '处女座',
				},
				{
					id: '7',
					name: '天秤座',
				},
				{
					id: '8',
					name: '天蝎座',
				},
				{
					id: '9',
					name: '射手座',
				},
				{
					id: '10',
					name: '摩羯座',
				},
				{
					id: '11',
					name: '水瓶座',
				},
				{
					id: '12',
					name: '双鱼座',
				},
			],
		};
	},
	props: {
		id: {},
	},
	created() {
		//当id存在的时候执行fetch
		this.id && this.fetch();
	},
	methods: {
		async onSubmit() {
			let res;
			if (this.form._id) {
				res = await this.$http.put(`userInfo/${this.form._id}`, this.form);
			} else {
				this.form.userId = this.id;
				res = await this.$http.post('userInfo', this.form);
			}
			if (res.data.status === '200' && res.data.message === 'success') {
                this.$router.push('/users/index');
				this.$message({
                    message: "用户信息修改成功！",
					type: 'success',
				});
			}
		},
		async fetch() {
			const res = await this.$http.get(`users/${this.id}`);
			if (res.data.status === '200' && res.data.message === 'success') {
				if (res.data.data.userInfo) {
					this.form = res.data.data.userInfo;
				}
			}
        },
        // 取消修改
        cancle(){
            this.$router.push('/users/index');
        }
	},
};
</script>
<style>
</style>
