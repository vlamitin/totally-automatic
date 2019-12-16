from pydantic import BaseModel


class Transaction(BaseModel):
    date: str
    sum: float
    category: str
    comment: str = None
