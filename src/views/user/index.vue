<template>
  <div style="margin:20px">
    <el-row style=" text-align: right; margin-right:10px;">
      <el-button type="primary" round size="small" @click="handleAddUser">添加新用户</el-button>
    </el-row>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          class="el-menu-vertical-demo"
          :unique-opened="true"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu v-for="(item,index) in menuList" v-bind:key="index" :index="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.area.name}} ({{item.userInfos.length}})</span>
            </template>
            <el-menu-item v-for="(t,i) in item.childs" v-bind:key="i" :index="i">
              <i class="el-icon-menu"></i>
              <span slot="title">{{t.area.name}} ({{t.childs[0].userInfos.length}})</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-table :data="userList" style="width: 100%">
          <el-table-column prop="id" label="ID" width="120"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="role.desc" label="角色"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleResetPwd(scope.$index, scope.row)">重置密码</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 弹出 新增 修改用户信息 -->
    <el-dialog :title="type == 1 ? '新增用户':'编辑用户'" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="userInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="userInfo.userName"
            :disabled="type == 2 ? true : false"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" v-if="type == 1">
          <el-input v-model="userInfo.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="userInfo.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" :label-width="formLabelWidth">
          <el-cascader
            ref="myCascader"
            style="width:100%"
            v-model="address"
            :options="areaList"
            placeholder="请选择所在地区"
            :props="{ checkStrictly: true ,value :'id', label:'name', }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="userInfo.role.code" placeholder="请选择" style="width:100%">
            <el-option v-for="item in Roles" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出 重置密码 -->
    <el-dialog title="重置密码" :visible.sync="resetpwdDialogFormVisible" width="30%">
      <el-form :model="userInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="userInfo.userName"
            :disabled="type == 2 ? true : false"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="userInfo.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="userInfo.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetpwdDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSubAreaUser } from "@/api/user";

export default {
  data() {
    return {
      userid: -1,
      tableData: [],
      responseData: [],
      menuList: [],
      userList: [],
      index: 0,
      type: 0,
      formLabelWidth: "80px",
      dialogFormVisible: false,
      resetpwdDialogFormVisible: false,
      userInfo: {
        id: "",
        userName: "",
        passWord: "",
        nickName: "",
        phone: "",
        gender: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        areaId: "",
        role: [],
      },
      address: [],
      areaList: [],
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    this.areaList = JSON.parse(localStorage.getItem("areaList"));
    this.userid = user.id;
    console.log(this.Roles);
  },
  mounted() {
    this.getSubAreaUser();
  },
  methods: {
    onDialogSubmit() {
      let selected = this.$refs["myCascader"].getCheckedNodes()[0].path;
      if (this.type == 1) {
        // 新增
      } else {
        // 编辑
      }

      this.dialogFormVisible = false;
    },

    handleAddUser() {
      this.userInfo = [];
      this.address = [];
      this.type = 1;
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.userInfo = row;
      let addr = [];

      if (row.provinceId != 0) {
        addr.push(row.provinceId);
        if (row.cityId != 0) {
          addr.push(row.cityId);
          if (row.districtId != 0) {
            addr.push(row.districtId);
            if (row.areaId != 0) {
              addr.push(row.areaId);
            }
          }
        }
      }
      this.address = addr;
      this.type = 2;
      this.dialogFormVisible = true;
    },
    handleResetPwd(index, row) {
      console.log(index, row);
      this.resetpwdDialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelect(key, keyPath) {
      if (keyPath.length == 1) {
        const district = 0;
        const town = keyPath[0];
        this.userList = this.menuList[district].childs[
          town
        ].childs[0].userInfos;
      } else {
        const district = keyPath[0];
        const town = keyPath[1];
        this.userList = this.menuList[district].childs[
          town
        ].childs[0].userInfos;
      }
    },
    handleOpen(key, keyPath) {
      this.index = keyPath[0];
      this.getUserList();
    },
    getUserList() {
      this.userList = this.menuList[this.index].userInfos;
    },
    handleClose(key, keyPath) {
      this.index = keyPath[0];
      this.getUserList();
    },
    getSubAreaUser() {
      getSubAreaUser(this.userid).then((res) => {
        this.responseData = res.result;
        for (var i = 0; i < res.result.length; i++) {
          console.log(res.result[i]);
          this.tableData.push(res.result[i].area);
          this.menuList = res.result;
        }
        this.getUserList();
      });
    },
    load(tree, treeNode, resolve) {},
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.el-input_inner {
  width: 100%;
}
</style>

