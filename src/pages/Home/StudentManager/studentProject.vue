<template>
  <div class="studentProjext">
    <!-- <h1>学员项目管理</h1> -->
    <!-- 搜索框 -->
    <div class="search">
      <el-select
        v-model="searchValue"
         @change="searchTextChange"
         @blur="blurTextChange"
         clearable
        filterable
        remote
        reserve-keyword
        placeholder="请输入姓名,如果不更新,点击右侧搜索按钮"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in searchList"
          :key="item.sId"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="searchButton"
     
      ></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="addItem"
       :disabled="ButtonPermissionDisabled('add')"
        >添加项目</el-button
      >
      <el-dialog :title="dialogInfo.title" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像">
            <el-upload
              class="uploadAvatar"
              ref="uploadAvatar"
              action="http://chst.vip/students/uploadStuAvatar"
              list-type="picture-card"
              :on-success="uploadSuccess"
              :on-remove="removeAvatar"
              :limit="1"
              name="headimgurl"
              :multiple="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="项目地址" prop="productUrl">
            <el-input v-model="ruleForm.productUrl"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="ruleForm.class"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="degree">
            <el-input v-model="ruleForm.degree"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStuInfo">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <dialog v-show="dialogFlag"></dialog> -->
      <!-- <dialog></dialog> -->
    </div>
    <!-- 班级选择 -->
    <div class="ClassSelection">
      <span>选择班级：</span>
      <el-select v-model="classValue" placeholder="请选择"   @visible-change="classVisible"
      @change="classChange"
      >
    <el-option
      v-for="item in classOptions"
    
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
      </el-select>
    </div>
    <!-- 导出excel -->
    <div class="exportFile">
      <el-button class="iconfont icon-excel" @click="exportExcel">导出excel数据</el-button>
    </div>
    <!-- 表格 -->
    <div class="stu-table">
      <el-table
        v-loading="loading"
        :data="studentInfo"
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="avatarUrl"
          label="头像"
          width="180"
        >
          <template scope="scope">
            <!-- {{scope.row.avatarUrl}}
          {{scope.row}}
          {{scope.avatarUrl.headimgurl}} -->
            <!-- {{studentInfo.headimgurl}} -->
            <img :src="scope.row.headimgurl" width="100" alt="" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="class" label="班级">
        </el-table-column>
        <el-table-column align="center" prop="productUrl" label="项目">
        </el-table-column>
        <el-table-column align="center" prop="" label="操作">
          <template scope="scope">
            <el-button
              type="primary"
              icon="el-icon-view"
              @click="$router.push({ name: 'studentProfile' })"
              :disabled="ButtonPermissionDisabled('read')"
              >查看</el-button
            >
            <el-button type="primary" @click="editStu(scope.row)"
            :disabled="ButtonPermissionDisabled('edit')"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="primary" @click="deleteStuInfo(scope.row)"
            :disabled="ButtonPermissionDisabled('delete')"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination background
                     hide-on-single-page
                     layout="prev, pager, next"
                     @current-change="changePage"
                     :page-size="dataCount"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getStuList,
  addStuDetail,
  delStu,
  updateStu,
  searchStu,
  getClasses
} from "@/api/index.js";
import {mapState} from "vuex";
//引入导出文件的插件
import qee from "qf-export-excel"

export default {
  data() {
    return {
      buttonPermissions:"",
      params:{
        page:"",
        count:5,
        class:""
      },//请求数据page页码，count，class班级
      dataPage: '', // 页码
      dataCount: 5, // 每页展示的数量
      total: 0, // 总共的数据条数
      //班级选择
      classValue: [],
      classOptions: [],
      //搜索姓名选择
      searchOtions: [],
      searchValue: [],
      searchList: [],
      blurTextValue: "",

      dialogFlag: false,
      loading: true,
      input: "",
      studentInfo: [],//学员信息
      options: [],
      value: "",
      dialogInfo: {
        title: "增加学员信息",
        requestName: "addStuDetail",
        editSuccessMsg: "增加成功",
        editerrorMsg: "增加失败",
        fun: updateStu
      },
      _id: "",
      dialogTableVisible: false,
      dialogFormVisible: false, //添加，修改学员信息弹窗

      ruleForm: {
        name: "",
        productUrl: "",
        headimgurl: "",
        class: "",
        age: "",
        city: "",
        degree: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        productUrl: [
          { required: true, message: "请输入项目地址", trigger: "blur" }
        ],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        degree: [
          { required: true, message: "请输入请输入学历", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["userButtons"])
  },
  methods: {
    //分页器，点击页码触发的函数
    changePage(page){
console.log(page)
this.params.page= page;
this.updateStuTable(this.params.page)
// updateStuTable()
    },
    //导出excel
    exportExcel(){
      // console.log(1)
      //需要导出的文件tr>th
      let titleList = [
        {
          title: '头像',
          key: 'headimgurl'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '班级',
          key: 'class'
        },
        {
          title: '项目',
          key: 'productUrl'
        },
      ];
      let dataSource = this.studentInfo
    
      //titleList,dataSource,需要导出的文件,'学员数据':导出文件的描述
      qee(titleList, dataSource, '学员数据')
    },
    //下拉班级选择触发的事件
    classVisible(){
      // console.log(1)
      getClasses()
      .then(res=>{
        if(res.data.state){
            // console.log(res.data.data)
            this.classOptions = ["全部",...res.data.data];
            // console.log(res.data.data )
            // console.log(  this.classOptions )
            
        }
       
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //班级选择改变（选中）触发的事件
    classChange(){
      // console.log(this.classOptions )
      // console.log(this.classValue)
      if(this.classValue=="全部"){
this.params.class=""
      }else{
  this.params.class=this.classValue
      }
this.updateStuTable()
    },
    //搜索功能
    remoteMethod(query) {
      this.loading = true;
      this.blurTextValue = query;
      // console.log(query)
      searchStu(query)
        .then(res => {
          if (res.data.state) {
            // console.log(res.data);
            this.loading = false;
            this.searchList = res.data.data;
            // console.log(this.serachList );

            // this.studentInfo = res.data.data
          } else {
            this.$message.error("搜索错误");
          }
        })
        .catch(err => {
          this.$message.error("搜索错误");
        });
    },
    searchTextChange(searchText) {
      this.loading = true;
      console.log(searchText);
      searchStu(searchText)
        .then(res => {
          if (res.data.state) {
            // console.log(res.data);
            this.loading = false;
            this.studentInfo = res.data.data;
            // console.log(this.serachList );

            // this.studentInfo = res.data.data
          } else {
            this.$message.error("搜索错误");
          }
        })
        .catch(err => {
          this.$message.error("搜索错误");
        });
    },
    blurTextChange() {
      //失去焦点
      this.searchValue = this.blurTextValue;
    },
    //按钮搜索
    searchButton() {
      this.loading = true;
      // console.log( searchText)
      searchStu(this.blurTextValue)
        .then(res => {
          if (res.data.state) {
            // console.log(res.data);
            this.loading = false;
            this.studentInfo = res.data.data;
            // console.log(this.serachList );

            // this.studentInfo = res.data.data
          } else {
            this.$message.error("搜索错误");
          }
        })
        .catch(err => {
          this.$message.error("搜索错误");
        });
    },
    //添加项目
    //添加学员信息
    addItem() {
      // console.log("添加1");
      this.dialogInfo = {
        title: "增加学员信息",
        requestName: "addStuDetail",
        editSuccessMsg: "增加成功",
        editerrorMsg: "增加失败",
        fun: addStuDetail
      };
      this.ruleForm = {
        name: "",
        productUrl: "",
        headimgurl: "",
        class: "",
        age: "",
        city: "",
        degree: "",
        description: ""
      };
      this.dialogFormVisible = true;
      // console.log(this.dialogInfo.fun);
    },
    //添加学员信息，修改学员信息。发送请求
    addStuInfo() {
      this.dialogFormVisible = false;
      // console.log(this.ruleForm);
      // console.log(this.dialogInfo.fun);
      this.dialogInfo.fun(this.ruleForm).then(res => {
        // console.log(res);
        // console.log(res.data.state);
        // console.log(this.ruleForm);
        if (res.data.state) {
          this.ruleForm = {
            name: "",
            productUrl: "",
            headimgurl: "",
            class: "",
            age: "",
            city: "",
            degree: "",
            description: ""
          };
          this.$message({
            showClose: true,
            message: this.dialogInfo.editSuccessMsg,
            type: "warning"
          });
          this.updateStuTable();
        } else {
          this.$message({
            showClose: true,
            message: this.dialogInfo.editerrorMsg,
            type: "warning"
          });
          this.updateStuTable();
        }
        // if (this.ruleForm._id) {
        //   // console.log(1);
        //   delete this.ruleForm._id;
        // }
        this.$refs["uploadAvatar"].clearFiles(); //清空上传文件
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取学员信息
    updateStuTable() {

      getStuList(this.params)
        .then(res => {
          //    console.log(res.data.data)
          this.studentInfo = res.data.data;
           this.total = res.data.total // 对total分页总数进行更改
          // console.log(this.studentInfo);

          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除学员信息
    deleteStuInfo(row) {
      // console.log(row)
      if (row && row.sId) {
        // 让用户确认是否删除
        this.$confirm("此操作将永久删除该文件, 是否继续?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            // 用户确认删除
            // 调用删除请求
            delStu(row.sId)
              .then(res => {
                if (res.data && res.data.state) {
                  // 删除成功
                  this.$message.success("删除成功");
                  // console.log(row);
                  // console.log(res);
                  this.updateStuTable();
                } else {
                  this.$message.warning("删除失败");
                }
              })
              .catch(err => {
                this.$message.error("删除出错");
              });
          })
          .catch(() => {
            // 用户取消删除
            this.$message("已取消删除");
          });
      } else {
        // 没有row
        this.$message.error("没有传入row对象");
      }
    },
    //修改学员信息
    editStu(row) {
      // console.log("修改2");
      this.dialogInfo = {
        title: "修改学员信息",
        requestName: "updateStu",
        editSuccessMsg: "修改成功",
        editerrorMsg: "修改失败",
        fun: updateStu
      };
      this.ruleForm = { ...row }; //数据回显
      this.dialogFormVisible = true;
      // console.log(this.dialogInfo.fun);
    },
    //上传头像
    uploadSuccess(r) {
      // 上传成功 给stuForm添加一条 headimgurl的属性
      // console.log(r);
      this.ruleForm.headimgurl = r.headimgurl;
    },
    removeAvatar(r) {
      this.ruleForm.headimgurl = "";
    },
    //禁用按钮
    ButtonPermissionDisabled(name){
      return !this.userButtons.includes(name);
    },
  },
  mounted() {
    this.updateStuTable();
    this.buttonPermissions = this.userButtons;
  },
  components: {}
};
</script>