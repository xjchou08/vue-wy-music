<template>
  <div class="playlist">
    <div class="play-title">
      <span>总共666首</span>
      <span>收藏全部</span>
      <span>清空</span>
    </div>
    <div class="songList">
      <li v-for="(item , index) in playList" :key="index">{{item.name}}</li>
    </div>
  </div>
</template>

<script>
export default {
  name: "play-list",
  data () {
      return {
          playList: []
      }
  },
  methods: {
      async playAllList () {
          const res = await this.$axios.get('https:autumnfish.cn/personalized/newsong')
          console.log(res.data.result)
          this.playList = res.data.result
      }
  },
  created () {
      this.playAllList();
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  width: 30%;
  height: 53.333vw;
  display: none;
  .play-title {
      display: flex;
      font-size: 1.733vw;
      color: rgba(112, 112, 112);
      margin-bottom: 0.667vw;
      span {
          margin: 0 0.667vw;
      }
      span:first-child {
          flex: 1;
      }
  }
  .songList {
    li {
      height: 3.2vw;
      line-height: 3.2vw;
      padding-left: 0.667vw;
      font-size: 1.733vw;
      list-style: none;
      color: rgba(73, 73, 73);
      &:nth-child(2n + 1) {
        background-color: rgba(245, 245, 247);
      }
    }
  }
}
</style>
