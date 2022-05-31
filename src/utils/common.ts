import { FormItem, Obj, Option, Relation } from '#'
import { pageSearch } from '@/api/common'

const searchObj = ({ taggingList, params }: {
  taggingList?: Option[], params?: Obj
}): FormItem => ({
  label: '客户',
  value: 'customer_id',
  type: 'select',
  placeholder: '请输入客户名称、客户编码、送菜编号',
  optionProps: {
    label: ({ name, customer_name }) => `${name || customer_name}`,
    value: 'id',
    tagging: 'status'
  },
  taggingignore: [1],
  taggingOptions: taggingList || [],
  attrs: {
    remote: true,
    async remoteMethod(val: string) {
      const r = await pageSearch({ ...params, keyword: val })
      return r.rows
    }
  },
  default: null,
})

const optionsObj = ({ taggingList, options }: {
  taggingList?: Relation, options?: Obj[]
}): FormItem => ({
  label: '客户',
  value: 'customer_id',
  type: 'select',
  placeholder: '请输入客户名称、客户编码、送菜编号',
  options,
  optionProps: {
    label: ({ name, customer_name }) => `${name || customer_name}`,
    value: 'id',
    tagging: 'status'
  },
  taggingignore: [1],
  taggingOptions: taggingList || [],
  default: null,
})

export {
  searchObj,
  optionsObj
}

