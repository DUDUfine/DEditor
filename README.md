# 百度富文本编辑器组件
 百度富文本编辑器组件

## 使用
### VUE 中的使用
```
<template>
  <div class="demo">
    <script id="editor" type="text/plain" style="width: 1024px; height: 500px"></script>
    <div id="btns">
      <div>
        <button @click="getAllHtml()">获得整个html的内容</button>
        <button  @click="getContentHtml()">获得内容html</button>
        <button  @click="getContent()">获得内容</button>
        <button  @click="setContent()">写入内容</button>
        <button  @click="setContent(true)">追加内容</button>
        <button  @click="getContentTxt()">获得纯文本</button>
        <button  @click="getPlainTxt()">获得带格式的纯文本</button>
        <button  @click="hasContent()">判断是否有内容</button>
        <button  @click="setFocus()">使编辑器获得焦点</button>
        <button @mousedown="isFocus(event)">编辑器是否获得焦点</button>
        <button @mousedown="setblur(event)">编辑器失去焦点</button>
      </div>
      <div>
        <button @click="getText()">获得当前选中的文本</button>
        <button @click="insertHtml()">插入给定的内容</button>
        <button id="enable" @click="setEnabled()">可以编辑</button>
        <button @click="setDisabled()">不可编辑</button>
        <button @click=" UE.getEditor('editor').setHide()">隐藏编辑器</button>
        <button @click=" UE.getEditor('editor').setShow()">显示编辑器</button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/index.js';// 在main文件中引入dcUEditor就不需要在这里引入了

export default {
  name: 'Ueditor',
  data() {
    return {
      ueditor: null
    }
  },
  mounted() {
    this.ueditor = window.UE.getEditor("editor", {
      // 七牛上传图片的接口
      qiniuUploadUrl: 'https://upload.qiniup.com',
      // 七牛上传token
      qiniuUpToken: 'MTCYw9bEsM_F3X3N3GPwf-eVl7WpTSNmVbM7vtCh:TmchVKaWAWRoEPzKw-cp8DtzsfM=:eyJzY29wZSI6InZwYW4iLCJkZWFkbGluZSI6MTYxMTc5Nzk3Mn0=',
      // 七牛图片存储域名
      qiniuUploadDomain: 'https://vpan.test.file.mediportal.com.cn',
      // 用户token，七牛图片的存储盘'/vpn/faq/qiniu/fetch'这个接口调用需要使用
      accessToken: '06f10680847d40bfb4a4db98bf08216b',
      // 图片转存七牛接口
      qiniuImgTransferUrl: 'http://test.mediportal.com.cn' + '/faq/qiniu/fetch', 
      //  上传七牛图片的存储盘
      qiniuBucket: 'vpan',
      //七牛图片url后面加上这个参数,解决ios webP图片格式的问题（这个参数保持不变）
      imgParams: '?imageMogr2/format/png',
      initialFrameWidth: 1100,
      initialFrameHeight: 400,
    });
  },
  methods: {
    // 获得整个富文本html的内容
    getAllHtml() {
      console.log(this.ueditor.getAllHtml());
      console.log(UE.getEditor("editor").getAllHtml());
    },

    // 获得富文本内容html
    getContentHtml(e) {
      console.log(UE.getEditor("editor").getHtml())
    },

    // 获得内容（一般要获取富文本中的内容就使用这个方法）
    getContent() {
      var arr = [];
      arr.push("使用editor.getContent()方法可以获得编辑器的内容");
      arr.push("内容为：");
      arr.push(UE.getEditor("editor").getContent());
      console.log(arr.join("\n"));
    },

    // 写入内容 isAppendTo=true时表示追加；isAppendTo=false时表示覆盖写入
    setContent(isAppendTo) {
      var arr = [];
      arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
      UE.getEditor("editor").setContent("欢迎使用ueditor", isAppendTo);
      console.log(arr.join("\n"));
    },

    // 获得纯文本
    getContentTxt() {
      var arr = [];
      arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
      arr.push("编辑器的纯文本内容为：");
      arr.push(UE.getEditor("editor").getContentTxt());
      alert(arr.join("\n"));
    },

    // 获得带格式的纯文本
    getPlainTxt() {
      var arr = [];
      arr.push(
          "使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容"
      );
      arr.push("内容为：");
      arr.push(UE.getEditor("editor").getPlainTxt());
      console.log(arr.join("\n"));
    },

    // 判断是否有内容
    hasContent() {
      var arr = [];
      arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
      arr.push("判断结果为：");
      arr.push(UE.getEditor("editor").hasContents());
      alert(arr.join("\n"));
    },

    // 使编辑器获得焦点
    setFocus() {
      UE.getEditor("editor").focus();
    },

    // 编辑器是否获得焦点
    isFocus(e) {
      alert(UE.getEditor("editor").isFocus());
      UE.dom.domUtils.preventDefault(e);
    },

    // 编辑器失去焦点
    setblur(e) {console.log(e);
      UE.getEditor("editor").blur();
      // UE.dom.domUtils.preventDefault(e);
    },

    // 获得当前选中的文本
    getText() {
      //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
      var range = UE.getEditor("editor").selection.getRange();
      range.select();
      var txt = UE.getEditor("editor").selection.getText();
      alert(txt);
    },

    // 插入给定的内容
    insertHtml() {
      var value = prompt("插入html代码", "");
      UE.getEditor("editor").execCommand("insertHtml", value);
    },
    
    // 可以编辑
    setEnabled() {
        UE.getEditor("editor").setEnabled();
        this.enableBtn();
    },

    // 不可编辑
    setDisabled() {
      UE.getEditor("editor").setDisabled("fullscreen");
      this.disableBtn("enable");
    },

    // 隐藏编辑器
    hide() {
      UE.getEditor('editor').setHide()
    },

    // 显示编辑器
    show() {
      UE.getEditor('editor').setShow()
    },

    //创建编辑器
    createEditor() {
      this.enableBtn();
      UE.getEditor("editor");
    },


    // 删除编辑器
    deleteEditor() {
        this.disableBtn();
        UE.getEditor("editor").destroy();
    },

    disableBtn(str) {
      var div = document.getElementById("btns");
      var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
      for (var i = 0, btn;
          (btn = btns[i++]);) {
          if (btn.id == str) {
              UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
          } else {
              btn.setAttribute("disabled", "true");
          }
      }
    },

    enableBtn() {
      var div = document.getElementById("btns");
      var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
      for (var i = 0, btn;
          (btn = btns[i++]);) {
          UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
      }
    }
  }
}
</script>
```


## 百度富文本接口
```
注意：接口需要等富文本节点完成初始化渲染后再调用，可以放在ready()事件中执行
  UE.getEditor('ueditor').ready(() => {
    console.log('插入代码insertHtml');
    UE.getEditor('ueditor').execCommand("insertHtml", _data.content.mainBody)
  })


获得整个富文本html的内容
UE.getEditor("editor").getAllHtml()

获得富文本内容html
UE.getEditor("editor").getHtml()

获得内容（推荐先）
UE.getEditor("editor").getContent()  

写入内容
UE.getEditor("editor").setContent("欢迎使用ueditor", false)

追加内容
UE.getEditor("editor").setContent("欢迎使用ueditor", true);

获得纯文本
UE.getEditor("editor").getContentTxt()

获得带格式的纯文本  
UE.getEditor("editor").getPlainTxt()


判断是否有内容
UE.getEditor("editor").hasContents()

使编辑器获得焦点
UE.getEditor("editor").focus();

编辑器是否获得焦点 
UE.getEditor("editor").isFocus()

编辑器失去焦点
 UE.getEditor("editor").blur();

获得当前选中的文本（当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容）
 var range = UE.getEditor("editor").selection.getRange();
            range.select();
            var txt = UE.getEditor("editor").selection.getText();
            alert(txt);

插入给定的内容 
UE.getEditor("editor").execCommand("insertHtml", value);

可以编辑
UE.getEditor("editor").setEnabled()

不可编辑
UE.getEditor("editor").setDisabled("fullscreen");

隐藏编辑器
UE.getEditor('editor').setHide()

显示编辑器
UE.getEditor('editor').setShow()

创建编辑器
UE.getEditor("editor");

删除编辑器
UE.getEditor("editor").destroy();
```


** 本组件使用Node version 14.15.0开发 **