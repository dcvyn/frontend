from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

# 假设 text-segmentation.py 有一个 segment_text(text) 方法
from text_segmentation import segment_text

app = FastAPI()

# 允许所有前端跨域访问（开发用，生产建议配置具体域名）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/optimize")
async def optimize(request: Request):
    body = await request.json()
    text = body.get("text", "")
    segments = segment_text(text)   # 调用你的分段算法
    return {"segments": segments}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
