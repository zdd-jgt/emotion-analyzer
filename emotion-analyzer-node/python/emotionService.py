#!/usr/bin/env python3
import sys
import json
from transformers import pipeline

try:
    # 尝试加载模型
    sentiment_pipeline = pipeline("sentiment-analysis", model="../model_cache")
except Exception as e:
    print(json.dumps({"error": "模型加载失败: " + str(e)}))
    sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No text provided"}))
        sys.exit(1)
    text = sys.argv[1]
    try:
        result = sentiment_pipeline(text)
        print(json.dumps(result))
    except Exception as e:
        # 输出详细错误信息，便于调试
        print(json.dumps({"error": "情绪分析失败: " + str(e)}))
        sys.exit(1)
