<template>
  <div class="comment">
    <el-form ref="postForm" :model="postForm">
      <el-form-item>
        <el-input type="textarea" :rows="2" :placeholder="placeholder" v-model="postForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 图片上传 + 按钮 -->
        <div class="clearfix">
          <div class="fl upload">
            <!-- 图片上传 -->
            <el-upload
              action="http://127.0.0.1:1337/upload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              name="files"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div class="fr button">
            <!-- -->
            <el-button type="primary" @click="putIn">提交</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <!-- 评论 -->
    <div class="essaycomment">
      <div class="reviews" v-for="(item, index) in postList" :key="index">
        <div class="title">
          <el-row>
            <el-col :span="1">
              <img
                class="headPortrait"
                :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`"
                alt
              />
            </el-col>
            <el-col :span="2">
              <span class="nickname">{{item.account.nickname}}</span>
            </el-col>
            <el-col :span="4">
              <span class="time">{{time|timeformat}}</span>
            </el-col>
            <el-col :span="4" class="fr">
              <div class="reply" @click="replayComment(item)">回复</div>
            </el-col>
          </el-row>
        </div>
        <div class="content">
          <div>{{item.content}}</div>
          <div v-for="(item1, index1) in item.pics" :key="index1">
            <div v-if="item1.pics===[]"></div>
            <div v-else-if="item1.pics!==[]" class="contentImg">
              <img :src="`${$axios.defaults.baseURL + item1.url}`" alt />
            </div>
          </div>
          <!-- <commentreviews /> -->
          <commentreviews
            v-if="item.parent"
            :item="item.parent"
            @replayComment="replayComment(item)"
          ></commentreviews>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { timeformat } from "@/assets/zq_filters.js";
import commentreviews from "@/components/post/details/commentreviews";
export default {
  filters: {
    timeformat
  },
  components: {
    commentreviews
  },
  data() {
    return {
      postForm: {
        content: "",
        pics: [],
        post: "",
        follow: ""
      },
      placeholder: "",
      followId: "",
      dataItem: [],
      dialogImageUrl: "",
      dialogVisible: false,
      time: new Date(),
      pageIndex: 1, // 当前页数
      pageSize: 5, // 当前页面的条数
      total: 0 // 总条数
    };
  },
  methods: {
    replayComment(item) {
      console.log(item);
      this.followId = item.follow.id || 1;
      this.placeholder = "@" + item.account.nickname;
      const { id } = this.$route.query;
      this.postForm.post = id;
    },
    // 每页页显示几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    // 当前页显示几条
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    // 提交
    putIn() {
      this.postForm.follow = this.followId;
      const { id } = this.$route.query;
      this.postForm.post = id - 0;
      console.log(id);
      this.$axios({
        url: "/comments",
        method: "post",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: this.postForm
      }).then(res => {
        this.$message.success = res.data.message;
        this.init();
      });
    },
    // 上传成功
    handleAvatarSuccess(response) {
      console.log(response);
      this.postForm.pics.push(response[0].id);
    },
    // 移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 封装发请求
    init() {
      const { id } = +this.$route.query;
      this.$axios({
        url: "/posts/comments",
        params: {
          post: id
        }
      }).then(res => {
        console.log(res);
        const { data, total } = res.data;
        this.dataItem = data;
        this.total = total;
      });
    }
  },
  computed: {
    postList() {
      if (this.dataItem.length > 0) {
        let postsData = this.dataItem.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageSize * this.pageIndex
        );
        return postsData;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
.comment {
  .essaycomment {
    .reviews {
      width: 100%;
      border: 1px solid #ccc;

      .title {
        margin: 10px;

        .reply {
          font-size: 14px;
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: pointer;
        }

        .headPortrait {
          width: 20px;
          height: 20px;
        }

        .nickname {
          font-size: 14px;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .time {
          color: #ccc;
          font-size: 13px;
        }
      }

      .content {
        position: relative;
        margin: 10px 20px;

        .imgSrc {
          width: 100px;
          height: 100px;
        }
        .contentImg {
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  /deep/textarea {
    resize: none !important;
    outline: none !important;
    margin: 10px 0;
  }

  .el-upload-list__item-actions {
    width: 100px;
    height: 100px;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }

  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .el-form-item__content {
    margin: 0 !important;
  }
}
</style>