const autoReportFilter = {
    "name": "List Create Custom Exports Api",
    "description": "",
    "renders": [
        "application/json",
        "text/html"
    ],
    "parses": [
        "application/json",
        "application/x-www-form-urlencoded",
        "multipart/form-data"
    ],
    "actions": {
        "POST": {
            "id": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "ID"
            },
            "status_display": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Status display"
            },
            "completed_percentage": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Completed percentage"
            },
            "duration": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Duration"
            },
            "created": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "Created"
            },
            "modified": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "Modified"
            },
            "name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Name",
                "placeholder": "Will not appear in the report.",
                "max_length": 45
            },
            "custom_report_name": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "default": "overall",
                "label": "Custom report name",
                "choices": [
                    {
                        "value": "overall",
                        "display_name": "General Overall Report"
                    }
                ]
            },
            "title": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Report Title",
                "placeholder": "Report Title / Heading. Eg, June Report",
                "max_length": 45
            },
            "description": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Report Sub Title",
                "max_length": 1000,
                "placeholder": "Report Sub Title. Eg, Attendance, Enrolment Report",
            },
            "status": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Status",
                "choices": [
                    {
                        "value": "Q",
                        "display_name": "Queued"
                    },
                    {
                        "value": "E",
                        "display_name": "Exporting..."
                    },
                    {
                        "value": "P",
                        "display_name": "Preparing Download..."
                    },
                    {
                        "value": "F",
                        "display_name": "Failed"
                    },
                    {
                        "value": "D",
                        "display_name": "Click To Download"
                    }
                ]
            },
            "rows_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Rows count"
            },
            "exported_rows_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Exported rows count"
            },
            "args": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Args",
                "max_length": 1000
            },
            "type": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Type",
                "choices": [
                    {
                        "value": "C",
                        "display_name": "CSV"
                    },
                    {
                        "value": "P",
                        "display_name": "PDF"
                    }
                ]
            },
            "file": {
                "type": "file",
                "required": false,
                "read_only": false,
                "label": "File",
                "max_length": 100
            },
            "start_time": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "Start time"
            },
            "end_time": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "End time"
            },
            "errors": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Errors",
                "max_length": 2000
            },
            "is_custom": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Is custom"
            },
            "start_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Start Date"
            },
            "end_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "End Date"
            },
            "list_size": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Table Size",
                "default": "20",
                "choices": [
                    {
                        "value": 20,
                        "display_name": "20"
                    },
                    {
                        "value": 50,
                        "display_name": "50"
                    },
                    {
                        "value": 100,
                        "display_name": "100"
                    },
                    {
                        "value": 300,
                        "display_name": "300"
                    },
                    {
                        "value": 500,
                        "display_name": "500"
                    },
                    {
                        "value": 800,
                        "display_name": "800"
                    },
                    {
                        "value": 1000,
                        "display_name": "1000"
                    },
                    {
                        "value": 10000,
                        "display_name": "10000"
                    }
                ]
            },
            "user": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "User"
            }
        }
    }
}

export {
    autoReportFilter
}