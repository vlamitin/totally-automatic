from typing import List

from fastapi import Depends, Security, APIRouter, UploadFile, File

from auth.main import TokenData, authorize_user
from models.transaction import Transaction
from spreadsheets_connector.transactions_ss_connector import append_transactions

router = APIRouter()


async def get_transactions(token_data: TokenData = Depends(authorize_user)):
    return []


async def put_transactions(new_transactions: List[Transaction], token_data: TokenData = Depends(authorize_user)):
    append_transactions(new_transactions, token_data.username)
    return new_transactions


async def parse_files(files: List[UploadFile] = File(...)):
    print('files', files)
    return []


@router.get("/transactions/", response_model=List[Transaction])
async def read_transactions(transactions: List[Transaction] = Security(get_transactions, scopes=["transactions:read"])):
    return transactions


@router.put("/transactions/", response_model=List[Transaction])
async def create_new_transactions(
        transactions: List[Transaction] = Security(put_transactions, scopes=["transactions:write"])
):
    return transactions


@router.post("/transactions/tcs-csv", response_model=List[Transaction])
async def parse_tcs_csv_transactions(
        transactions: List[Transaction] = Security(parse_files, scopes=["transactions:read"])
):
    print('transactions', transactions)
    return transactions
