<template>
	<div class="detail">
		<el-table
				:data="tableData"
				stripe
				style="width: 100%">
			<el-table-column
					type="index"
					width="50">
			</el-table-column>
			<el-table-column
					prop="name"
					label="歌曲标题">
			</el-table-column>
			
			<el-table-column
					prop="duration"
					label="时长"
					width="180">
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
		</el-table>
	</div>
</template>

<script>
    export default {
        name: "detail",
        data () {
            return {
                tableData: []
            }
        },
        methods: {
            songList () {
                this.$http.get('/playlist/detail?id=' + this.$route.query.id).then(resp => {
                    console.log(resp.data)
                })
            }
        },
        created () {
            this.songList();
        }
    }
</script>

<style lang="scss" scoped>
	.detail {
		margin: 0;
		padding: 0;
	}

</style>