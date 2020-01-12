<template>
  <div class="publish">
    <!-- 发表新攻略 -->
    <div class="main_title">发表新攻略</div>
    <p class="place">分享你的个人游记，让更多人看到哦！</p>
    <input placeholder="请输入标题" type="text" class="title" v-model="data.title" />
    <VueEditor :config="config" class="VueEditor" ref="VueEditor" />
    <div>
      选择城市&nbsp;&nbsp;&nbsp;
      <input type="text" class="select" v-model="data.city" />
    </div>
    <!-- 发布 保存到草稿-->
    <div class="blo">
      <el-button type="primary" @click="handleblo">发布</el-button>
      <div>
        或者
        <a href="#" class="baocun" style="display: inline-block;" @click="handlebaocun">保存到草稿</a>
      </div>
    </div>

    <Draft class="Draft" @fashe="fashe" />
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";

import Draft from "@/components/post/travel/draft";

export default {
  name: "app",

  data() {
    return {
      data: {
        title: "",
        city: "",
        content: ""
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://localhost:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  methods: {
    // 发射保存
    fashe(item) {
      this.data.title = item.title;
      this.data.city = item.cityName;
      this.$refs.VueEditor.editor.root.innerHTML = item.content = item.content;
    },

    // 保存到草稿
    handlebaocun() {
      this.$store.commit("post/setData", {
        title: this.data.title,
        cityName: this.data.city,
        content: this.$refs.VueEditor.editor.root.innerHTML
      });
      this.$message.success("添加草稿成功");
    },

    // 点击发布触发
    handleblo() {
      let { title, city } = this.data;
      this.$axios({
        url: "/posts",
        method: "post",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          title,
          city,
          content: this.$refs.VueEditor.editor.root.innerHTML
        }
      }).then(res => {
        console.log(res);
        if (res.data.message === "新增成功") {
          this.$message.success("发表成功~");
          // 跳转页面
          this.$router.push("/post");
        }
      });
    }
  },
  components: {
    VueEditor,

    Draft
  }
};
</script>

<style lang="less">
.publish {
  position: relative;
  .Draft {
    position: absolute;
    right: -380px;
    top: 58px;
  }
  .VueEditor {
    img {
      width: 100px;
      height: 100px;
      display: inline-block;
    }
  }
  .main_title {
    font-size: 24px;
  }
  .place {
    margin: 10px 0;
    font-size: 13px;
    color: #ccc;
  }
  .title {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin: 10px 0;
  }
  .select {
    width: 40%;
    height: 40px;
    padding: 0 10px;
    margin: 20px 0;
  }
  .ql-container {
    height: 400px;
  }
  .blo {
    display: flex;
    .baocun {
      margin-top: 10px;
      font-size: 13px;
      color: orange;
    }
  }
}
</style>