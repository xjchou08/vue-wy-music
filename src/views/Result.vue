<template>
	<div class="searRst">
		<div class="title-wrap">
			<h2 class="title">{{$route.query.keywords}}</h2>
			<span>共找到{{count}}个结果</span>
		</div>
		<div class="main">
			<el-tabs v-model="activeName">
				<el-tab-pane label="歌曲" name="songs">
					<el-table
							:data="tableData"
							@row-click="playMusic"
							stripe
							style="width: 100%">
						<el-table-column
								type="index"
								width="50">
						</el-table-column>
						<el-table-column
								prop="name"
								label="音乐标题">
						</el-table-column>
						<el-table-column
								prop="artists[0].name"
								label="歌手"
								width="200">
						</el-table-column>
						<el-table-column
								prop="album.name"
								label="专辑">
						</el-table-column>
						<el-table-column
								prop="duration"
								label="时长"
								width="180">
						</el-table-column>
						<el-table-column
								prop="mark"
								label="热度"
								width="180">
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="歌单" name="lists">
					<div class="list" v-for="(item,index) in songList" :key="index">
						<img :src="item.coverImgUrl" alt="">
						<div class="listName">{{item.name}}</div>
						<div class="num">{{item.trackCount}}首</div>
						<div class="author"><span style="color:#999;margin-right: 5px;">by</span>{{item.creator.nickname}}
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="视频" name="mv">
					<div class="mvlist" v-for="(item,index) in mvList" :key="index">
						<div class="cover">
							<img :src="item.cover" alt="">
							<div class="playCount">
								<span>{{item.playCount}}</span>
							</div>
							<div class="playTime">
								{{mvMin}}:{{mvSec}}
							</div>
						</div>
						<div class="title">
							<div style="font-size:13px;text-overflow: ellipsis;">{{item.briefDesc}}</div>
							<div style="font-size:13px;color:rgba(153, 153,177);">{{item.artistName}}</div>
						</div>
					</div>
					<div style="clear: both"></div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
    export default {
        name: "result",
        data () {
            return {
                activeName: 'songs',
                count: 0,
                tableData: [],
                songList: [],
                mvList: [],
				mvMin:0,
				mvSec:0
                // type  1 歌曲  1000 歌单  1004 m
            }
        },
        watch: {
            activeName () {
                let type = 1
                switch (this.activeName) {
                    case 'songs':
                        type = 1;
                        break;
                    case 'lists':
                        type = 1000;
                        break;
                    case 'mv':
                        type = 1004;
                        break;
                    default:
                        break;
                }
                this.$http.get('https://autumnfish.cn/search', {
                    params: {
                        keywords: this.$route.query.keywords,
                        type,
                        limit: 30,
                        offset: 0
                    }
                }).then(resp => {
                    console.log(resp.data.result)
                    this.tableData = resp.data.result.songs
                    this.count = resp.data.result.songCount
                    this.songList = resp.data.result.playlists
                    this.mvList = resp.data.result.mvs
					
					for(let i = 0; i<this.mvList.length; i++) {
                        if(this.mvList[i].playCount>100000) {
                            this.mvList[i].playCount = parseInt(this.mvList[i].playCount/10000) + '万'
						}
					}

                    for (let i = 0; i < this.mvList.length; i++) {
                        if(this.mvList[i].duration / 1000 / 60 <10) {
                            this.mvMin = '0'+parseInt(this.mvList[i].duration / 1000 / 60)
                        }else {
                            this.mvMin = parseInt(this.mvList[i].duration / 1000 / 60)
                        }
                        if(this.mvList[i].duration / 1000 % 60 <10) {
                            this.mvSec = '0'+parseInt(this.mvList[i].duration / 1000 % 60)
                        }else {
                            this.mvSec = parseInt(this.mvList[i].duration / 1000 % 60)
                        }

                    }

                })
            }
        },
        methods: {
            /*
		   * 搜索歌曲
		   * 请求歌曲接口 https:autumnfish.cn/search
		   * 请求参数：
		   *        keyword? searchValue
		   *        limit 返回数量  默认为30
		   *        offset 偏移数量 用于分页 (page-1)*limit
		   *        type 搜索类型  默认1为单曲  1000 为歌单 1004 为mv
		   * 返回值：返回歌曲名称
		   * */
            searchMusic () {
                this.$http.get('https://autumnfish.cn/search', {
                    params: {
                        keywords: this.$route.query.keywords,
                        type: 1,
                        limit: 30,
                        offset: 0
                    }
                }).then(resp => {
                    console.log(resp.data.result)
                    this.tableData = resp.data.result.songs
                    this.count = resp.data.result.songCount
                    //
                    this.songList = resp.data.playlists
                    this.mvList = resp.data.result.mvs
					
                    /* 播放量 ->万 */
                    for(let i = 0; i<this.mvList.length; i++) {
                        if (this.mvList[i].playCount > 100000) {
                            this.mvList[i].playCount = parseInt(this.mvlist[i].playCount / 10000) + '万'
                        }
                    }
                    for (let i = 0; i < this.mvList.length; i++) {
                        if(this.mvList[i].duration / 1000 / 60 <10) {
                            this.mvMin = '0'+parseInt(this.mvList[i].duration / 1000 / 60)
						}else {
                            this.mvMin = parseInt(this.mvList[i].duration / 1000 / 60)
						}
                        if(this.mvList[i].duration / 1000 % 60 <10) {
                            this.mvSec = '0'+parseInt(this.mvList[i].duration / 1000 % 60)
						}else {
                            this.mvSec = parseInt(this.mvList[i].duration / 1000 % 60)
						}
                    
                    }

                    /* 时长的判断，有些麻烦 */
                    for (let i = 0; i < this.tableData.length; i++) {
                        if ((this.tableData[i].duration / 1000 / 60) < 10 && this.tableData[i].duration / 1000 % 60 < 10) {
                            this.tableData[i].duration = '0' + parseInt(this.tableData[i].duration / 1000 / 60) + ':' + '0' + parseInt(this.tableData[i].duration / 1000 % 60)
                        } else if (this.tableData[i].duration / 1000 / 60 < 10 && this.tableData[i].duration / 1000 % 60 > 10) {
                            this.tableData[i].duration = '0' + parseInt(this.tableData[i].duration / 1000 / 60) + ':' + parseInt(this.tableData[i].duration / 1000 % 60)
                        } else if (this.tableData[i].duration / 1000 / 60 > 10 && this.tableData[i].duration / 1000 % 60 < 10) {
                            this.tableData[i].duration = parseInt(this.tableData[i].duration / 1000 / 60) + ':' + '0' + parseInt(this.tableData[i].duration / 1000 % 60)
                        } else {
                            this.tableData[i].duration = parseInt(this.tableData[i].duration / 1000 / 60) + ':' + parseInt(this.tableData[i].duration / 1000 % 60)
                        }
                    }
                  

                })
            },
            /*
			* 播放音乐
			* 参数 id
			* */
            playMusic (row) {
                // console.log(row.id)
                this.$http.get('/song/url?id=' + row.id).then(resp => {
                    this.$parent.musicUrl = resp.data.data[0].url
                }).catch(err => {
                    console.log(err)
                })
                // this.$parent.musicUrl = row.id
            }
        },
        created () {
            //   生命周期钩子 回调函数
            this.searchMusic()
        }
    }
</script>

<style lang="scss" scoped>
	.searRst {
		width: 95%;
		margin: 5px auto;
		.main {
			width: 100%;
			margin: 5px auto;
			.list {
				display: flex;
				align-items: center;
				padding: 5px 0;
				
				&:hover {
					background-color: rgba(235, 236, 237);
				}
				&:nth-child(2n) {
					background-color: rgba(245, 245, 247);
				}
				img {
					width: 45px;
					height: 45px;
					margin: 5px 10px;
				}
				.listName {
					flex: 1;
				}
				.num {
					margin-right: 50px;
					color: rgba(136, 136, 136);
					font-size: 13px;
				}
				.author {
					flex: 1;
					font-size: 13px;
				}
			}
			.mvlist {
				width: 200px;
				height: 200px;
				padding: 0 10px 5px;
				float: left;
				.cover {
					position: relative;
					width: 200px;
					height: 150px;
					img {
						width: 100%;
						height: 100%;
					}
					.playCount {
						position: absolute;
						top: 0;
						right: 0;
						height: 24px;
						font-size: 13px;
						line-height: 24px;
						color: #fff;
						background-color: rgba(255, 255, 255, .1);
					}
					.playTime {
						position: absolute;
						left: 5px;
						bottom: 0px;
						color: #fff;
						font-size: 13px;
					}
					.title {
					
					}
				}
			}
		}
	}
</style>