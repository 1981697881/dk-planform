<template>
  <div class="list-header">
    <div class="printClass">
      <div  id="all" class="rowClass">
        <div class="myPrint">
          <div class="pageWarp" v-for="(item,index) in selections" :key="index">
            <div class="scanImg" :id="'qrCode'+index"></div>
            <div style="padding: 5px;text-align: center;">查询产品信息</div>
          </div>
        </div>
      </div>
    </div>
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right;padding-bottom: 10px">
         <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
        <!--<el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerProduce">生产录入</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerSale">销售录入</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="printer" v-print="'#all'">打印</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import QRCode from 'qrcodejs2'

export default {
  data() {
    return {
      btnList: [],
      search: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    creatQrCode(element, val) {
      var deleteNode = document.getElementById(element).innerText = ''
      var qrcode = new QRCode(element, {
        text: val, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
      return obj
    },
    onFun(method) {
      this[method]()
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    printer() {
      let that = this
      if (this.selections.length > 0) {
        this.$nextTick(() => {
          this.selections.forEach((item, index) => {
            that.creatQrCode('qrCode' + index, 'https://cfzx.gzfzdev.com/groupTicket?qrCode=' + item.qrCode)
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    del() {
      if (this.clickData.id) {
        this.$confirm('是否删除(' + this.clickData.productName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', { id: this.clickData.id })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerProduce() {
      if (this.clickData.id) {
        this.$emit('showProduce', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerSale() {
      if (this.clickData.id) {
        this.$emit('showSale', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    }

  }
}
</script>

<style>
  @media print {
    @page {
      size: auto;
      margin: 3mm;
    }
  }

  .scanImg img {
    margin: 0 auto;
  }

  .printClass {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .rowClass {
    heihgt: 30mm;
    width: 35mm;
  }
  .rowClass .pageWarp {
    page-break-after: always;
  }

  .rowClass .myPrint {
    -webkit-print-color-adjust: exact;
  }

</style>
