<template>
  <div class="test">
    <div>
      平均值: {{average}}
    </div>
    <button @click="update">加载更多</button>
    <div class="list" v-for="(item, index) in dataList" :key="index">
      <div>{{index}}</div>|
      <div>{{item.data}}</div>|
      <div>{{item.time}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      dataList: [],
      average: 0
    }
  },
  mounted () {
    if (!this.$store.getters.getData.length) {
      this.update()
    } else {
      this.dataList = this.$store.getters.getData.length
    }
  },
  computed: {
  },
  methods: {

    update () {
      this.$store.dispatch('getDataCall', {startIndex: this.dataList.length, count: this.dataList.length + 20}).then(() => {
        this.$set(this, 'dataList', this.$store.getters.getData)
        if (this.dataList.length) {
          this.$set(this, 'average', (this.$store.getters.getAverage).toFixed(2))
        } else {
          this.$set(this, 'average', 0)
        }
        this.$forceUpdate()
      })
    }
  }
}
</script>

<style scoped lang="less">

.test{

  .list{
    display: flex;
    flex-direction: row;

    div {
      margin-left: 20px;
      margin-right: 5px;

      &:nth-child(1) {
        width: 30px;
        margin-left: 0px;
      }

      &:nth-child(2) {
        width: 30px;
        margin-left: 5px;
      }
    }
  }
  button{
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: blue;
    padding: 10px;
    font-size: 15px;
    color: white;
    width: 100%;
  }
}

</style>
