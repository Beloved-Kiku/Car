<template>
  <div>
    <el-menu
      style="width: 209px; height: 80px"
      class="el-menu-vertical-demo"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#ffffff"
    >
      <el-menu-item style="height: 100%">
        <el-image
          :src="USER_INFO_LIST.user_pic"
          style="width: 60px; height: 60px; border-radius: 50%"
        ></el-image>
        <span slot="title" style="line-height: 80px">{{
          USER_INFO_LIST.username || "admin"
        }}</span>
      </el-menu-item>
    </el-menu>
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!---此处数据需从后台接口渲染 使用template 不会生成真实DOM
        渲染时候需要根据条件判断是否需要渲染
        template是生成虚拟DOM :key不被允许加在它身上
        ---->
      <template v-for="(item, index) in HOME_LEFT_LIST">
        <el-menu-item
          :index="item.indexPath"
          v-if="item.children === null"
          :key="item.indexPath"
        >
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-submenu :index="item.indexPath" v-else :key="index">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="child.indexPath"
              class="el-icon-menu"
              v-for="(child, index) in item.children"
              :key="index"
            >
              <i :class="child.icon"></i>
              <span>{{ child.title }}</span></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      property: "value",
    };
  },
  created() {
    //获取左侧列表数据
    this.getLeftList();
  },
  //映射Vuex数据
  computed: {
    //简化 首页左侧列表信息
    ...mapState(["HOME_LEFT_LIST"]),
    ...mapState(["USER_INFO_LIST"]),
  },
  methods: {
    //获取左侧列表数据
    getLeftList() {
      this.$store.dispatch("getLeftList");
    }, 
  },
};
</script>

<style>
</style>