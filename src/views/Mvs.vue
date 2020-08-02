<template>
	<div class="mvs">
		<div class="catagroy">
			<div class="areas">
				<span class="title">地区:</span>
				<span :class="{active:area=='全部'}" @click="area='全部'">全部</span>
				<span :class="{active:area=='内地'}" @click="area='内地'">内地</span>
				<span :class="{active:area=='港台'}" @click="area='港台'">港台</span>
				<span :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span>
				<span :class="{active:area=='日本'}" @click="area='日本'">日本</span>
				<span :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span>
			</div>
			<div class="areas">
				<span class="title">类型:</span>
				<span :class="{active:types=='全部'}" @click="types='全部'">全部</span>
				<span :class="{active:types=='官方版'}" @click="types='官方版'">官方版</span>
				<span :class="{active:types=='原声'}" @click="types='原声'">原声</span>
				<span :class="{active:types=='现场版'}" @click="types='现场版'">现场版</span>
				<span :class="{active:types=='网易出品'}" @click="types='网易出品'">网易出品</span>
			</div>
			<div class="areas">
				<span class="title">排序:</span>
				<span :class="{active:sort=='上升最快'}" @click="sort='上升最快'">上升最快</span>
				<span :class="{active:sort=='最新'}" @click="sort='最新'">最新</span>
				<span :class="{active:sort=='最热'}" @click="sort='最热'">最热</span>
			</div>
		</div>
		<div class="mvlist" v-for="(item,index) in mvlist" :key="index" @click="playMv(item.id)">
			<div class="mvImg">
				<img :src="item.cover" :title="item.name">
				<div class="playNum">
					<span class="iconfont">&#xe645;</span>
					<span>{{item.playCount}}</span>
				</div>
			</div>
			<div class="mvname">
				<a href="javascript:;" :title="item.name">{{item.name}}</a>
				<a href="javascript:;" :title="item.name">{{item.artistName}}</a>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div class="pagination">
			<el-pagination
					background
					layout="prev, pager, next"
					:current-page="page"
					@current-change="handleCurrentChange"
					:total="total"
					:page-size="10"
					:limit="limit">
			</el-pagination>
		</div>
	</div>
</template>

<script>
    export default {
        name: "mv",
        data () {
            return {
                area: '全部',  // 地区
                types: '全部',  // 类型
                sort: '上升最快', // 排序
                mvlist: [],
                page: 1,
                total: 100,
                limit: 30
            }
        },
        watch: {
            area () {
                this.page = 1
                this.mvData()
            },
            types () {
                this.page = 1
                this.mvData()
            },
            sort () {
                this.page = 1
                this.mvData()
            }
        },
        methods: {
            mvData () {
                this.$http.get('/mv/all',
                    {
                        params: {
                            area: this.area,  //地区
                            type: this.types,  //分类
                            order: this.sort, // 排序
                            limit: this.limit,  // 取出数量
                            offset: (this.page - 1) * this.limit   // 偏移数量，分页 (page-1)*50  默认为0
                        }
                    }).then(resp => {
                    console.log(resp.data)
                    this.mvlist = resp.data.data
                    // 可能会出现接口问题 先验证是否存在
                    if (resp.data.count) {
                        this.total = resp.data.count
                    }
                    /* 处理播放量次数  */
                    for (let i = 0; i < this.mvlist.length; i++) {
                        if (this.mvlist[i].playCount > 100000) {
                            this.mvlist[i].playCount = parseInt(this.mvlist[i].playCount / 10000) + '万'
                        }
                    }
                })
            },
            /* 播放MV */
            playMv (id) {
                this.$http.get('/mv/url?id=' + id).then(resp => {
                    // console.log(resp.data.data)
                    this.$parent.mvUrl = resp.data.data.url
                    // console.log(this.$parent.mvUrl)
                })
            },
            // 切换页
            handleCurrentChange (val) {
                this.page = val
                this.mvData()
                // console.log(this.page)
            }
        },
        created () {
            this.mvData();
        }
    }
</script>

<style lang="scss" scoped>
	a {
		color: #333;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	
	.mvs {
		width: 1500px;
		margin: 10px auto;
		padding-bottom: 100px;
		.catagroy {
			.areas {
				margin: 20px;
				cursor: pointer;
				span {
					margin: 0 10px;
					color: #999;
					font-weight: bold;
				}
				.title {
					color: #333;
					padding: 5px;
				}
				.active {
					background-color: rgba(252, 247, 244);
					color: rgba(243, 182, 167);
					padding: 1px 15px;
					border-radius: 8px;
					cursor: pointer;
				}
			}
		}
		.mvlist {
			margin: 0 0 10px 30px;
			float: left;
			.mvImg {
				position: relative;
				img {
					width: 200px;
					height: 150px;
					-webkit-border-radius: 5px;
					-moz-border-radius: 5px;
					border-radius: 5px;
				}
				.playNum {
					position: absolute;
					top: 5px;
					right: 10px;
					font-size: 12px;
					color: #fff;
					.iconfont {
						margin: 0 5px;
					}
				}
			}
			.mvname {
				a:first-child {
					width: 195px;
					font-size: 14px;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					line-height: 20px;
					height: 20px;
				}
				a:last-child {
					color: #999;
					font-size: 13px;
					width: 200px;
					text-align: center;
				}
			}
		}
		/*  分页 */
		.pagination {
			width: 500px;
			margin: 0 auto;
		}
	}
</style>