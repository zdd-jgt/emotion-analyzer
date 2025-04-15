// backend/routes/analyze.js
const express = require("express");
const { spawn } = require("child_process");

const router = express.Router();

// POST /api/analyze
router.post("/analyze", (req, res) => {
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: "Text is required" });

    // 通过 Python 子进程调用情绪分析脚本
    const pyProcess = spawn("python", ["../python/emotionService.py", text]);

    let result = "";
    pyProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pyProcess.on("close", () => {
        try {
            const analysisResult = JSON.parse(result);
            res.json({ result: analysisResult });
        } catch (err) {
            res.status(500).json({ error: "Error parsing Python result" });
        }
    });
});

module.exports = router;
