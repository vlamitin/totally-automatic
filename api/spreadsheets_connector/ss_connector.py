from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import datetime


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


class SSConnector:
    def __init__(self, creds_file, token_file, ss_id):
        self.creds_file = creds_file
        self.token_file = token_file
        self.ss_id = ss_id

        creds = self._login()
        self.service = build('sheets', 'v4', credentials=creds, cache_discovery=False)

    def _login(self):
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        creds = None
        if os.path.exists(self.token_file):
            with open(self.token_file, 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.creds_file, SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open(self.token_file, 'wb') as token:
                pickle.dump(creds, token)
        return creds

    def get_ss(self):
        request = self.service.spreadsheets().get(spreadsheetId=self.ss_id, ranges=[], includeGridData=False)
        response = request.execute()
        return response

    def create_sheets_with_titles(self, titles, base_id=12):
        requests = []
        for (i, title) in enumerate(titles):
            result = {
                'addSheet': {
                    'properties': {
                        'sheetId': base_id + i,
                        'title': title,
                        'index': i
                    }
                }
            }
            requests.append(result)

        body = {
            'requests': requests
        }
        request = self.service.spreadsheets().batchUpdate(spreadsheetId=self.ss_id, body=body)

        response = request.execute()
        return response

    # data example: [{ 'sheet_id': 12, rows: [[{'userEnteredValue': {'stringValue': 'city'}}]]
    def append_rows_to_sheets(self, data):
        requests = []
        for sheet in data:
            request = {
                'appendCells': {
                    'sheetId': sheet['sheet_id'],
                    'rows': list(
                        map(
                            lambda row: {'values': row},
                            sheet['rows']
                        )
                    ),
                    'fields': '*'
                }
            }
            requests.append(request)

        request = self.service.spreadsheets().batchUpdate(spreadsheetId=self.ss_id, body={
            'requests': requests
        })

        response = request.execute()
        return response


def to_excel_date(date1):
    temp = datetime.datetime(1899, 12, 29, 21, 0, tzinfo=datetime.timezone.utc)    # Note, not 31st Dec but 30th!
    delta = date1 - temp
    return float(delta.days) + (float(delta.seconds) / 86400)
