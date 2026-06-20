from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException

from app.routes.auth_routes import router as auth_router
from app.routes.room_routes import router as room_router
from app.routes.booking_routes import router as booking_router
from app.routes.ownerRoutes import router as owner_router
from app.routes.userRoutes import router as user_router
from app.routes.favoriteRoute import router as favorite_router
from app.routes.filter_routes import router as filter_router
from app.routes.admin_auth import router as admin_auth_router
from app.routes.admin import router as admin_router
from app.routes.forgotPasswordRoute import router as forgot_router

from app.database import db




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(room_router)
app.include_router(booking_router)
app.include_router(favorite_router)
app.include_router(user_router)
app.include_router(owner_router)
app.include_router(filter_router)
app.include_router(admin_auth_router)
app.include_router(admin_router)
app.include_router(forgot_router)

# =========================
# CUSTOM HTTP ERRORS
# =========================

@app.exception_handler(HTTPException)
async def http_exception_handler(
    request: Request,
    exc: HTTPException
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "status": exc.status_code,
            "message": exc.detail
        }
    )

# =========================
# ROUTE NOT FOUND
# =========================

@app.exception_handler(404)
async def not_found_handler(
    request: Request,
    exc
):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "status": 404,
            "message": "Route not found"
        }
    )

@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }

app.include_router(
    owner_router
)
app.include_router(
    user_router
)

app.include_router(
    favorite_router
)

@app.on_event("startup")
async def startup():

    await db.password_otps.create_index(
        "expires_at",
        expireAfterSeconds=0
    )


    import os

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)