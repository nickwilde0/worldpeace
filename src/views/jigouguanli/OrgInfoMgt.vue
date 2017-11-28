<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.pjhm" placeholder="票据号码"></el-input>
				</el-form-item><br>
				<el-form-item>
					<el-date-picker style="width:120px;" v-model="value_chupiaoriqi1" type="date" placeholder="出票日期" >
    				</el-date-picker>&nbsp至
    				<el-date-picker style="width:120px;" v-model="value_chupiaoriqi2" type="date" placeholder="出票日期" >
    				</el-date-picker>
					<el-input style="margin-left:50px;"  placeholder="承兑人名称"></el-input>
					<el-input style="margin-left:50px;"  placeholder="票据金额"></el-input>
				</el-form-item>
				<el-form-item>
					<el-date-picker style="width:120px;" v-model="value_daoqiriqi1" type="date" placeholder="到期日期" >
    				</el-date-picker>&nbsp至
    				<el-date-picker style="width:120px;" v-model="value_daoqiriqi2" type="date" placeholder="到期日期" >
    				</el-date-picker>
    				<el-input style="margin-left:50px;"  placeholder="出票人名称"></el-input>
					<el-input style="margin-left:50px;"  placeholder="票据种类"></el-input>
					<!-- <el-select v-model="selectValue" placeholder="请选择">
						<el-option v-for="item in options" :label="item.label" :value="item."></el-option>
					</el-select> -->
				</el-form-item>
				<el-form-item>
					<el-date-picker style="width:120px;" v-model="value_dengjiriqi1" type="date" placeholder="登记日期" >
    				</el-date-picker>&nbsp至
    				<el-date-picker style="width:120px;" v-model="value_dengjiriqi2" type="date" placeholder="登记日期" >
    				</el-date-picker>
					<el-input style="margin-left:50px;"  placeholder="客户号"></el-input>
					<el-input style="margin-left:50px;"  placeholder="业务状态"></el-input>
				</el-form-item><br>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">单笔新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleModifys">单笔修改</el-button>
				</el-form-item>
				<el-form-item>
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                               :on-preview="handlePreview" 
                               :on-remove="handleRemove" 
                               multiple
                               :limit="3" 
                               :on-exceed="handleExceed" 
                               :file-list="fileList"
                               :on-success="handleSuccess">
  						<el-button type="primary">批量导入</el-button>
					</el-upload>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" >批量提交</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="pjhm" label="票据号码" width="120" sortable></el-table-column>
			<el-table-column prop="pjzl" label="票据种类" width="120" sortable></el-table-column>
			<el-table-column prop="djrq" label="登记日期" width="120" sortable></el-table-column>
			<el-table-column prop="cprq" label="出票日期" width="120" sortable></el-table-column>
			<el-table-column prop="dqrq" label="到期日期" width="120" sortable></el-table-column>
			<el-table-column prop="cpje" label="出票金额" width="120" sortable></el-table-column>
			<el-table-column prop="cprmc" label="出票人名称" width="150" sortable></el-table-column>
			<el-table-column prop="khh" label="承兑行/付款人开户行" width="190" sortable></el-table-column>
			<el-table-column prop="fkhmc" label="付款行名称" width="150" sortable></el-table-column>
			<el-table-column prop="mk" label="Maker" width="120" sortable></el-table-column>
			<el-table-column prop="ck" label="Checker" width="120" sortable></el-table-column>
			<el-table-column prop="ywzt" label="业务状态" width="120" sortable></el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<!-- <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">加载</el-button>
					<el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="warning" size="small" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-button type="primary" @click="batchSubmit" :disabled="this.sels.length===0">批量提交</el-button>
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看界面-->
		<el-dialog title="查看" v-model="checkFormVisible" :close-on-click-modal="false">
			<el-tabs type="border-card" width="130px;">
				<el-tab-pane label="基本信息">
					<el-form :inline="true" :model="checkForm" label-width="110px" ref="checkForm">
				<el-form-item label="票据号码" prop="name">
					<el-input style="width:170px;" v-model="checkForm.pjhm" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="票据种类" prop="name">
					<el-input style="width:80px;" v-model="checkForm.pjzl" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登记日期" prop="name">
					<el-input style="width:170px;" v-model="checkForm.djrq" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出票日期" prop="name">
					<el-input style="width:150px;" v-model="checkForm.cprq" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="到期日期" prop="name">
					<el-input style="width:170px;" v-model="checkForm.dqrq" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出票日期" prop="name">
					<el-input style="width:150px;" v-model="checkForm.cprq" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出票金额" prop="name">
					<el-input style="width:170px;" v-model="checkForm.cpje" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出票人名称" prop="name">
					<el-input style="width:150px;" v-model="checkForm.cprmc" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="承兑行/付款人开户行" prop="name">
					<el-input style="width:170px;" v-model="checkForm.khh" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="付款行名称" prop="name">
					<el-input style="width:150px;" v-model="checkForm.fkhmc" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Maker" prop="name">
					<el-input style="width:170px;" v-model="checkForm.mk" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Checker" prop="name">
					<el-input style="width:150px;" v-model="checkForm.ck" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="业务状态" prop="name">
					<el-input style="width:170px;" v-model="checkForm.ywzt" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
				</el-tab-pane>
				<el-tab-pane label="正面影像资料">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button>保存</el-button> -->
				<el-button @click="ChangeStatue">提交</el-button>
				<!-- <el-button>重置</el-button> -->
				<el-button @click.native="checkFormVisible = false">取消</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="承兑登记信息新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-tabs type="border-card" width="130px;">
				<el-tab-pane label="基本信息">
					<el-form :inline="true" :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
					<el-form-item label="票据种类" prop="name">
						<el-input style="width:150px;" v-model="addForm.pjzl" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="票据号码" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票日期" prop="name">
						<el-date-picker style="width:150px;" type="date" v-model="addForm.cprq" placeholder="选择日期" ></el-date-picker>
					</el-form-item>
					<el-form-item label="票据到期日" prop="name">
						<el-date-picker style="width:150px;" type="date" v-model="addForm.pjdqr" placeholder="选择日期" ></el-date-picker>
					</el-form-item>
					<el-form-item label="票据金额(元)" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<br>
					<el-form-item label="出票人名称" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票人账号" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票人社会信用代码" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票人行业分类" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票人企业规模" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="出票人是否三农企业" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="收款人名称" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="收款人账号" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="收款人开户银行名称" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<br>
					<el-form-item label="承兑人/付款人开户行行号" prop="name">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="承兑人/付款人开户行名称">
						<el-input style="width:150px;" :disabled="true" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="付款行行号">
						<el-input style="width:150px;" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="付款行名称">
						<el-input style="width:150px;" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
				</el-form>
				</el-tab-pane>
				<el-tab-pane label="加载票据正面影像">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addFormVisible = false">确定</el-button>
				<el-button type="primary">提交</el-button>
				<el-button type="warning" @click.native="addFormVisible = false">取消</el-button>
				<!-- <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button> -->
			</div>
		</el-dialog>

		<!-- 修改界面 -->
		<el-dialog title="承兑登记信息修改" v-model="modifysFormVisible" :close-on-click-modal="false">
			<el-tabs type="border-card" width="130px;">
				<el-tab-pane label="基本信息">
					<el-form :inline="true" :model="addForm" label-width="130px" :rules="addFormRules" ref="	addForm">
						<el-form-item label="票据种类" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.pjzl" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="票据号码" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.pjhm" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票日期" prop="name">
							<el-date-picker style="width:150px;" type="date" v-model="modifyForm.cprq" placeholder="选择日期" ></el-date-picker>
						</el-form-item>
						<el-form-item label="票据到期日" prop="name">
							<el-date-picker style="width:150px;" type="date" v-model="modifyForm.pjdqr" placeholder="选择日期" ></el-date-picker>
						</el-form-item>
						<el-form-item label="票据金额(元)" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.pjje" auto-complete="off"></el-input>
						</el-form-item>
						<br>
						<el-form-item label="出票人名称" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprmc" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票人账号" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprzh" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票人社会信用代码" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprshxydm" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票人行业分类" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprhyfl" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票人企业规模" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprqygm" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出票人是否三农企业" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.cprsfsnqy" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="收款人名称" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.skrmc" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="收款人账号" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.skrzh" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="收款人开户银行名称" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.skrkhyhmc" auto-complete="off"></el-input>
						</el-form-item>
						<br>
						<el-form-item label="承兑人/付款人开户行行号" prop="name">
							<el-input style="width:150px;" v-model="modifyForm.khhhh1" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="承兑人/付款人开户行名称">
							<el-input style="width:150px;" :disabled="true" v-model="modifyForm.khhhh2" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="付款行行号">
							<el-input style="width:150px;" v-model="modifyForm.fkhhh" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="付款行名称">
						<el-input style="width:150px;" :disabled="true" v-model="modifyForm.fkhmc" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="加载票据正面影像">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="modifysFormVisible = false">确定</el-button>
				<el-button type="primary">提交</el-button>
				<el-button type="warning" @click.native="modifysFormVisible = false">取消</el-button>
				<!-- <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button> -->
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				// fileList:[{name:'',url:''}],
				imageUrl: '',
				filters: {
					name: '',
					pjhm:''
				},
				users: [],
				value_chupiaoriqi1: '',
				value_chupiaoriqi2: '',
				value_daoqiriqi1: '',
				value_daoqiriqi2: '',
				value_dengjiriqi1: '',
				value_dengjiriqi2: '',
				total: 0,
				page: 1,
				pagesize:20,
				listLoading: false,
				sels: [],//列表选中列
				
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					cprq: '',
					pjdqr: ''
				},

				checkFormVisible: false,//查看界面是否显示
				//查看界面数据
				checkForm: {
					pjhm:'',
					pjzl:'',
					djrq:'',
					cprq:'',
					dqrq:'',
					cpje:'',
					khh:'',
					fkhmc:'',
					mk:'',
					ck:'',
					ywzt:''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				modifyForm: {
					pjzl: '',
					pjhm: '',
					cprq: '',
					pjdqr: '',
					pjje: '',
					cprmc: '',
					cprzh: '',
					cprshxydm: '',
					cprhyfl: '',
					cprqygm: '',
					cprsfsnqy: '',
					skrmc: '',
					skrzh: '',
					skrkhyhmc:'',
					khhhh1: '',
					hhhhh2: '',
					fkhhh: '',
					fkhmc: ''
				},
				modifysFormVisible: false
			}
		},
		methods: {
			ChangeStatue: function(){
				this.$confirm("确定要提交吗","提示",{
					type:'warning'
				}).then(()=>{
					this.$message.success("提交成功！")
				})
			},
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
			upload: function(){
				this.$confirm('要上传东西呀？','暂时出了一点问题,上传不了?',{
					type:'warning'
				}).then(()=>{

				})
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			handleSizeChange(val){
				// console.log(val);
				this.pagesize = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					pagesize: this.pagesize,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					// console.log(row.id);
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示查看界面
			handleCheck: function (index, row){
				this.checkFormVisible = true;
				this.checkForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//修改页面
			handleModifys: function () {
				this.modifysFormVisible = true;
				this.modifyForm = {
					pjzl: '银票',
					pjhm: '1051605102400001',
					cprq: '2016-10-21',
					pjdqr: '2016-10-30',
					pjje: '1500.00',
					cprmc: '出票人guanxi',
					cprzh: '10054444944',
					cprshxydm: '000011112222',
					cprhyfl: '采矿业',
					cprqygm: '中型企业',
					cprsfsnqy: '否',
					skrmc: '收款人ajiao',
					skrzh: '000011114444',
					skrkhyhmc:'花旗银行',
					khhhh1: '100800',
					khhhh2: '中国建设银行股份有限公司上海分行',
					fkhhh: '100800',
					fkhmc: '中国建设银行股份有限公司上海分行'
				}
			},
			//显示
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		    //批量提交
		    batchSubmit: function() {
		    	this.$confirm("确认要提交吗？","提示",{
		    		type: "warning"
		    	}).then(()=>{
		    		this.$message({
		    			message: '提交成功',
		    			type: 'success'
		    		})
		    	})
		    },
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		//文件上传组件
		handleRemove: function(file, fileList){
			console.log(file, fileList);
			console.log("remove");
		},
		handlePreview: function(file){
			console.log(file);
			console.log("preview");
		},
		handleExceed: function(files, fileList){
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
		},
		handleSuccess: function(response, file, fileList){
			console.log(response+"...."+file+"...."+fileList);
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
	.el-input{
		height: 30px;
		width: 200px;
	}
	.el-form-item__label{
		width: 90px;
	}
</style>