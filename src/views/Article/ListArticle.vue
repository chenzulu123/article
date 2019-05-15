<template>
	<div>
		<!-- 创建分类 -->
		<div style="margin-top: 15px;margin-bottom:20px;">
			<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<!-- 分类列表 -->
		<div>
			<el-table :data="articles" show-header border>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand" label-width="100px" :label-position="labelPosition">
							<el-form-item label="文章标题:">
								<span>{{ props.row.title}}</span>
							</el-form-item>
							<el-form-item label="文章内容:">
								<!-- <span>{{ props.row.body}}</span> -->
								<div class="" style="width:100%;"><mavon-editor v-model="props.row.body" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false"/></div>
							</el-form-item>
							<el-form-item label="文章创建人:">
								<span>{{ props.row.createAccount}}</span>
							</el-form-item>
							<el-form-item label="文章创建时间:">
								<span>{{ props.row.createDate | dateFormat}}</span>
							</el-form-item>
							<el-form-item label="文章更新人:">
								<span>{{ props.row.updateAccount}}</span>
							</el-form-item>
							<el-form-item label="文章更新时间:">
								<span>{{ props.row.updateDate | dateFormat}}</span>
							</el-form-item>
							<el-form-item label="文章分类:">
								<span>{{ props.row.category.name}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="文章标题"></el-table-column>
				<el-table-column prop="body" label="文章内容"></el-table-column>
				<el-table-column prop="createAccount" label="创建人"></el-table-column>
				<el-table-column prop="createDate" label="创建时间">
                    <template slot-scope="scope">{{scope.row.createDate | dateFormat}}</template>
				</el-table-column>
				<!-- <el-table-column prop="updateAccount" label="更新人"></el-table-column> -->
				<!-- <el-table-column prop="updateDate" label="更新时间"></el-table-column> -->
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
						<el-button @click="priview(scope.row)" type="text" size="small">预览</el-button>
						<el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			keyword: '',
			labelPosition:"right",
			defaultData: "preview"
		};
	},
	created() {
		this.getArticleList();
	},
	methods: {
		getArticleList() {
			this.$http.get('articles').then(res => {
				let articles = [];
				if (res.data.data && res.data.data.length > 0) {
					articles = res.data.data;
				}
				this.articles = articles;
			});
		},
		edit(id) {
			this.$router.push(`/articles/${id}/edit`);
		},
		priview(item){

		},
		remove(id) {
			this.$confirm('此操作将永久删除该文章, 是否继续?', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$http.delete(`articles/${id}`).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: '文章删除成功！',
								type: 'success',
							});
							this.getArticleList();
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: ' 文章已取消删除!',
					});
				});
		},
	},
};
</script>

<style scoped>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 100%;
}
</style>