# ==============================================================================
# TIA FREE AI PROFILE STUDIO - GOOGLE COLAB GPU BACKEND (100% FREE)
# ==============================================================================
# Run this entire notebook on Google Colab with a FREE T4 GPU.
# It starts a high-speed neural face-swap API for your TIA website.
# ==============================================================================

# STEP 1: Install Dependencies
!pip install -q fastapi uvicorn pyngrok python-multipart insightface onnxruntime-gpu opencv-python-headless pillow requests

# STEP 2: Download the InsightFace Neural Model & TIA Royal Blue Templates
import os
import urllib.request

os.makedirs("models", exist_ok=True)
os.makedirs("templates", exist_ok=True)

print("Downloading InsightFace inswapper model...")
model_url = "https://github.com/facefusion/facefusion-assets/releases/download/models/inswapper_128.onnx"
urllib.request.urlretrieve(model_url, "models/inswapper_128.onnx")

print("Downloading TIA Royal Blue Blazer Templates...")
templates = {
    "blazer_1": "https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-1.jpg",
    "blazer_2": "https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-2.jpg",
    "blazer_3": "https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-3.jpg",
}

for name, url in templates.items():
    urllib.request.urlretrieve(url, f"templates/{name}.jpg")

print("✓ All models and templates downloaded successfully!")

# STEP 3: Create the FastAPI Face-Swap Engine
server_code = """
import io
import base64
import cv2
import numpy as np
from PIL import Image
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import insightface
from insightface.app import FaceAnalysis

app = FastAPI(title="TIA AI Face-Swap Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Initializing Face Analysis & Inswapper ONNX Models on GPU...")
face_app = FaceAnalysis(name='buffalo_l', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
face_app.prepare(ctx_id=0, det_size=(640, 640))

swapper = insightface.model_zoo.get_model('models/inswapper_128.onnx', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])

templates = {
    "opt-executive-blazer": {
        "name": "Signature Royal Blue Blazer",
        "tag": "Executive",
        "pose": "Executive Folded-Arms Pose",
        "clothing": "Tailored Royal Cobalt Blue Blazer & White Top",
        "path": "templates/blazer_1.jpg",
        "description": "Your real face diffused onto the signature royal blue blazer with folded arms."
    },
    "opt-butterfly-pendant": {
        "name": "Tailored Blazer + Butterfly Pendant",
        "tag": "Commercial",
        "pose": "Warm Direct Smile & Butterfly Pendant",
        "clothing": "Royal Blue Tailored Blazer with White Camisole",
        "path": "templates/blazer_2.jpg",
        "description": "Your real face with subtle gold butterfly pendant and tailored cobalt blazer."
    },
    "opt-electric-host": {
        "name": "Electric Blue Media Host",
        "tag": "Modern Host",
        "pose": "Dynamic Posture & Studio Lighting",
        "clothing": "Vibrant Electric Blue Blazer & Clean White Top",
        "path": "templates/blazer_3.jpg",
        "description": "Your real face with vibrant electric blue blazer and clean studio key lighting."
    }
}

class FaceSwapRequest(BaseModel):
    user_image: str  # Base64 string or image URL
    creator_name: str = "Creator"

def decode_image(img_input: str) -> np.ndarray:
    if img_input.startswith("data:image"):
        img_input = img_input.split(",")[1]
    
    if img_input.startswith("http://") or img_input.startswith("https://"):
        import requests
        resp = requests.get(img_input)
        img_bytes = resp.content
    else:
        img_bytes = base64.b64decode(img_input)
        
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

def encode_image(bgr_img: np.ndarray) -> str:
    rgb = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(rgb)
    buffered = io.BytesIO()
    pil_img.save(buffered, format="JPEG", quality=95)
    return "data:image/jpeg;base64," + base64.b64encode(buffered.getvalue()).decode("utf-8")

@app.get("/")
def home():
    return {"status": "online", "engine": "TIA Neural Face-Swap Engine (100% Free GPU)"}

@app.post("/api/face-swap")
async def face_swap(req: FaceSwapRequest):
    try:
        source_bgr = decode_image(req.user_image)
        source_faces = face_app.get(source_bgr)
        
        if len(source_faces) == 0:
            raise HTTPException(status_code=400, detail="No face detected in your uploaded photo. Please upload a clear photo.")
            
        source_face = source_faces[0]
        results = []
        
        for key, tmpl in templates.items():
            target_bgr = cv2.imread(tmpl["path"])
            target_faces = face_app.get(target_bgr)
            
            if len(target_faces) == 0:
                continue
                
            target_face = target_faces[0]
            swapped_bgr = swapper.get(target_bgr, target_face, source_face, paste_back=True)
            output_b64 = encode_image(swapped_bgr)
            
            results.append({
                "id": key,
                "name": tmpl["name"],
                "tag": tmpl["tag"],
                "pose": tmpl["pose"],
                "clothing": tmpl["clothing"],
                "description": tmpl["description"],
                "dataUrl": output_b64
            })
            
        return {
            "success": True,
            "creatorName": req.creator_name,
            "provider": "Google Colab Free T4 GPU (InsightFace Inswapper)",
            "variations": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""

with open("server.py", "w") as f:
    f.write(server_code)

# STEP 4: Launch Public Tunnel with Localtunnel (No Signup Required)
print("Starting Free GPU Face-Swap Server...")
import subprocess
import time

# Start FastAPI in background
proc = subprocess.Popen(["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"])
time.sleep(3)

# Install and run localtunnel for a public HTTPS URL
!npm install -g localtunnel > /dev/null 2>&1
import urllib.request
ip = urllib.request.urlopen('https://ipv4.icanhazip.com').read().decode('utf8').strip()
print(f"\\n🌐 Your Public Password for Localtunnel (if prompted): {ip}")
print("🚀 Starting Localtunnel on Port 8000...")
!npx localtunnel --port 8000
