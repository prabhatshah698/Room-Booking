import resend
import os

resend.api_key = os.getenv(
    "RESEND_API_KEY"
)

async def send_otp_email(
    email: str,
    otp: str
):

    resend.Emails.send({
        "from": os.getenv(
            "EMAIL_FROM"
        ),
        "to": email,
        "subject": "Password Reset OTP",
        "html": f"""
        <h2>Password Reset OTP</h2>

        <p>Your OTP is:</p>

        <h1>{otp}</h1>

        <p>
        This OTP will expire in
        15 minutes.
        </p>
        """
    })