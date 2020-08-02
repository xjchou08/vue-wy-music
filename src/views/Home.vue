<template>
	<div id="music">
		<!--<div class="music-top">-->
			<!--<nav-top searchValue="searchValue"></nav-top>-->
		<!--</div>-->
		<!--<div class="music-main">-->
			<!--<nav-lft></nav-lft>-->
			<!--<play-list></play-list>-->
			<!--<router-view></router-view>-->
		<!--</div>-->
		<!--<div class="music-bottom">-->
			<!--<video></video>-->
		<!--</div>-->
	</div>
</template>

<script>
    // import NavTop from "@/components/NavTop.vue";
    // import PlayList from "@/components/PlayList.vue";
    // import NavLft from "@/components/NavLeft.vue";

    export default {
        name: "Home",
        // components: {
        //     // es6 简化
        //     NavTop,
        //     PlayList,
        //     NavLft
        // },
        data () {
            return {
                searchValue: "",
                musicUrl: "",
                musicPic: "",
                mvUrl: "",
                isShow: false,
                isPlaying: false,
                list: [],
                hotComments: [],
            };
        },
        methods: {
            /*
			 * 歌曲播放
			 * 请求地址：https://autumnfish.cn/song/url
			 * 请求方法 get
			 * 请求参数： id
			 * 响应内容 歌曲url地址
			 * */
            playMusic (musicId) {
                this.$axios
                    .get("https://autumnfish.cn/song/url/?id=" + musicId)
                    .then((resp) => {
                        var _this = this;
                        //console.log(resp.data.data[0].url)
                        _this.musicUrl = resp.data.data[0].url;
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                //获取歌曲详情 歌曲封面
                this.$axios
                    .get("https://autumnfish.cn/song/detail?ids=" + musicId)
                    .then((resp) => {
                        console.log(resp.data.songs[0].al.picUrl);
                        this.musicPic = resp.data.songs[0].al.picUrl;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                /*
				 * 热门评论获取
				 * 请求地址： https://autumnfish.cn/comment/hot?type=0
				 * 请求方法：get
				 * 请求参数：id
				 * 响应内容： 歌曲热门评论
				 * */
                this.$axios
                    .get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                    .then((resp) => {
                        console.log(resp.data.hotComments);
                        this.hotComments = resp.data.hotComments;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            /* 播放图片动画效果 */
            play () {
                this.isPlaying = true;
            },
            pause () {
                this.isPlaying = false;
            },
            /*
			 * 播放音乐mv
			 * 请求接口 https://autumnfish.cn/mv/url
			 * 请求方法 get
			 * 请求参数 id(mvid  为0则没有mv)
			 * 响应内容 mv地址
			 * */
            playMV (mvid) {
                var _this = this;
                this.$axios
                    .get("https://autumnfish.cn/mv/url?id=" + mvid)
                    .then((resp) => {
                        //console.log(resp.data)
                        _this.isShow = true;
                        _this.musicUrl = "";
                        _this.mvUrl = resp.data.data.url;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            hide () {
                this.isShow = false;
                this.mvUrl = "";
            },
        },
    };
</script>

<style lang="scss" scoped>
	#music {
		width:100%;
		.music-bottom {
			width: 100%;
			position:absolute;
			bottom: 0;
		}
	}
</style>
