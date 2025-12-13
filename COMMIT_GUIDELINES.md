# Git Commit 提交信息规范

本项目遵循清晰、规范的 commit message 格式，以便更好地追踪项目历史和生成变更日志。

## 基本格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type 类型

- **feat**: 新功能（feature）
- **fix**: 修复 bug
- **docs**: 文档变更
- **style**: 代码格式调整（不影响代码运行的变动，如空格、格式化等）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 性能优化
- **test**: 增加或修改测试
- **chore**: 构建过程或辅助工具的变动（如依赖更新、配置修改）
- **revert**: 回退之前的 commit

## Scope 范围（可选）

指明本次提交影响的范围，例如：
- **backend**: 后端相关
- **frontend**: 前端相关
- **api**: API 接口
- **db**: 数据库
- **ui**: 用户界面
- **component**: 特定组件

## Subject 主题

- 使用中文或英文简洁描述本次提交的内容
- 不超过 50 个字符
- 首字母小写，结尾不加句号
- 使用祈使句，如"添加"而不是"添加了"

## Body 正文（可选）

- 详细说明本次提交的动机和具体改动
- 可以分多行
- 每行不超过 72 个字符

## Footer 页脚（可选）

- 关联的 Issue 编号：`Closes #123` 或 `Fixes #456`
- 不兼容变动：以 `BREAKING CHANGE:` 开头

## 提交信息示例

### 简单示例
```
feat(backend): 添加喂养记录导出功能
```

### 完整示例
```
feat(api): 添加喂养记录按周统计接口

实现按周查询喂养记录统计功能，支持：
- 统计指定周的喂养次数
- 计算每日平均喂养量
- 生成周报表数据

Closes #45
```

### 修复 bug 示例
```
fix(frontend): 修复日期选择器时区显示错误

修复在不同时区下日期选择器显示错误的问题，
现在所有日期都使用本地时区显示。

Fixes #78
```

### 文档更新示例
```
docs: 更新 API 接口文档

补充喂养汇总接口的参数说明和返回值示例
```

### 重构示例
```
refactor(backend): 优化喂养记录查询性能

- 添加数据库索引
- 使用缓存减少数据库查询
- 优化 SQL 查询语句
```

## 注意事项

1. 每次提交应该只做一件事，保持提交的原子性
2. 提交信息要准确描述改动内容，避免使用模糊的描述
3. 重大变更必须在提交信息中明确说明
4. 关联相关的 Issue 编号
5. 提交前确保代码已通过测试和代码检查

## 参考资料

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
