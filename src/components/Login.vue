<template>
  <div id="login-content">
    <!-- <h2>登录组件</h2> -->
    <div id="login-box">
      <div id="login-icon">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form ref="loginFromRef" :model="loginFrom" :rules="loginFromRules">
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginFrom.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetFrom">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      // 给表单设置校验规则
      loginFromRules: {
        username: [
          // 校验触发器trigger
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFromRef.validate(async valid => {
        // valid:true 校验成功 为false校验失败
        // console.log(valid)
        if (valid === true) {
          // 利用axios，把用户信息提交到api进行真实性校验
          const { data: res } = await this.$http.post('login', this.loginFrom)
          if (res.meta.status !== 200) {
            return this.$message.error('用户名或密码不存在')
          }
          // 通过sessionstorage记录token window.sessionstorage（名称，值）
          window.sessionStorage.setItem('token', res.data.token)
          console.log(res.data.token)
          // 进行路由跳转（重定向）
          this.$router.push('/')
        }
      })
    },
    resetFrom() {
      this.$refs.loginFromRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login-content {
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
  #login-box {
    width: 450px;
    height: 304px;
    border-radius: 4px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    #login-icon {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 20px;
    }
  }
}
</style>
