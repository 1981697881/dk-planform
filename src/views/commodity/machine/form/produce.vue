<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品名称'" prop="productName">
            <el-input v-model="form.productName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品内码'" prop="productInnerCode">
            <el-input v-model="form.productInnerCode" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'材料分类'" prop="materialClassification">
            <el-input v-model="form.materialClassification" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'形式'" prop="modality">
            <el-input v-model="form.modality" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'铭牌号'" prop="nameplateNo">
            <el-input v-model="form.nameplateNo" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'订单时间'" prop="orderDate">
            <el-input v-model="form.orderDate" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产订单号'" prop="orderNumber">
            <el-input v-model="form.orderNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'规格'" prop="specifications">
            <el-input v-model="form.specifications" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'品种'" prop="varieties">
            <el-input v-model="form.varieties" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'表面处理'" prop="surfaceTreatment">
            <el-input v-model="form.surfaceTreatment" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品压力'" prop="productPressure">
            <el-input v-model="form.productPressure"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'质检工'" prop="qualityTestingWork">
            <el-input v-model="form.qualityTestingWork"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'配托工'" prop="supportingWork">
            <el-input v-model="form.supportingWork"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'打压工'" prop="suppressWork">
            <el-input v-model="form.suppressWork"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import { insertProductionMessage } from '@/api/commodity/index'

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
        productPressure: null,
        qualityTestingWork: null,
        supportingWork: null,
        suppressWork: null
      },
      rules: {
        productPressure: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        qualityTestingWork: [
          { required: true, message: '请输入', trigger: 'blur' }
        ], supportingWork: [
          { required: true, message: '请输入', trigger: 'blur' }
        ], suppressWork: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
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
          insertProductionMessage(this.form).then(res => {
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
