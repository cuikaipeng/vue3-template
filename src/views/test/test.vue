<template>
  <div class="common_container">
    <div class="common_container_search_header">
      <a-input v-model:value="searchForm.questionContent" placeholder="内容" style="width: calc(100% - 170px)" />
      <a-button type="primary" @click="getData" class="marginleft10">查询</a-button>
      <a-button type="primary" @click="getData" class="marginleft10">添加</a-button>
    </div>
    <a-table 
      :row-key="record => record.id" 
      :columns="columns" 
      :data-source="dataSource" 
      :pagination="pagination"
      :loading="tableLoading" 
      @change="handleTableChange"
      :scroll="{ y: tableHeight }"
    >
      <template #questionType="{ record }">
        <a-tag v-if="record.questionType == 'vip'" color="orange">会员问答</a-tag>
        <a-tag v-else color="green">常见问答</a-tag>
      </template>
      <template #action="{ record }">
        <a-button type="primary" size="small" @click="modifyBtn(record)">修改</a-button>
        <a-button type="danger" size="small" @click="deleteBtn(record)" class="marginleft10">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import{ defineComponent, reactive, ref, toRefs, onMounted, getCurrentInstance }from 'vue';
import api from "@/api/api-test";
export default defineComponent({
  name: "user",
  setup() {
    const { ctx } = (getCurrentInstance() as any);// 取全局注册的变量
    //定义表格高度
    const tableHeight = ctx.$tableUtils.getTableHeight();
    //定义表格展示列
    const columns = [
      {
        title: '问题',
        dataIndex: 'questionContent',
        key: 'questionContent',
      },
      {
        title: '类型',
        dataIndex: 'questionType',
        key: 'questionType',
        width: 100,
        slots: { customRender: 'questionType' },
      },
      {
        title: '操作',
        key: 'action',
        width: 160,
        slots: { customRender: 'action' },
      }
    ];
    //定义表格数据
    const dataSource = ref(null);
    //定义表格loading
    const tableLoading = ref(false);
    //定义获取数据的查询条件
    const searchForm = reactive({
      questionContent: '',
      questionType: ''
    });
    //定义表格分页
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 5, //ctx.$tableUtils.tableSize()
      showTotal: (total: number)=>{
          return "共" + total + "条";
      }
    });
    //请求数据
    function getData() {
      tableLoading.value = true;
      api.getData(pagination.current, pagination.pageSize, searchForm.questionContent, searchForm.questionType,
        (resp: { data: { totalElements: number; content: any; }; }) => {
          tableLoading.value = false;
          pagination.total = resp.data.totalElements;
          dataSource.value = resp.data.content;
        },
        (error: any) => {
          tableLoading.value = false;
          console.log(error);
        }
      );
    }
    // const { data } = await search(pagination.current, pagination.pageSize, searchForm.questionContent, searchForm.questionType);
    // console.log(data);
    //console.log(list);
    //翻译操作
    function handleTableChange(pag: any) {
      pagination.current = pag.current;
      getData();
    }
    //修改
    function modifyBtn() {
     alert(); 
    }
    //删除
    function deleteBtn() {
      alert();
    }
    getData();
    return {
      tableHeight,
      columns,
      tableLoading,
      dataSource,
      searchForm,
      pagination,
      getData,
      handleTableChange,
      modifyBtn,
      deleteBtn
    }
  }
})
</script>
<style scoped>

</style>