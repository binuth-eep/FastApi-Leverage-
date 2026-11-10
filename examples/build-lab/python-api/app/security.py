"""Environment accounts for localhost learning; HTTPS and a real identity policy precede release."""
import hashlib
import os
import secrets
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

basic = HTTPBasic()


def same(left: str, right: str) -> bool:
    return secrets.compare_digest(hashlib.sha256(left.encode()).digest(), hashlib.sha256(right.encode()).digest())


def validate_accounts():
    for role in ("MANAGER", "CASHIER"):
        if not os.environ.get(f"{role}_USERNAME") or len(os.environ.get(f"{role}_PASSWORD", "")) < 12:
            raise RuntimeError("Configure both usernames and passwords (12+ characters) in the root .env file")
    if os.environ["MANAGER_USERNAME"] == os.environ["CASHIER_USERNAME"]:
        raise RuntimeError("Use different account usernames")


def identity(credentials: HTTPBasicCredentials = Depends(basic)):
    for role in ("MANAGER", "CASHIER"):
        user_ok = same(credentials.username, os.environ.get(f"{role}_USERNAME", ""))
        password_ok = same(credentials.password, os.environ.get(f"{role}_PASSWORD", ""))
        if user_ok & password_ok:
            return {"name": credentials.username, "role": role.lower()}
    raise HTTPException(401, "Invalid credentials", headers={"WWW-Authenticate": "Basic"})


def manager(user=Depends(identity)):
    if user["role"] != "manager":
        raise HTTPException(403, "Manager permission required")
    return user
