<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showProduce="handlerProduce" @showSale="handlerSale" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="产品信息"
      v-if="visible"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="生产信息"
      v-if="visible2"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <produce @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></produce>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="销售信息"
      v-if="visible3"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <sale @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></sale>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info, Sale, Produce } from './form'

export default {
  components: {
    TabsBar,
    List,
    Info,
    Sale,
    Produce
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
      this.visible3 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    }, handlerProduce(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    }, handlerSale(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
