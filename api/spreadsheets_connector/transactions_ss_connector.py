from spreadsheets_connector import ss_connector
from models.transaction import Transaction
from conf.config import config
from typing import List


# @param tr example {'date': '22.12.2019', 'sum': 200, category: 'Еда работа', 'comment': 'sic!'}
def transaction_to_values(tr, username: str):
    return [
        {
            'userEnteredValue': {
                'numberValue': ss_connector.to_excel_date(tr['date'])
            },
            'userEnteredFormat': {
                'numberFormat': {
                    'type': 'DATE',
                    'pattern': 'dd/mm/yyyy'
                }
            }
        },
        {
            'userEnteredValue': {
                'numberValue': tr['sum']
            }
        },
        {
            'userEnteredValue': {
                'stringValue': tr['category']
            }
        },
        {
            'userEnteredValue': {
                'stringValue': tr['comment']
            }
        },
        {
            'userEnteredValue': {
                'stringValue': username
            }
        }
    ]


def append_transactions(transactions: List[Transaction], username: str):
    ssc = ss_connector.SSConnector(
        'spreadsheets_connector/google_sheets_credentials.json',
        'spreadsheets_connector/token.pickle',
        config['SS']['transactions_ss_id']
    )
    ssc.append_rows_to_sheets([
        {
            'sheet_id': config['SS']['raw_expences_sheet_id'],
            'rows': [transaction_to_values(dict(tr), username) for tr in transactions]
        }
    ])


def main():
    print('todo')
    pass


if __name__ == '__main__':
    main()
