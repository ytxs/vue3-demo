<template>
  <wjh-horizontal>
    <template #header>
      <wjh-custom-form :formData="detailForm"></wjh-custom-form>
    </template>
    <template #left>
      <div p-16px>
        <wjh-custom-form ref="customerFormRef" labelLine rowSpacing="16px" :formData="customerForm"></wjh-custom-form>
        <wjh-custom-form ref="goodsFormRef" labelLine rowSpacing="16px" :formData="goodsForm"></wjh-custom-form>
        <el-button w-full type="primary" @click="handleAddGoodsList">添加</el-button>
      </div>
    </template>

    <template #right>
      <wjh-vxe-table
        ref="xTable"
        :tableConfig="tableConfig"
        :data="tableData"
        @rowDropEnd="rowDropEnd"
      >
        <template #vxeToolbarButtons>
          <wjh-desc>注: 客户近一个月内有过</wjh-desc>
        </template>
        <template #footerHandleBox>
          <span text-red-600>商品总数：0</span>
          <span text-red-600>金额合计：￥111</span>
          <el-button
            :disabled="!tableData?.length"
            size="small"
            type="primary"
            @click="handleExcelOut"
          >导出</el-button>
        </template>
      </wjh-vxe-table>
    </template>
    <template #footer>页面底部插槽</template>
  </wjh-horizontal>
</template>

<script setup lang="ts">
import { stringSplicing, tabCloseTag } from 'wjh-biz-common/utils'
import { WjhTableConfig, WjhSlotParams, Relations, WjhFormConfig, Obj } from '#'
import { page } from '@/api/demo'

const store = useStore()
const enums = $computed<Relations>(() => store.main.getEnums([
  'cus_status',
]))

const detailForm = computed((): WjhFormConfig => ({
  readonly: true,
  commonSpan: 6,
  defaultFormValue: {
    ceshi1: 'ceshi1',
    ceshi2: 'ceshi2',
    ceshi3: 'ceshi3',
    ceshi4: 'ceshi4',
    ceshi5: 'ceshi5',
    ceshi6: 'ceshi6',
  },
  form: [
    { label: '测试数据1', value: 'ceshi1', placeholder: '输入测试数据1' },
    { label: '测试数据2', value: 'ceshi2', placeholder: '输入测试数据2' },
    { label: '测试数据3', value: 'ceshi3', placeholder: '输入测试数据3' },
    { label: '测试数据4', value: 'ceshi4', placeholder: '输入测试数据4' },
    { label: '测试数据5', value: 'ceshi5', placeholder: '输入测试数据5' },
    { label: '测试数据6', value: 'ceshi6', placeholder: '输入测试数据6' },
  ]
}))
const customerForm = computed((): WjhFormConfig => ({
  commonSpan: 24,
  form: [
    { noLabel: true, value: 'receive_name', placeholder: '输入收货人姓名', next: 'ceshi1' },
    { noLabel: true, value: 'ceshi1', placeholder: '输入测试数据1', next: 'ceshi2' },
    { noLabel: true, value: 'ceshi2', placeholder: '输入测试数据2', next: 'goods1' },
  ],
  collapse: {
    title: '折叠信息',
    form: [
      { noLabel: true, value: 'receive_name', placeholder: '输入收货人姓名', next: 'receive_phone' },
      { noLabel: true, value: 'receive_phone', placeholder: '输入联系电话', next: 'receive_address' },
      { noLabel: true, value: 'receive_address', placeholder: '输入收货地址，最多60字', next: 'note', attrs: { maxlength: 60, type: 'textarea' }},
      { noLabel: true, value: 'note', placeholder: '输入订单要求，最多60字', attrs: { maxlength: 60, type: 'input' }},
    ]
  },
  rules: {
    receive_name: [
      { required: false, message: '请输入收货人姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    receive_phone: [
      { required: false, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    receive_address: [
      { required: false, message: '请输入收货地址', trigger: 'blur' },
      { min: 0, max: 60, message: '长度在不超过60个字符', trigger: 'blur' }
    ],
    note: [
      { required: false, message: '请输入备注信息', trigger: 'blur' },
      { min: 0, max: 60, message: '长度在不超过60个字符', trigger: 'blur' }
    ],
  },
}))
const goodsForm = computed((): WjhFormConfig => ({
  commonSpan: 24,
  form: [
    { noLabel: true, value: 'goods1', placeholder: '输入测试数据1', next: 'goods2' },
    { noLabel: true, value: 'goods2', placeholder: '输入测试数据2', next: 'goods3' },
    { noLabel: true, value: 'goods3', placeholder: '输入测试数据2', next: 'goods4' },
    { noLabel: true, value: 'goods4', placeholder: '输入测试数据2', next: 'goods5' },
    { noLabel: true, value: 'goods5', placeholder: '输入测试数据2', next: 'goods6' },
    { noLabel: true, value: 'goods6', placeholder: '输入测试数据2', next: 'goods1' },
  ]
}))
let tableData = $ref<Obj[]>([])
onBeforeMount(async() => {
  tableData = page().rows
})
const tableConfig = computed((): WjhTableConfig => ({
  id: 'horizontalTable',
  loading: false,
  pageData: {},
  title: [
    { title: '拖拽', flag: 'drop', align: 'center', width: '50' },
    { title: '序号', type: 'seq', align: 'center', width: '50' },
    { title: '名称', field: 'name', minWidth: 100, isEdit: true, detailStatus: 'readonly' },
    { title: '别名', field: 'alias', click: ({ column }) => $message.success(`点击表格: ${column.title}`) },
    { title: '开票日期', field: 'i_date', width: 100, flag: 'date', attrs: { format: 'YYYY-MM-DD' }},
    { title: '金额', field: 'amount', flag: 'RMB' },
    { title: '大写金额', field: 'amountZH', flag: 'RMBZH' },
    { title: '百分比数据', field: 'percentage', flag: 'PCT' },
    // visible可以控制列默认隐藏，但是可以通过表格右上角列筛选工具显示
    { title: '默认隐藏', field: 'visible', visible: false },
    // hide可以控制列隐藏，无法通过表格右上角列筛选工具显示
    { title: '隐藏的列', field: 'hide', hide: item => true }, // 或者直接传布尔值
    {
      title: '订单状态',
      minWidth: '80',
      field: 'status',
      props: { type: 'select', options: enums.order_status },
      relation: {},
    },
    { title: '审核人', field: 'audit_name', minWidth: '100', formatter: ({ row: { audit_name, audit_no }}) => stringSplicing(audit_name, audit_no, ' | ') },
    {
      title: '操作',
      width: 140,
      fixed: 'right',
      flag: 'btns',
      btns: [
        {
          label: '详情',
          isLoadDetail: true,
          detailStatus: 'readonly'
        },
        {
          label: '修改',
          isLoadDetail: true
        },
        {
          label: '测试',
          async click({ row }: WjhSlotParams) {
            await $messageBox.confirm('123123132')
          },
        },
      ],
    },
  ],
}))
const xTable = ref()
function rowDropEnd({ fullData }: any) {
  console.log('拖拽结束', fullData)
  fullData.forEach(async(row: any, index: number) => {
    row.sort = index + 1
  })
  xTable.value.getTable().updateData()
}
const router = useRouter()
function handleAddGoodsList() {
  console.log('添加', router)
  tabCloseTag({ store, router })
}
function handleExcelOut() {
  console.log('添加')
}
</script>

<style scoped lang="stylus">
</style>
