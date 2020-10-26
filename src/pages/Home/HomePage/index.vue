<template>
  <div class="home-page">
    <!-- <h1>管理首页</h1> -->
    <el-table :data="history" border style="width: 100%">
      <el-table-column
        prop="username"
        label="登录账户"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastLogin.ip"
        label="上次登录ip"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastLogin.loginTime"
        label="上次登录时间"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="nowLogin.ip" label="本次登录ip" align="center">
      </el-table-column>
      <el-table-column
        prop="nowLogin.loginTime"
        label="本次登录时间"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  data() {
    return {
      history: []
    };
  },
  methods: {
    send() {
      getLoginLog(this).then(res => {
        // console.log(res.data.data);
        this.history = res.data.data;
      });
    },
    duan() {
      // console.log( this.cancel)
      if (typeof this.cancel === "function") {
        this.cancel();
      }
    }
  },
  beforeMount() {
    this.send();
  },
  mounted() {}
};
</script>
<style scoped></style>
