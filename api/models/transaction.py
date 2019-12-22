from pydantic import BaseModel
import datetime


class Transaction(BaseModel):
    date: datetime.datetime
    sum: float
    category: str
    comment: str = None
