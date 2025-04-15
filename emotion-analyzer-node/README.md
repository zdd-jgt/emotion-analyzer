1. 整体架构与流程
1.1. 系统架构图
+------------------+             +-----------------+
|    前端 React    | <-------->  |   后端 Node.js  |
|  (WebSocket/REST)|             | (Express + WS)  |
+------------------+             +--------+--------+
                                            │
                                            │
                                            ▼
                                +-------------------------+
                                |  Python 情绪分析模块    |
                                | (子进程调用情绪模型)    |
                                +-------------------------+

1.2. 工作流程
实时弹幕传输
前端通过 WebSocket 实时发送弹幕文本至后端，同时也可以通过 REST 接口发送单条弹幕进行分析。

Node.js 后端处理
后端使用 Express 框架建立 REST 接口，同时利用 WebSocket 库（如 ws 或 socket.io）处理实时连接。接收到弹幕文本后，后端通过 Node.js 内置的 child_process 模块调用 Python 脚本，将文本传入模型并获得情绪分析结果。

Python 情绪分析
Python 脚本加载预训练或 fine-tuned 的情绪分析模型（如基于 Hugging Face Transformers），对文本进行预处理和情绪分类（如积极、中性、消极），并将 JSON 格式的结果返回给 Node.js 后端。

数据反馈
后端将收到的情绪分析结果通过 WebSocket 或 REST 接口返回前端，前端解析并展示文本、情绪标签以及置信度。

2. 技术选型
前端：React（通过 WebSocket 和/或 REST 与后端通信），使用 Create React App 或自己构建项目脚手架

后端：Node.js（v14.17.3），Express 框架管理 REST 接口和 WebSocket 服务

情绪模型：Python 3.10.6，通过 Hugging Face Transformers（例如 uer/roberta-base-finetuned-chinanews-chinese 模型）来处理中文情绪分析

版本管理：npm@6.14.13

3. 项目目录结构示例

live-danmu-emotion/
├── backend/
│   ├── server.js          # Node.js 后端主入口文件
│   ├── routes/
│   │   └── analyze.js     # REST 接口，用于情绪分析请求
│   ├── wsServer.js        # WebSocket 服务实现
│   └── package.json       # Node.js 项目配置
└── python/
    └── emotionService.py  # Python 脚本，实现情绪分析调用模型
