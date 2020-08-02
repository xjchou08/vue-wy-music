<template>
	<div class="songList">
		<div class="banner">
			<div class="img-wrap">
				<img :src="playlist.coverImgUrl" :title="playlist.name">
			</div>
			<div class="content-wrap">
				<div class="title">精品歌单</div>
				<div class="songs_tile">{{playlist.name}}</div>
				<div class="info">{{playlist.description}}</div>
			</div>
		</div>
		<div class="catagory">
			<span class="catalist" :class="{active:tags=='全部'}" @click="tags='全部'"> 全部 </span>
			<span class="catalist" :class="{active:tags=='欧美'}" @click="tags='欧美'"> 欧美 </span>
			<span class="catalist" :class="{active:tags=='华语'}" @click="tags='华语'"> 华语 </span>
			<span class="catalist" :class="{active:tags=='流行'}" @click="tags='流行'"> 流行 </span>
			<span class="catalist" :class="{active:tags=='说唱'}" @click="tags='说唱'"> 说唱 </span>
			<span class="catalist" :class="{active:tags=='摇滚'}" @click="tags='摇滚'"> 摇滚 </span>
			<span class="catalist" :class="{active:tags=='轻音乐'}" @click="tags='轻音乐'"> 轻音乐 </span>
			<span class="catalist" :class="{active:tags=='影视原声'}" @click="tags='影视原声'"> 影视原声 </span>
			<span class="catalist" :class="{active:tags=='ACG'}" @click="tags='ACG'"> ACG </span>
			<span class="catalist" :class="{active:tags=='怀旧'}" @click="tags='怀旧'"> 怀旧 </span>
			<span class="catalist" :class="{active:tags=='治愈'}" @click="tags='治愈'"> 治愈 </span>
			<span class="catalist" :class="{active:tags=='民谣'}" @click="tags='民谣'"> 民谣 </span>
			<span class="catalist" :class="{active:tags=='电子'}" @click="tags='电子'"> 电子 </span>
		</div>
		<div class="mvlist">
			<div class="lists" v-for="(item,index) in songlists" :key="index">
				<img :src="item.coverImgUrl" alt="" @click="listClick(item.id)">
				<div class="title">
					<span>播放量:{{item.playCount}}</span>
				</div>
				<p class="cover_title">{{item.name}}</p>
			</div>
			<div style="clear: both"></div>
		</div>
		<!--
			page-size 每页多少条数据
			total 总共多少页
			current-page 当前页
		-->
		<div class="pagination">
			<el-pagination
					background
					@current-change="handleCurrentChange"
					layout="prev, pager, next"
					:total="total"
					:current-page="page"
					:page-size="10"
			></el-pagination>
		</div>
	</div>
</template>

<script>
    export default {
        name: "song-list",
        data () {
            return {
                playlist: [],
                songlists: {},
                tags: '全部',
                total: 100,
                page: 1,
            }
        },
        watch: {
            tags () {
                /*
                * 侦听点击的音乐分栏
                * 获取的数据： tags
                * */
                this.$http.get('/top/playlist/highquality', {
                    params: {
                        limit: 1,
                        cat: this.tags
                    }
                }).then(resp => this.playlist = resp.data.playlists[0])

                this.$http.get('/top/playlist/', {
                        params: {
                            limit: 10,
                            cat: this.tags,
                            offset: (this.page - 1) * 10 // 分页
                        }
                    }
                ).then(res => {
                    console.log(res.data)
                    // console.log(res.data.total)
                    this.total = res.data.total
                    this.songlists = res.data.playlists
                    for (let i = 0; i < this.songlists.length; i++) {
                        if (this.songlists[i].playCount > 100000) {
                            this.songlists[i].playCount = parseInt(this.songlists[i].playCount / 10000) + '万'
                        }
                    }
                })
            }
        },
        created () {
            this.getSongList();
        },
        methods: {
            /*
            * 精品歌单
            * 请求地址：/top/playlist/highquality
            * 可选参数  litmit 歌单数量  cat 歌单标签
            * */
            getSongList () {
                this.$http.get('/top/playlist/highquality', {
                    params: {
                        limit: 1,
                        cat: '全部'
                    }
                }).then(resp =>
                    this.playlist = resp.data.playlists[0])
                /* 获取每个音乐分类的列表 */
                this.$http.get('/top/playlist/', {
                    params: {
                        limit: 10,
                        cat: '全部',
                        offset: (this.page - 1) * 10 // 分页
                    }
                }).then(res => {
                    console.log(res.data)
                    this.songlists = res.data.playlists
                })
            },
            /* 分页处理  */
            handleCurrentChange (val) {
                // console.log(`当前页${val}`)
                this.page = val
                this.getSongList()
            },
            listClick(id) {
				this.$router.push('/detail?id='+id)
                console.log(id)
			}
        }
    }
</script>

<style lang="scss" scoped>
	.songList {
		.banner {
			display: flex;
			width: 1300px;
			height: 160px;
			margin: 5px auto;
			padding: 10px;
			overflow: hidden;
			background-color: rgba(44, 44, 44);
			.img-wrap {
				img {
					width: 160px;
					height: 160px;
				}
			}
			.content-wrap {
				margin: 5px 20px;
				.title {
					width: 100px;
					height: 30px;
					line-height: 30px;
					cursor: pointer;
					text-align: center;
					color: rgba(223, 172, 103);
					border-radius: 5px;
					border: 1px solid rgba(223, 172, 103);
					font-size: 17px;
				}
				.songs_tile {
					color: #fff;
					font-size: 18px;
					padding: 5px 0 5px 5px;
				}
				.info {
					color: #888482;
					text-indent: 5px;
					font-size: 14px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 5;
					line-clamp: 5;
				}
			}
		}
		/* 歌曲分类 */
		.catagory {
			height: 20px;
			line-height: 20px;
			overflow: hidden;
			margin: 20px 15px;
			.catalist {
				width: 100px;
				margin-left: 5px;
				font-size: 15px;
				color: rgba(128, 128, 128);
				cursor: pointer;
			}
			.active {
				color: rgba(221, 109, 96);
			}
		}
		.mvlist {
			height: 550px;
			cursor: pointer;
			overflow: hidden;
			margin-left: 15px;
			.lists {
				font-size: 12px;
				padding: 0px 5px 30px;
				float: left;
				position: relative;
				img {
					width: 230px;
					height: 230px;
					border-radius: 5px;
					&:hover {
					
					}
				}
			}
			.title {
				position: absolute;
				top: 0;
				left: 0;
				color: rgba(0, 0, 0, 0);
				&:hover {
					width: 90%;
					height: 10%;
					cursor: pointer;
					color: #fff;
					padding: 10px;
					background-color: rgba(0, 0, 0, .5);
				}
			}
			.cover_title {
				position: absolute;
				bottom: 0px;
				width: 200px;
				height: 20px;
				line-height: 20px;
				margin: 0;
				padding: 5px 2px;
				overflow: hidden;
				text-overflow: ellipsis; //省略号
				white-space: nowrap;
			}
		}
		.pagination {
			width: 350px;
			height: 100px;
			margin: 0 auto;
		}
	}
</style>