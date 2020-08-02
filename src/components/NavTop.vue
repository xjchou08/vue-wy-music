<template>
	<div class="navtop">
		<h1 class="music-logo">
			<i class="iconfont">&#xe605;</i>
			<span>网易云音乐</span>
		</h1>
		<div class="music-search">
			<input
					@keyup.enter="toResult"
					v-model="searchValue"
					autofocus="autofocus"
					autocomplete="on"
					placeholder="搜索音乐，视频，歌词，电台"
			/>
		</div>
		<!--<div class="usrimg">-->
			<!--<img src="" alt="" />-->
			<!--<span class="nickname" v-if="true">咸鱼佳</span>-->
			<!--<span class="nickname" v-else>咸鱼佳</span>-->
		<!--</div>-->
	</div>
</template>
<script>
    export default {
        name: "nav-top",
        data () {
            return {
                musicUrl: '',
                searchValue: ''
            };
        },
        methods: {
            /*
            * 输入关键词后跳转到搜索结果页面中
            * 可指定url 网址栏中的格式
            * */
            toResult () {
                if (this.searchValue == 0) {
                    return;
                }
                this.$router.push('/result?keywords=' + this.searchValue)
            }
        },
    };
</script>

<style lang="scss" scoped>
	* {
		color: #fff;
		font-size: 12px;
	}
	
	.iconfont {
		font-size: 34px;
		margin: 5px;
	}
	
	.navtop {
		display: flex;
		background-color: rgba(198, 47, 47);
		.music-logo {
			display: flex;
			justify-items: center;
			align-items: center;
			margin: 0 3.333vw;
			img {
				width: 5.333vw;
				height: 5.333vw;
			}
			span {
				font-size: 2.133vw;
				color: #fff;
				font-weight: bold;
			}
		}
		.music-search {
			overflow: hidden;
			width: 40%;
			height: 5.333vw;
			line-height: 5.333vw;
			input {
				width: 90%;
				font-size: 1.233vw;
				outline: none;
				border: 0;
				border-radius: 1.733vw;
				padding: 0.8vw 1.333vw 0.8vw 0.667vw;
				background-color: rgba(168, 40, 40, 0.6);
			}
		}
/*		.usrimg {
			display: flex;
			align-items: center;
			img {
				padding: 15px;
				margin: 0 5px;
				background-color: #fff;
				border-radius: 15px;;
			}
		}*/
	}
</style>
