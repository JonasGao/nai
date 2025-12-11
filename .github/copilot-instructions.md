# NAI 项目开发文档

## 项目概述

NAI 是一个婴儿喂养记录管理系统，用于记录和追踪婴儿的喂养信息，包括母乳喂养、瓶喂、奶粉喂养以及排便记录等。系统采用前后端分离架构，提供 Web 应用和 PWA（渐进式 Web 应用）支持。

### 主要功能
- 喂养记录的增删改查
- 按日期查询喂养记录
- 喂养数据统计和汇总
- 最近喂养记录展示
- 支持多种喂养类型：母乳、瓶喂、奶粉、大小便记录

## 项目结构

```
nai/
├── backend/                    # 后端项目 (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jonas/tools/nai/
│   │   │   │   ├── NaiApplication.java           # Spring Boot 主应用类
│   │   │   │   ├── Controller.java               # REST API 控制器
│   │   │   │   ├── FeedingRecord.java            # 喂养记录实体类
│   │   │   │   ├── FeedingRecordRepo.java        # 喂养记录数据访问层
│   │   │   │   ├── FeedingRecordService.java     # 喂养记录业务逻辑层
│   │   │   │   ├── FeedingSummary.java           # 喂养汇总实体
│   │   │   │   ├── FeedingSummaryRepo.java       # 喂养汇总数据访问层
│   │   │   │   ├── Operation.java                # 喂养操作类型枚举
│   │   │   │   ├── AddFeedingRecord.java         # 添加喂养记录 DTO
│   │   │   │   ├── DaysFeedingRecord.java        # 按天喂养记录 DTO
│   │   │   │   ├── DaysFeedingRecordParams.java  # 查询参数 DTO
│   │   │   │   ├── EntityGroup.java              # 验证分组
│   │   │   │   ├── RecordDate.java               # 记录日期
│   │   │   │   └── RequestLoggingConfiguration.java  # 请求日志配置
│   │   │   ├── resources/
│   │   │   │   └── application.yaml              # Spring Boot 配置文件
│   │   │   └── sql/
│   │   │       └── init.sql                      # 数据库初始化脚本
│   │   └── test/                                 # 测试代码
│   └── pom.xml                                   # Maven 项目配置文件
│
└── frontend/                   # 前端项目 (Next.js)
    ├── app/
    │   ├── page.tsx                              # 主页面
    │   ├── layout.tsx                            # 布局组件
    │   ├── globals.css                           # 全局样式
    │   └── actions.ts                            # Server Actions
    ├── components/
    │   ├── AddForm.tsx                           # 添加记录表单
    │   ├── SelectAddForm.tsx                     # 选择添加表单
    │   ├── FormFields.tsx                        # 表单字段组件
    │   ├── BreastMilkFields.tsx                  # 母乳喂养字段
    │   ├── BottleFeedingFields.tsx               # 瓶喂字段
    │   ├── MilkPowderFields.tsx                  # 奶粉喂养字段
    │   ├── LatestRecords.tsx                     # 最近记录列表
    │   ├── DayRecords.tsx                        # 按天记录
    │   ├── Item.tsx                              # 记录项组件
    │   ├── Summary.tsx                           # 汇总组件
    │   ├── MyAppBar.tsx                          # 应用顶栏
    │   ├── AlertDialog.tsx                       # 提示对话框
    │   ├── FixedBg.tsx                           # 固定背景
    │   └── OperationIcon.tsx                     # 操作图标
    ├── util/
    │   ├── Utils.ts                              # 工具函数
    │   └── Events.ts                             # 事件处理
    ├── public/                                   # 静态资源
    ├── package.json                              # npm 依赖配置
    ├── next.config.mjs                           # Next.js 配置
    ├── tsconfig.json                             # TypeScript 配置
    └── .eslintrc.json                            # ESLint 配置
```

## 技术栈

### 后端技术栈
- **框架**: Spring Boot 3.2.2
- **语言**: Java 17
- **数据库**: MySQL
- **ORM**: Spring Data JPA / Hibernate
- **构建工具**: Maven
- **依赖管理**:
  - spring-boot-starter-web: Web 应用支持
  - spring-boot-starter-data-jpa: JPA 数据访问
  - spring-boot-starter-validation: 数据验证
  - spring-boot-starter-actuator: 应用监控
  - mysql-connector-j: MySQL 驱动
  - lombok: 代码简化工具

### 前端技术栈
- **框架**: Next.js 14.1.0
- **语言**: TypeScript 5
- **UI 库**: Material-UI (MUI) 5.15.9
- **状态管理**: React 18 (内置 hooks)
- **样式**: Emotion (@emotion/react, @emotion/styled)
- **PWA**: @ducanh2912/next-pwa
- **日期处理**: Day.js
- **构建工具**: Next.js 内置
- **代码检查**: ESLint

## 开发规范

### 后端开发规范

#### 代码规范
1. **包结构**: 所有代码统一在 `com.jonas.tools.nai` 包下
2. **命名规范**:
   - 实体类使用名词，如 `FeedingRecord`
   - Service 类以 `Service` 结尾
   - Repository 接口以 `Repo` 结尾
   - Controller 类以 `Controller` 结尾
   - DTO 类使用具体的业务名称，如 `AddFeedingRecord`
3. **注解使用**:
   - 实体类使用 `@Entity` 和 `@Table`
   - 使用 `@Data` (Lombok) 自动生成 getter/setter
   - REST 接口使用 `@RestController`
   - 路径映射使用 `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`
4. **验证规范**:
   - 使用 Jakarta Validation 注解进行参数验证
   - `@NotNull`: 非空验证
   - `@NotBlank`: 非空字符串验证
   - 使用验证分组 (EntityGroup.Update) 处理不同场景

#### 数据库规范
1. **表命名**: 使用前缀 `bt_`，如 `bt_feeding_record`
2. **字段规范**:
   - 主键字段名为 `id`，使用自增策略
   - 必须包含审计字段：`creator`, `modifier`, `created`, `modified`
   - 使用 `comment` 注释说明字段含义
3. **日期时间**:
   - 日期使用 `date` 类型和 Java `LocalDate`
   - 时间使用 `time` 类型和 Java `LocalTime`
   - 时间戳使用 `timestamp` 类型和 Java `Date`

#### API 设计规范
1. **URL 命名**: 使用 RESTful 风格，统一以 `/api/` 开头
2. **HTTP 方法**:
   - GET: 查询操作
   - POST: 创建操作
   - PUT: 更新操作
   - DELETE: 删除操作
3. **响应格式**: 直接返回实体或列表，框架自动转换为 JSON
4. **分页**: 使用 Spring Data 的 `Pageable` 和 `Page`

### 前端开发规范

#### 代码规范
1. **组件规范**:
   - 使用函数式组件和 Hooks
   - 客户端组件必须在文件顶部添加 `"use client"` 指令
   - 服务端组件使用 `async function` 定义
2. **命名规范**:
   - 组件文件使用 PascalCase，如 `AddForm.tsx`
   - 工具文件使用 PascalCase，如 `Utils.ts`
   - 常量使用 UPPER_SNAKE_CASE
3. **TypeScript 规范**:
   - 启用严格模式 (`strict: true`)
   - 为 props 和 state 定义类型
   - 使用接口定义数据结构
4. **导入规范**:
   - 第三方库导入在前
   - 本地组件导入在后
   - 使用相对路径导入本地模块

#### 样式规范
1. **使用 MUI 组件**: 优先使用 Material-UI 提供的组件
2. **响应式设计**: 使用 MUI 的 `Container`, `Box` 等布局组件
3. **主题一致性**: 遵循 Material Design 设计规范

#### 状态管理规范
1. **本地状态**: 使用 `useState` 管理组件内部状态
2. **回调函数**: 使用 `useCallback` 优化性能
3. **服务端数据**: 使用 Next.js Server Actions 获取数据

## 构建和部署

### 后端构建

#### 环境要求
- JDK 17 或更高版本
- Maven 3.6+ 
- MySQL 8.0+

#### 配置
修改 `backend/src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://your-host:3306/nai
    username: your-username
    password: your-password
  jpa:
    open-in-view: false
    show-sql: true  # 生产环境建议设为 false
```

#### 数据库初始化
执行 `backend/src/main/sql/init.sql` 创建数据表。

#### 构建命令
```bash
cd backend
mvn clean package
```

#### 运行
```bash
java -jar target/nai.jar
```

默认运行在 `http://localhost:8080`

### 前端构建

#### 环境要求
- Node.js 20+ 
- npm 或 yarn

#### 安装依赖
```bash
cd frontend
npm install
```

#### 开发模式
```bash
npm run dev
```
访问 `http://localhost:3000`

#### 生产构建
```bash
npm run build
npm start
```

#### 配置说明
- API 代理配置在 `next.config.mjs` 中，默认代理到 `http://localhost:8080`
- PWA 配置已启用，会自动生成 service worker

### 部署建议
1. **后端**: 使用 Docker 容器化部署或直接部署 jar 包
2. **前端**: 可部署到 Vercel、Netlify 等平台，或使用 Nginx 托管静态资源
3. **数据库**: 建议使用独立的 MySQL 服务器，配置好备份策略
4. **反向代理**: 生产环境建议使用 Nginx 作为反向代理

## API 接口说明

### 基础路径
所有 API 接口的基础路径为 `/api/`

### 接口列表

#### 1. 添加喂养记录
- **URL**: `/api/feeding-record`
- **方法**: POST
- **请求体**:
```json
{
  "date": "2024-01-01",
  "time": "12:00:00",
  "operation": "BREAST_MILK",
  "value1": 10,
  "value2": 10,
  "creator": "user",
  "modifier": "user"
}
```
- **响应**: 返回创建的 `FeedingRecord` 对象

#### 2. 获取喂养记录列表（分页）
- **URL**: `/api/feeding-records`
- **方法**: GET
- **参数**: 
  - `page`: 页码（从 0 开始）
  - `size`: 每页记录数
  - `sort`: 排序字段，默认按 `date,time` 降序
- **响应**: 返回 `Page<FeedingRecord>` 对象

#### 3. 获取指定天数的喂养记录
- **URL**: `/api/days-feeding-records`
- **方法**: GET
- **参数**: 
  - `days`: 天数
  - 其他查询参数
- **响应**: 返回 `List<DaysFeedingRecord>` 列表

#### 4. 删除喂养记录
- **URL**: `/api/feeding-record/{id}`
- **方法**: DELETE
- **路径参数**: 
  - `id`: 记录 ID
- **响应**: 无返回内容

#### 5. 更新喂养记录
- **URL**: `/api/feeding-record`
- **方法**: PUT
- **请求体**: `FeedingRecord` 对象（必须包含 `id`）
- **响应**: 无返回内容

#### 6. 获取喂养汇总
- **URL**: `/api/feeding-summary`
- **方法**: GET
- **参数**: 
  - `date`: 日期（格式：YYYY-MM-DD）
- **响应**: 返回 `List<FeedingSummary>` 列表

### 数据模型

#### Operation 枚举
喂养操作类型：
- `BREAST_MILK`: 母乳喂养
- `BOTTLE_FEEDING`: 瓶喂
- `MILK_POWDER`: 奶粉喂养
- `BIG_ONE`: 大便
- `LITTLE_ONE`: 小便

#### FeedingRecord 实体
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 记录 ID |
| date | LocalDate | 喂养日期 |
| time | LocalTime | 喂养时间 |
| operation | Operation | 喂养类型 |
| value1 | Integer | 喂养数据 1 |
| value2 | Integer | 喂养数据 2（可选）|
| creator | String | 创建人 |
| modifier | String | 修改人 |
| created | Date | 创建时间 |
| modified | Date | 修改时间 |

## 维护和扩展

### 添加新的喂养类型
1. 在 `Operation.java` 枚举中添加新类型
2. 在前端 `FormFields.tsx` 中添加对应的表单字段组件
3. 更新 `SelectAddForm.tsx` 添加新的选项

### 数据库迁移
1. 创建新的 SQL 脚本
2. 使用工具（如 Flyway 或 Liquibase）管理版本
3. 更新对应的实体类

### 性能优化建议
1. **后端**:
   - 为常用查询添加数据库索引
   - 使用 Redis 缓存热点数据
   - 配置 JPA 二级缓存
2. **前端**:
   - 使用 Next.js 的静态生成 (SSG) 或增量静态再生 (ISR)
   - 优化图片和资源加载
   - 启用浏览器缓存

## 故障排查

### 常见问题

1. **后端启动失败**
   - 检查 MySQL 连接配置
   - 确认数据库已创建并初始化
   - 检查端口 8080 是否被占用

2. **前端无法访问 API**
   - 确认后端服务已启动
   - 检查 `next.config.mjs` 中的代理配置
   - 查看浏览器控制台的网络请求

3. **数据库连接错误**
   - 检查 MySQL 服务是否运行
   - 验证用户名和密码
   - 确认数据库 URL 格式正确

## 安全注意事项

1. **配置文件**: 不要将包含敏感信息的 `application.yaml` 提交到版本控制
2. **数据验证**: 所有用户输入必须进行验证
3. **SQL 注入**: 使用 JPA 参数化查询，避免 SQL 注入
4. **CORS**: 生产环境配置正确的 CORS 策略
5. **环境变量**: 使用环境变量管理敏感配置

## 版本历史

- **v0.0.1-SNAPSHOT**: 初始版本，实现基本的喂养记录管理功能

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交代码并编写清晰的提交信息
4. 推送到分支
5. 创建 Pull Request

## 许可证

请根据项目实际情况添加许可证信息。
