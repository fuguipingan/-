<template>
  <div class="subMenu">
    <div v-for="item in sideMenu" :key="item.path">
      <!-- 子菜单 -->
      <el-submenu :index='item.path'
                  v-if="item.children&&item.children.length>0">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <sub-menu :sideMenu="item.children"></sub-menu>
        </el-menu-item-group>
      </el-submenu>
      <!-- 一级菜单       -->
      <el-menu-item :index="item.path"
                    @click="jump(item.name)"
                    v-else>
        <i :class="item.meta.icon"></i>
        <span slot="title"> {{item.meta.name}}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
  export default {
    name: "sub-menu",
    props: {
      sideMenu: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      jump(name) {
        this.$router.push({ name })
      }
    },
    mounted() {
      console.log(this.sideMenu);
    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
