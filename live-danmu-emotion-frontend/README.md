1. 项目目录结构
   live-danmu-emotion-frontend/
   ├── node_modules/
   ├── public/
   │   ├── index.html          // 页面入口模板
   │   └── favicon.ico
   ├── src/
   │   ├── components/
   │   │   ├── DanmuInput.jsx    // 弹幕输入组件
   │   │   ├── DanmuList.jsx     // 显示实时弹幕及情绪分析结果
   │   │   └── ChartDisplay.jsx  // （可选）图表展示组件，如情绪趋势图
   │   ├── styles/
   │   │   ├── App.css           // 应用相关样式
   │   │   └── index.css         // 全局样式
   │   ├── App.jsx               // 主应用组件，集成 WebSocket、状态管理
   │   ├── index.js              // 渲染入口，将 App 挂载到 DOM
   │   └── utils/
   │       └── websocket.js      // 封装 WebSocket 连接逻辑（可选）
   ├── package.json              // 项目配置及依赖声明
   └── README.md                 // 项目说明文件

