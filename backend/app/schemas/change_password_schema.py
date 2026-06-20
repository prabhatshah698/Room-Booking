from pydantic import BaseModel

class ChangePasswordSchema(BaseModel):
    user_id: str
    old_password: str
    new_password: str