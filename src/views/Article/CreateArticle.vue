<template>
	<el-form
		ref="article"
		:rules="rules"
		@submit.native.prevent="saveArticle('article')"
		:model="article"
		label-width="80px"
	>
		<el-form-item label="文章标题" prop="title">
			<el-input v-model="article.title"></el-input>
		</el-form-item>
		<el-form-item label="文章分类" prop="category">
			<el-select v-model="article.category" placeholder="请选择文章分类">
				<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="文章内容" prop="body">
			<!-- <el-input type="textarea" v-model="article.body" rows="10" show-word-limit></el-input> -->
			<!-- <div id="main"> -->
			<mavon-editor v-model="article.body" :scrollStyle="true"/>
			<!-- </div> -->
		</el-form-item>
		<el-form-item style="text-align:center;">
			<el-button type="primary" native-type="submit">创建</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
export default {
	data() {
		return {
			article: {
				title: '',
				body: '',
				createDate: new Date(),
				updateDate: new Date(),
			},
			options: [],
			rules: {
				title: [
					{ required: true, message: '请输入文章标题', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
				],
				category: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
				body: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
			},
		};
	},
	created() {
		this.getCategorys();
	},
	methods: {
		saveArticle(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$http.post('articles', this.article).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: '文章创建成功！',
								type: 'success',
							});
							this.$router.push('/articles/index');
						}
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getCategorys() {
			this.$http.get('categorys/list').then(res => {
				let categorys = [];
				if (res.data.status === '200' && res.data.message === 'success') {
					let arr = res.data.data;
					arr.map(item => {
						categorys.push({
							id: item._id,
							name: item.name,
						});
					});
				}
				this.options = categorys;
			});
		},
	},
};
</script>
<style lang="less" scoped>
</style>
