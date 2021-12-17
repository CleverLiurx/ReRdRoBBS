## TODO LIST

- 首页基本布局 ✅
- 文章列表 ✅
- 快速发布 ✅
- 完整发布
- 主题色统一变量管理
- API 统一管理
- 评论功能以及评论框 style
- 热榜
- 匿名

## commit 规范

commit 规范遵循[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
例如

```bash
git commit -m "fix: some messag"
```

合法的`type`有

```
[
  'feat',       #增加新功能(常用)
  'fix',        #修复bug(常用)
  'chore',      #不修改src或者test的其余修改，例如构建过程或辅助工具的变动
  'build',      #构造工具的或者外部依赖的改动，例如webpack，npm
  'ci',         #与CI（持续集成服务）有关的改动
  'docs',       #只改动了文档相关的内容
  'perf',       #提高性能的改动
  'refactor',   #代码重构时使用
  'revert',     #执行git revert打印的message
  'style',      #不影响代码含义的改动，例如去掉空格、改变缩进、增删分号、CSS
  'test'        #添加测试或者修改现有测试
];
```
