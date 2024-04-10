<template>
  <div class="list-header">
    <div class="printClass">
      <div id="all" class="rowClass">
        <div class="myPrint">
          <div class="pageWarp" v-for="(item,index) in selections" :key="index">
            <template v-if="item.company==0">
              <!--<div class="scanImg" :id="'qrCode'+index"></div>-->
              <vue-qr class="scanImg" :text="'https://zs.dukevalve.com/duke/redirect/scanResult?qrCode=' + item.qrCode"
                      :margin="0" :logoScale="0.2" :logoSrc="require(`@/assets/img/logo.png`)"></vue-qr>
              <div
                style="width: 40mm;white-space: nowrap;text-align:center;font-size: .12rem;-webkit-transform-origin-x: 0;-webkit-transform: scale(0.80);">
                杜克阀门产品溯源信息
              </div>
            </template>
            <template v-else>
              <!--<div class="scanImg" :id="'qrCode'+index"></div>-->
              <vue-qr class="scanImg" :text="'https://zs.dukevalve.com/duke/redirect/scanResult?qrCode=' + item.qrCode"
                      :margin="0" :logoScale="0.2" :logoSrc="require(`@/assets/img/hrlogo.png`)"></vue-qr>
              <div
                style="width: 40mm;white-space: nowrap;text-align:center;font-size: .12rem;-webkit-transform-origin-x: 0;-webkit-transform: scale(0.80);">
                鸿仁产品溯源信息
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right;padding-bottom: 10px">
        <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                   :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
        </el-button>
        <el-button v-else :size="'mini'" type="primary" icon="el-icon-printer" v-print="'#all'">打印</el-button>
        <!--@click="printer"-->
        <!--<el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerProduce">生产录入</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerSale">销售录入</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="printer" v-print="'#all'">打印</el-button>-->
        <el-upload
          name="product"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept="xlsx,xls"
          ref="upload"
          :headers="headers"
          :show-file-list="false"
          :action="fileUrl"
          class="upload-demo"
          multiple
          :auto-upload="false"
          :on-change="handleUpload"
          :limit="1"
        >
          <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
          <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
        <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import QRCode from 'qrcodejs2'
import vueQr from 'vue-qr'
import { getToken } from '@/utils/auth'

export default {
  components: {
    vueQr
  },
  data() {
    return {
      btnList: [],
      headers: {
        'authorization': getToken('dkrx')
      },
      fileUrl: '',
      search: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  mounted() {
    /*this.fileUrl = `${window.location.origin}/duke/inputData/inputProductMessage`*/
    this.fileUrl = `${window.location.origin}/duke/inputData/input`
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })
  },
  methods: {
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      })
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if (res.flag) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('uploadList')
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    handleUpload(file, fileList) {
      if (file.status == 'ready') {
        this.submitUpload()
      }
    },
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
            that.creatQrCode('qrCode' + index, 'https://zs.dukevalve.com/duke/redirect/scanResult?qrCode=' + item.qrCode)
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
      if (this.selections.length > 0) {
        this.$confirm('是否删除，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idArray = []
          this.selections.forEach((item) => {
            idArray.push({id: item.id})
          })
          this.$emit('del', idArray)
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

  .scanImg {
    height: 23mm;
    width: 23mm;
    margin-left: 4.3mm;
  }

  .printClass {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .rowClass {
    heihgt: 30mm;
    width: 40mm;
  }

  .rowClass .pageWarp {
    width: 40mm;
    /*float: left;*/
    page-break-after: always;
    padding-left: 0.3mm;
  }

  .rowClass .pageWarp:nth-child(even) {
   /* padding-left: 8mm;  page-break-after: always;*/
  }

  .rowClass .myPrint {
    -webkit-print-color-adjust: exact;
  }

  .upload-demo {
    float: right;
  }
</style>
