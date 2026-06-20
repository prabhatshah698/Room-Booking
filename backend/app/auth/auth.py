from fastapi import Depends
from fastapi import HTTPException

def verify_admin(
    payload=Depends(verify_token)
):

    if payload["role"] != "admin":

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return payload