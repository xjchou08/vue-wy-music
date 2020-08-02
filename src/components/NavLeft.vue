<template>
	<div class="navbar">
		<div class="main-contain">
			<div class="nav">
				<el-menu
						:default-active="$route.path"
						class="el-menu-vertical-demo"
						router>
					<el-menu-item index="/discovery">
						<i class="icon iconfont">&#xe700;</i>
						<span slot="title">发现音乐</span>
					</el-menu-item>
					<el-menu-item index="/songs">
						<i class="icon iconfont">&#xe674;</i>
						<span slot="title">推荐歌单</span>
					</el-menu-item>
					<el-menu-item index="/newsongs">
						<i class="iconfont icon">&#xe613;</i>
						<span slot="title">最新音乐</span>
					</el-menu-item>
					<el-menu-item index="/movies">
						<i class="iconfont">&#xe62c;</i>
						<span slot="title">最新MV</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="main">
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
		</div>
		<div class="player">
			<!-- @pause="" @play 属性 -->
			<audio :src="musicUrl" controls autoplay></audio>
			<!--<video :src="mvUrl" controls autoplay></video>-->
		</div>
	</div>
</template>

<script>
    export default {
        name: 'nav-left',
        data () {
            return {
                musicUrl: '',
                mvUrl:''
            }
        }
    }
</script>

<style lang="scss" scoped>
	.navbar {
		.iconfont {
			margin-right: 10px;
			font-size: 18px;
			color: #331d00;
		}
		.main-contain {
			display: flex;
			.nav {
				width: 150px;
			}
			.main {
				flex: 1;
			}
		}
		.player {
			audio {
				width: 100%;
				height: 30px;
				outline: none;
				position: fixed;
				bottom: 0;
			}
			video {
				width: 100%;
				height:100%;
				position: absolute;
				top: 100px;
				left: 150px;
				outline: none;
				margin: 0 auto;
			}
		}
		
	}
</style>