<template>
  <wjh-grid
    ref="tableBox"
    class="table-scrollbar"
    :gridConfig="gridConfig"
    :getList="page"
    @getDataSuccess="getDataSuccess"
  >
    <template #vxeToolbarButtons>
      <wjh-btn @click="handleClick">普通按钮</wjh-btn>
      <wjh-btn icon="iconadd2x" @click="handleClick">图标按钮</wjh-btn>
      <wjh-btn text @click="handleClick">文本按钮</wjh-btn>
      <wjh-btn text type="success" @click="handleClick">更换按钮颜色</wjh-btn>
      <wjh-btn text icon="iconadd2x" @click="handleClick"></wjh-btn>
      <wjh-desc>提示信息</wjh-desc>
    </template>
    <template #vxeToolbarTools>
      <wjh-desc type="danger">这是右侧插槽</wjh-desc>
    </template>
    <template #vxeTitleBox>
      <wjh-desc type="danger">表格头部信息插槽</wjh-desc>
    </template>
    <template #footerBoxLeft>
      <wjh-desc>表格合计信息插槽</wjh-desc>
    </template>
    <template #footerHandleBox>
      <wjh-desc type="danger">表格尾部信息插槽</wjh-desc>
    </template>
  </wjh-grid>
</template>

<script setup lang="ts">
import { getOneDayStartAndEndTime, stringSplicing } from 'wjh-biz-common/utils'
import { WjhSlotParams, WjhGridConfig, Relations } from '#'
import { searchObj, optionsObj } from '@/utils/common'
import { page } from '@/api/demo'

const tableBox = ref()
const store = useStore()

const enums = $computed<Relations>(() => store.main.getEnums([
  'cus_status',
  'order_status',
  'order_source',
  'order_biz_type',
  'order_change_status',
  'order_confirm_status',
]))
async function getDataSuccess(data: any[]) {
  console.log('getDataSuccess', data)
}
function handleClick() {
  $message.success('点击按钮')
}
const gridConfig = computed((): WjhGridConfig => ({
  id: 'baseTable',
  loading: false,
  isCreated: true,
  pageData: {},
  // 搜索框的其它配置信息
  searchProps: { labelWidth: '100px' },
  searchConfig: [
    'order_no',
    optionsObj({
      taggingList: enums.cus_status, // 展示禁用的状态
      options: []
    }),
    {
      label: '送货日期',
      value: 'delivery_dates',
      type: 'date',
      default: getOneDayStartAndEndTime(),
      attrs: { type: 'daterange' }
    },
    { label: '商品', value: 'goods_keyword' },
    'name',
    'i_date',
    'amount',
    'percentage',
    'status',
    'audit_name',
  ],
  searchRules: {
    delivery_dates: [{ required: true, message: '请选择送货日期' }]
  },
  // 表单的的其它配置信息
  formProps: {
    mode: 'dialog',
    autoHeight: false,
    labelWidth: 70
  },
  formConfig: [
    searchObj({
      params: {
        status: 1 // 只展示已启用
      }
    }),
    {
      value: 'name',
      append: {
        text: '新增'
      }
    },
    {
      value: 'name',
      append: {
        text: '带图标的按钮',
        icon: 'iconadd2x'
      }
    },
    {
      value: 'name',
      append: {
        icon: 'iconadd2x'
      }
    },
    {
      value: 'name',
      append: {
        type: 'text',
        text: '输入提示信息'
      }
    },
    {
      value: 'name',
      append: {
        type: 'text',
        vHtml: item => `<b class="warning">value: ${item.value}</b>`
      }
    },
    'i_date',
    'amount',
    'amountZH',
    'percentage',
    'status',
    'audit_name',
  ],
  title: [
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
      minWidth: '120',
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
</script>
<script lang="ts">
export default {
  name: 'Base',
}
</script>

<style scoped lang="stylus"></style>
