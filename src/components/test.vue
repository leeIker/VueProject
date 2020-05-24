<template>
    <el-container>
        <el-header height="90px">
            <div>
                <img src="../assets/mulan.png" alt="">
                <span>李鹤的header</span>
            </div>
            <el-button type="info">logout</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu background-color="#DCDFE6" router
                unique-opened active-text-color="#409EFF"
                :default-active="activePath">
                    <el-submenu index="one">
                         <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>查看用户</span>
                         </template>
                       <el-menu-item index="blog" @click="savePath('blog')">
                            <template slot="title">
                                <i class="el-icon-s-shop"></i>
                                <span>博客内容</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="tree">
                            <template slot="title">
                                <i class="el-icon-s-shop"></i>
                                <span>用户权限</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                     <el-submenu index="two">
                         <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>查看用户</span>
                         </template>
                       <el-menu-item index="nothing">
                            <template slot="title">
                                <i class="el-icon-s-shop"></i>
                                <span>用户列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="case">
                            <template slot="title">
                                <i class="el-icon-s-shop"></i>
                                <span>用户权限</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      activePath: 'blog'
    }
  },
  methods: {
    savePath (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>
<style lang="less" scoped>
.el-header{
    background-color:#DCDFE6 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
    }

}
.el-menu{
    height: 100%;
}
.el-container{
    height: 100%;
}

</style>
