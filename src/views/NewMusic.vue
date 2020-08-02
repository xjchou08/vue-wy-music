<template>
	<div class="new_music">
		<div class="music_nav">
			<span class="item" :class="{active:tags=='0'}" @click="tags='0'"> 全部</span>
			<span class="item" :class="{active:tags=='7'}" @click="tags='7'"> 华语</span>
			<span class="item" :class="{active:tags=='96'}" @click="tags='96'"> 欧美</span>
			<span class="item" :class="{active:tags=='16'}" @click="tags='16'"> 韩国</span>
			<span class="item" :class="{active:tags=='8'}" @click="tags='8'"> 日本</span>
		</div>
		<div class="music_tab">
			<el-table
					:data="tableData"
					stripe
					@row-click="songsClick"
					style="width: 80%;margin-top:20px;">
				<el-table-column
						type="index"
						width="80">
				</el-table-column>
				<el-table-column
						props="album.picUrl"
						label="专辑封面"
						width="180">
					<template scope="scope">
						<img :src="scope.row.album.picUrl">
					</template>
				</el-table-column>
				
				<el-table-column
						prop="name"
						label="音乐标题">
				</el-table-column>
				<el-table-column
						prop="album.artists[0].name"
						label="歌手">
				</el-table-column>
				<el-table-column
						prop="album.name"
						label="专辑">
				</el-table-column>
				<el-table-column
						prop="duration"
						width="180"
						label="时长">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
    export default {
        name: "new-music",
        data () {
            return {
                tags: 0,
                tableData: [],
            }
        },
        methods: {
            /* 获取新歌速递
            * 参数 type  全部0  华语 7 欧美96 日本8  韩国16
            * 请求地址： /top/song?type=96
            * */
            songsData () {
                this.$http.get('/top/song',
                    {
                        params: {
                            type: this.type,
                        }
                    }).then(resp => {
                    // console.log(resp.data.data[0])
                    this.tableData = resp.data.data
                    for (let i = 0; i < this.tableData.length; i++) {
                        if ((this.tableData[i].duration / 1000 / 60) < 10 && this.tableData[i].duration / 1000 % 60 < 10) {
                            this.tableData[i].duration = '0' + parseInt(this.tableData[i].duration / 1000 / 60) + ':' + '0' + parseInt(this.tableData[i].duration / 1000 % 60)
                            console.log(i)
                        } else if (this.tableData[i].duration / 1000 / 60 < 10 && this.tableData[i].duration / 1000 % 60 > 10) {
                            this.tableData[i].duration = '0' + parseInt(this.tableData[i].duration / 1000 / 60) + ':' + parseInt(this.tableData[i].duration / 1000 % 60)

                        } else if (this.tableData[i].duration / 1000 / 60 > 10 && this.tableData[i].duration / 1000 % 60 < 10) {
                            this.tableData[i].duration = parseInt(this.tableData[i].duration / 1000 / 60) + ':' + '0' + parseInt(this.tableData[i].duration / 1000 % 60)
                        } else {
                            this.tableData[i].duration = parseInt(this.tableData[i].duration / 1000 / 60) + ':' + parseInt(this.tableData[i].duration / 1000 % 60)
                        }
                    }
                    /*
					* 时: 分: 秒
					* 秒 = 总秒/1000%60
					* 分 = 总秒/1000/60
					* */
                })
            },
            songsClick (row) {
                // console.log(row.id)
                this.$http.get('/song/url?id=' + row.id).then(resp => {
                    this.$parent.musicUrl = resp.data.data[0].url
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created () {
            this.songsData();
        },
        watch: {
            tags () {
                // 全部0  华语 7 欧美96 日本8  韩国16
                this.$http.get('/top/song',
                    {
                        params: {
                            type: this.tags,
                        }
                    }).then(resp => {
                    this.tableData = resp.data.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
	.new_music {
		.music_nav {
			.item {
				height: 30px;
				line-height: 30px;
				font-weight: bold;
				color: #808080;
				margin-top: 20px;
				margin-left: 5px;
				cursor: pointer;
			}
			.active {
				color: #dd6d60;
			}
		}
		.music_tab {
			margin: 0 auto;
			img {
				width: 80px;
				height: 80px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}
		}
	}
</style>