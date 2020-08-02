<template>
	<div class="discovery">
		
		<div class="carousel-img">
			<el-carousel :interval="3000" type="card" height="240px">
				<el-carousel-item v-for="(item, index) in banner" :key="index">
					<img :src="item.imageUrl" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="songlist">
			<h3>推荐歌单</h3>
			<div class="lists" v-for="(item,index) in songlists" :key="index">
				<img :src="item.picUrl" alt="" @click="listClick(item.id)">
				<div class="title">
					<span>{{item.copywriter}}</span>
				</div>
				<p class="cover_title">{{item.name}}</p>
			</div>
			<div style="clear: both"></div>
		</div>
		<div class="discovery_music">
			<h3>最新音乐</h3>
			<div class="items">
				<div class="item" v-for="(item, index) in newsongs" :key="index">
					<div class="img-wrap" @click="songsClick(item.id)">
						<img :src="item.picUrl" alt="">
						<span class="iconfont icon">&#xe645;</span>
					</div>
					<div class="song-wrap">
						<div class="song_name">{{item.name}}</div>
						<div class="singer">{{ item.song.artists[0].name }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="discovery_mv">
			<h3>推荐MV</h3>
			<div class="mv" v-for="(item,index) in mv" :key="index">
				<div class="mv-box">
					<img :src="item.picUrl" alt="">
					<span class="iconfont icon-mv">&#xe62c;</span>
					<div class="num-wrap">
						<div class="iconfont">&#xe645;</div>
						<div class="playNum">{{item.playCount}}</div>
					</div>
				</div>
				
				<div class="info-wrap">
					<div class="song-name">{{item.name}}</div>
					<div class="singer">{{item.artistName}}</div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "find-music",
        data () {
            return {
                banner: [],
                activeName: 'first',
                ishover: false,
                songlists: {},
                newsongs: [],
                mv: []
            }
        },
        methods: {
            getBanner () {
                /*
                * 轮播图
                * 参数 type 0网页 1安卓手机适配 2ios 3ipad适配
                * 请求地址:
                * */
                this.$http.get('/banner?type=0').then(resp => {
                    this.banner = resp.data.banners
                }).catch(err => console.log(err))

                /*
                *获取推荐歌单  limit  限制推荐的个数
                * */
                this.$http.get('/personalized', {limit: 10}).then(res => {
                    this.songlists = res.data.result
                })
                /*
				*最新音乐
				* 请求地址  /personalized/newsong
				* 请求方法 post
				* */
                this.$http.get('/personalized/newsong').then(resp => {
                    this.newsongs = resp.data.result
                })
                /*
				* 获取mv
				* /personalized?limit=1
				* */
                this.$http.get('/personalized/mv').then(resp => {
                    this.mv = resp.data.result
                })
            },
            /*
			* 点击获取歌单
			* */
            listClick (id) {
                console.log(id)
            },
            /*
			* 点击最新音乐的封面
			* 参数-- id
			* 可以直接获取到父组件的内容 $parent
			* */
            songsClick (id) {
                // console.log(id)
                this.$http.get('/song/url?id=' + id).then(resp => {
                    // console.log(resp.data.data[0].url)
                    this.$parent.musicUrl = resp.data.data[0].url
                })
            },
            /*
			* 切换 导航栏
			* */
            handleClick (tab, event) {
                console.log(tab, event);
            }

        },
        created () {
            this.getBanner();
        }
    }
</script>

<style lang="scss" scoped>
	.discovery {
		/* 轮播图 */
		.carousel-img {
			width: 1300px;
			margin: 5px auto 0;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		/* 推荐歌单*/
		.songlist {
			width: 100%;
			overflow: hidden;
			.lists {
				width: 200px;
				height: 200px;
				font-size: 12px;
				padding-bottom: 20px;
				margin:5px;
				float: left;
				position: relative;
				overflow: hidden;
				img {
					width: 200px;
					height: 200px;
					border-radius: 5px;
					&:hover {
						transform:scale(2);
						transition: all 1.2s;
					}
				}
			}
			.title {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				color: rgba(255,255,255,0);
				background-color: rgba(255,255,255,0);
			}
			.title:hover {
				background-color:rgba(0,0,0,.5);
				color: #fff;
			}
			.cover_title {
				width:200px;
				height: 16px;
				line-height: 16px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				position: absolute;
				bottom: -10px;
				cursor:pointer;
			}
			
		}
		/* 最新音乐 */
		.discovery_music {
			.items {
				height: 500px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				flex-direction: column;
				flex-wrap: wrap;
				padding-left: 15px;
				.item {
					height: 100px;
					width: 50%;
					display: flex;
					-moz-box-align: center;
					align-items: center;
					.img-wrap {
						position: relative;
						display: flex;
						justify-content: center;
						cursor: pointer;
						img {
							width: 80px;
							height: 80px;
						}
						.iconfont {
							position: absolute;
							top: 40%;
							left: 40%;
							padding: 5px;
							font-size: 14px;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							/*background-color: hsla(0, 0%, 100%, .8);*/
							color: rgba(255, 255, 255, 0);
							cursor: pointer;
							&:hover {
								color: #dd6d60;
								background-color: #fff;
							}
						}
						
					}
					.song-wrap {
						display: flex;
						justify-content: space-around;
						flex-direction: column;
						height: 70%;
						padding: 10px;
						font-size: 16px;
						.singer {
							color: #999;
						}
						.song_name {
							font-weight: bold;
							color: #333;
						}
					}
				}
			}
		}
		/* 推荐mv*/
		.discovery_mv {
			width: 100%;
			height: 350px;
			overflow: hidden;
			.mv {
				float: left;
				margin-right: 10px;
				.mv-box {
					position: relative;
					img {
						width: 250px;
						height: 150px;
						border-radius: 5px;
					}
					.icon-mv {
						position: absolute;
						top: 30%;
						left: 40%;
						font-size: 20px;
						padding: 5px;
						color: rgba(255, 255, 255, 0);
						&:hover {
							color: #dd6d60;
							background-color: #fff;
							-webkit-border-radius: 5px;
							-moz-border-radius: 5px;
							border-radius: 5px;
						}
					}
					.num-wrap {
						display: flex;
						align-items: center;
						position: absolute;
						top: 0;
						right: 5px;
						font-size: 15px;
						color: #fff;
						.playNum {
							margin: 3px;
						}
					}
				}
				.info-wrap {
					width: 250px;
					text-align: center;
					.singer {
						color: #999;
					}
				}
			}
			.clear {
				clear: both;
			}
		}
	}
</style>