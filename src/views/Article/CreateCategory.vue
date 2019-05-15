<template>
	<div class="create-categorys">
		<div class="create">
			<el-form
				ref="categorys"
				:rules="rules"
				@submit.native.prevent="saveCategory('categorys')"
				:model="categorys"
				label-width="80px"
			>
				<el-form-item label="父级分类" prop="parent">
					<el-select v-model="categorys.parent">
						<el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="categorys.name"></el-input>
				</el-form-item>
				<el-form-item style="text-align:center;">
					<el-button type="primary" native-type="submit">创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="category-list">
			<el-table :data="categoryList" style="width: 100%" border="" show-header>
				<el-table-column prop="_id" label="ID"></el-table-column>
				<el-table-column prop="parent.name" label="父级分类"></el-table-column>
				<el-table-column prop="name" label="分类名称"></el-table-column>
				<!-- <el-table-column prop="createAccount" label="创建人"></el-table-column> -->
				<!-- 使用过滤器的方式 -->
				<!-- <el-table-column label="创建时间">
					<template slot-scope="scope">{{scope.row.createDate | dateFormat}}</template>
				</el-table-column> -->
				<!-- <el-table-column prop="updateAccount" label="更新人"></el-table-column> -->
				<!-- <el-table-column label="更新时间">
					<template slot-scope="scope">{{scope.row.updateDate | dateFormat}}</template>
				</el-table-column> -->
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
						<el-button @click="remove(scope.row._id,scope.row.name)" type="text" size="small">删除</el-button>
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
			categorys: {
				name: '',
			},
			rules: {
				name: [
					{ required: true, message: '请输入文章分类', trigger: 'blur' },
					{ min: 2, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
				],
			},
			categoryList: [],
			parents: [],
		};
	},
	filters: {
		// dateFormat(value) {
		// 	return value.format('yyyy-MM-dd hh:mm:ss');
		// 	// return
		// },
	},
	created() {
		this.getCategorys();
	},
	methods: {
		saveCategory(categorys) {
			this.$refs[categorys].validate(valid => {
				if (valid) {
					this.$http.post('categorys/create', this.categorys).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: `文章分类${this.categorys.name}创建成功！'`,
								type: 'success',
							});
							this.getCategorys();
							this.categorys.name = '';
						} else if (res.data.status === '500') {
							this.$message({
								message: res.data.message,
								type: 'error',
							});
						}
					});
				} else {
					return false;
				}
			});
		},
		getCategorys() {
			this.$http.get('categorys/list').then(res => {
				let parents = [];
				if (res.data.status === '200' && res.data.message === 'success') {
					this.categoryList = res.data.data;
					let arr = res.data.data;
					arr.map(item => {
						if (!item.parent) {
							parents.push(item);
						}
					});
				}
				this.parents = parents;
			});
		},
		remove(id, name) {
			this.$confirm(`此操作将永久删除文章分类${name}, 是否继续?`, '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$http.delete(`categorys/${id}`).then(res => {
						if (res.data.status === '200' && res.data.message === 'success') {
							this.$message({
								message: `分类${name}删除成功！`,
								type: 'success',
							});
							this.getCategorys();
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '分类删除已取消!',
					});
				});
		},
	},
};
</script>
<style>
</style>
