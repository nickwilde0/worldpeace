<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<el-menu :default-active="activeIndex2" mode="horizontal" @select="handleSelect">
					<el-menu-item class="el-menu-demo" index="1">{{index_1}}</el-menu-item>
					<el-menu-item class="el-menu-demo" index="2">{{index_2}}</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<section class="content-container">
				<el-col class="content-core">
					<el-col :span="5" style="margin-top:50px;margin-left:20px;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
						    <span>代办票据</span>
						    <el-button style="float: right; padding: 3px 0" type="text">more...</el-button>
						  </div>
						  <!-- <div v-for="o in 4" :key="o" class="text item">
						    {{'列表内容 ' + o }}
						  </div> -->
						  <div>	
						  	<el-badge :value="125">
								<el-button size="small">银承承兑提交审批</el-button>
							</el-badge>
						  </div>
						  <div>	
						  	<el-badge :value="10">
								<el-button size="small">银承承兑审批</el-button>
							</el-badge>
						  </div>
						  <div>	
						  	<el-badge :value="2">
								<el-button size="small">承兑审批</el-button>
							</el-badge>
						  </div>
						</el-card>
					</el-col>
					<el-col :span="5" style="margin-top:50px;margin-left:20px;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
						    <span>到期票据</span>
						    <el-button style="float: right; padding: 3px 0" type="text">more...</el-button>
						  </div>
						  <div>
						  	<el-badge>
						  		<el-button size="small">承兑到期提醒</el-button>
						  	</el-badge>	
						  </div>
						  <div>	
						  	<el-badge>
						  		<el-button size="small">转贴现卖出回购到期提醒</el-button>
						  	</el-badge>
						  </div>
						  <div>
						  <el-badge>
						  	<el-button size="small">转贴现买入回购到期提醒</el-button>
						  </el-badge>	
						  </div>
						</el-card>
					</el-col>
					<el-col :span="5" style="margin-top:50px;margin-left:20px;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
						    <span>撤销业务</span>
						    <el-button style="float: right; padding: 3px 0" type="text">more...</el-button>
						  </div>
						  <div>	
						  	<el-badge :value="44">
								<el-button size="small">承兑交易已撤回</el-button>
							</el-badge>
						  </div>
						  <div>	
						  	<el-badge :value="30">
								<el-button size="small">贴现交易撤销</el-button>
							</el-badge>
						  </div>
						  <div>	
						  	<el-badge :value="0">
								<el-button size="small">质押交易撤回通知</el-button>
							</el-badge>
						  </div>
						</el-card>
					</el-col>
					<el-col :span="5" style="margin-top:50px;margin-left:20px;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
						    <span>其他通知</span>
						    <el-button style="float: right; padding: 3px 0" type="text">more...</el-button>
						  </div>
						  <div v-for="o in 6" :key="o" class="text item">
						    {{'列表内容 ' + o }}
						  </div>
						</el-card>
					</el-col>
					<el-col :span="24" style="margin-top:70px;">
                		<div id="chartLine" style="width:50%;float:left; height:400px;"></div>
                		<div id="chartLine1" style="width:49%;float:left; height:400px;"></div>
            		</el-col>
				</el-col>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import echarts from 'echarts'

	export default {
		data() {
			return {
				sysName:'票据业务处理平台',
				index_1:'ECDS',
				index_2:'票交所',
				chartLine: null,
				chartLine1: null,
				collapsed: false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine1 = echarts.init(document.getElementById('chartLine1'));
                this.chartLine1.setOption({
                	title: {
                        text: '发生额'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['承兑发生额', '贴现发生额', '转贴现发生额']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '承兑发生额',
                            type: 'line',
                            stack: '总量',
                            data: [100, 132, 151, 134, 90, 290, 210, 340, 400, 350, 390, 290]
                        },
                        {
                            name: '贴现发生额',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 391, 234, 490, 330, 410, 350, 330, 310, 350, 410]
                        },
                        {
                            name: '转贴现发生额',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 801, 934, 1290, 1130, 1320, 900, 1200, 910, 900, 1300]
                        }
                    ]
                });
                this.chartLine.setOption({
                    title: {
                        text: '余额'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['承兑余额', '贴现余额', '转贴现余额']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '承兑余额',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210, 300, 400, 350, 320, 290]
                        },
                        {
                            name: '贴现余额',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310, 350, 430, 310, 350, 310]
                        },
                        {
                            name: '转贴现余额',
                            type: 'line',
                            stack: '总量',
                            data: [500, 1000, 901, 934, 1290, 1330, 1320, 1300, 1200, 1210, 1400, 1300]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawLineChart()
            },
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				 // console.log($router.options.routes);
			},
			handleclose() {
				// console.log('handleclose');
			},
			handleSelect: function (key) {
				if(key==2){
					// console.log("22222");
					this.$router.push({ path: '/orginfomgt' })
				}else{
					console.log(key);
				}
				// console.log("b等于:"+b);
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			return this.drawCharts();

		},
		update() {
			return this.drawCharts();
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.el-menu{
					height: 100%;
					background:#20a0ff;
				}
			.el-menu-demo{
				margin-left: 30px;
				font-weight: 570;
				font-size: 18px;
				color: #fff;
				background-color:#20a0ff;

			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;

			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}

		}
		.content-container {
			    background: #D3D3D3;
			    //overflow: hidden;
			    width:100%;
			    height:780px;
			    //padding:50px;
				//position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
		}
		.content-core {
			background-color: #FFFFFF;
			width:96%;
			margin:2% 2%;
			min-height:500px;
			//margin-left: 10px;
			//margin-right: 20px;
			//border: solid 190px;
		}
		.el-badge {
			margin:5px;
		}
	}
</style>