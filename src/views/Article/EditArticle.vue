<template>
	<el-form
		ref="article"
		:rules="rules"
		@submit.native.prevent="updateArticle('article')"
		:model="article"
		label-width="80px"
	>
		<el-form-item label="文章标题" prop="title">
			<el-input v-model="article.title"></el-input>
		</el-form-item>
		<el-form-item label="文章内容" prop="body">
			<el-input type="textarea" v-model="article.body" rows="10" show-word-limit></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" native-type="submit">保存</el-button>
			<el-button @click="goArticleList">取消</el-button>
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
			},
			rules: {
				title: [
					{ required: true, message: '请输入文章标题', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
				],
				body: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
			},
		};
	},
	created() {
		this.getArticle();
	},
	methods: {
		getArticle() {
			this.$http.get(`articles/${this.$route.params.id}`).then(res => {
				if (res.data.status === '200' && res.data.message === 'success') {
					this.article = res.data.data;
				}
			});
		},
		updateArticle(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					//文章更新时间
					this.article.updateDate = new Date()
					this.$http.put(`articles/${this.$route.params.id}`, this.article).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: '文章修改成功！',
								type: 'success',
							});
							this.$router.push('/articles/index');
						}
					});
				} else {
					return false;
				}
			});
		},
		goArticleList() {
			this.$router.push('/articles/index');
		},
	},
};
</script>
<style lang="less" scoped>
</style>
