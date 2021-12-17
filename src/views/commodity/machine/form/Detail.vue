<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品名称'" prop="productName">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品内码'" prop="productInnerCode">
            <el-input v-model="form.productInnerCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'材料分类'" prop="materialClassification">
            <el-input v-model="form.materialClassification"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'形式'" prop="modality">
            <el-input v-model="form.modality"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'铭牌号'" prop="nameplateNo">
            <el-input v-model="form.nameplateNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'订单时间'" prop="orderDate">
            <el-date-picker
              v-model="form.orderDate"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产订单号'" prop="orderNumber">
            <el-input v-model="form.orderNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'规格'" prop="specifications">
            <el-input v-model="form.specifications"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'品种'" prop="varieties">
            <el-input v-model="form.varieties"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'表面处理'" prop="surfaceTreatment">
            <el-input v-model="form.surfaceTreatment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import { addCommodity } from '@/api/commodity/index'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        materialClassification: null,
        modality: null,
        orderDate: null,
        orderNumber: null,
        productInnerCode: null,
        productName: null,
        specifications: null,
        surfaceTreatment: null,
        varieties: null,
        nameplateNo: null
      },
      rules: {
        productName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        productInnerCode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addCommodity(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
