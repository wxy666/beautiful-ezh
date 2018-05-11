<template>
	<transition name="slideX">
  <div>
    <h5 class="content-header"> </h5>
    <div class="image-list">
      <div style="text-align:center" ref="divGenres" class="list-default-img" v-show="isPhoto" @click.stop="addPic">
        <img src="static/test/upload.png" />
        <br>
        <span>请选择或者拍照上传照片</span>
        <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="onFileChange" capture="camera" style="display: none;">
      </div>
      <ul class="list-ul" v-show="!isPhoto">
        <li class="list-li " v-for="(iu, index) in imgUrls">
          <a class="list-link" @click='previewImage(iu)'>
            <img :src="iu">
          </a>
          <span class="list-img-close" @click='delImage(index)'></span>
        </li>
        <li class="list-li">
          <span class="add-img" @click.stop="addPic"> </span>
        </li>
      </ul>
    </div>
    <div class="add-preview" v-show="isPreview" @click="closePreview">
      <img :src="previewImg">
    </div>
    <div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>
  </div>
  </transition>
</template>
<script>
  import lrz from "lrz"

  export default {
    data: function () {
      return {
        show: false,
        imgUrls: [],
        urlArr: [],
        isPhoto: true,
        btnTitle: '',
        isModify: false,
        previewImg: '',
        isPreview: false
      }
    },
    watch: {
      imgUrls: 'toggleAddPic'
    },
    methods: {
      toggleAddPic: function () {
        let vm = this;
        if (vm.imgUrls.length >= 1) {
          vm.isPhoto = false;
        } else {
          vm.isPhoto = true;
        }
      },
      addPic: function (e) {
        let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
        els[0].click()
        return false
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files, e);
      },
      createImage: function (file, e) {
        let vm = this;
        lrz(file[0], {
          width: 480
        }).then(function (rst) {
          vm.imgUrls.push(rst.base64);
          return rst;
        }).always(function () {
          // 清空文件上传控件的值
          e.target.value = null;
        });
      },
      delImage: function (index) {
        let vm = this;
        vm.$vux.confirm.show({
          title: '确定删除该图片?',
          onConfirm() {
            vm.imgUrls.splice(index, 1);
          }
        })

      },
      previewImage: function (url) {
        let vm = this;
        vm.isPreview = true;
        vm.previewImg = url;
      },
      closePreview: function () {
        let vm = this;
        vm.isPreview = false;
        vm.previewImg = "";
      },
      saveImage: function () {
        let vm = this;
        let urlArr = [],
          imgUrls = this.imgUrls;

        for (let i = 0; i < imgUrls.length; i++) {
          if (imgUrls[i].indexOf('file') == -1) {
            urlArr.push(imgUrls[i].split(',')[1]);
          } else {
            urlArr.push(imgUrls[i]);
          }
        }

        //数据传输操作
      }
    }
  }
</script>
<style>
  /* ul li以横排显示 */

  /* 所有class为menu的div中的ul样式 */

  .list-ul {
    list-style: none;
    /* 去掉ul前面的符号 */
    margin: 0px;
    /* 与外界元素的距离为0 */
    padding: 0px;
    /* 与内部元素的距离为0 */
    width: auto;
    /* 宽度根据元素内容调整 */
  }

  /* 所有class为menu的div中的ul中的li样式 */

  .list-li {
    float: left;
    /* 向左漂移，将竖排变为横排 */
    padding: 8px;
    /* 与内部元素的距离为0 */
    display: inline-block;
    position: relative;
    text-align: center;
  }

  .list-link img {
    width: 100px;
    height: 100px;
  }

  /* 所有class为menu的div中的ul中的a样式(包括尚未点击的和点击过的样式) */

  .list-link a:visited {
    background-color: #465c71;
    /* 背景色 */
    border: 1px #4e667d solid;
    /* 边框 */
    color: #dde4ec;
    /* 文字颜色 */
    display: flex;
    /* 此元素将显示为块级元素，此元素前后会带有换行符 */
    line-height: 1.35em;
    /* 行高 */
    padding: 4px 20px;
    /* 内部填充的距离 */
    text-decoration: none;
    /* 不显示超链接下划线 */
    white-space: nowrap;
    /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
    overflow: hidden;
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */

  .list-link a:hover {
    background-color: #bfcbd6;
    /* 背景色 */
    color: #465c71;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */

  .list-link a:active {
    background-color: #465c71;
    /* 背景色 */
    color: #cfdbe6;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  .list-img-close {
    background: #ffffff url(../../../static/test/del.png) no-repeat right top;
    border-color: #ff4a00;
    background-position: center;
    background-size: 35px 35px;
    display: block;
    float: left;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 5%;
    left: 71%;
    margin-top: 0px;
    margin-left: 0px;
    padding: 8px;
    z-index: 10;
    border-radius: 5px;
    text-align: center;
  }

  .add-img {
    display: block;
    background-image: url('../../../static/test/upload.png');
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: 100px 100px;
  }
</style>
