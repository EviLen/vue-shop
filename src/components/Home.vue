<template>
  <el-container>
    <el-header>
      <div id="picture">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow ? '65px' : '200px'">
        <div
          style="height : 25px;
                    line-height : 25px;
                    text-align : center;
                    color : white;
                    background-color : rgb(74,80,100);
                    font-sixe : 12px;
                    letter-spacing : 0.1em;
                    user-select : none;
          "
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="menushow"
          :collapse-transition="false"
          :style="menushow?'width:65px;':'width:200px'"
          :unique-opened="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,i) in menuList" :key="item.id" >
            <template slot="title" >
              <i :class="'iconfont icon-'+menuIcon[i]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="item.id+'-'+item2.id"
              v-for="item2 in item.children"
              :key="item2.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //   创建生命周期函数
  created() {
    this.getMenuList()
  },
  data() {
    return {
      // 设定左侧栏收起，展开
      menushow: false,
      // 左侧栏数据
      menuList: [],
      //   icon图标
      menuIcon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    // 获得左侧功能数据按钮
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      // 获取失败的时候
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    },

    //   退出系统
    logout() {
      // 确认
      // token清除
      // 跳转到登录页面
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding: 0;
    padding-right: 20px;
    // 弹性布局
    display: flex;
    align-items: center;
    justify-content: space-between;
    #picture {
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    // overflow: hidden;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
