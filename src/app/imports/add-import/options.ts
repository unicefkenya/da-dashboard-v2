const options = {
    "name": "List Create Schools Students Imports Api",
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
            "step_display": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Step display"
            },
            "user_details": {
                "type": "nested object",
                "required": false,
                "read_only": true,
                "label": "User details",
                "children": {
                    "id": {
                        "type": "integer",
                        "required": false,
                        "read_only": true,
                        "label": "ID"
                    },
                    "first_name": {
                        "type": "string",
                        "required": false,
                        "read_only": false,
                        "label": "First name",
                        "max_length": 150
                    },
                    "dummy": {
                        "type": "boolean",
                        "required": false,
                        "read_only": false,
                        "label": "Dummy"
                    },

                    "is_school_admin": {
                        "type": "boolean",
                        "required": false,
                        "read_only": true,
                        "label": "Is school admin"
                    },
                    "teacher": {
                        "type": "integer",
                        "required": false,
                        "read_only": true,
                        "label": "Teacher"
                    },
                    "school": {
                        "type": "integer",
                        "required": false,
                        "read_only": true,
                        "label": "School"
                    },
                    "school_name": {
                        "type": "string",
                        "required": false,
                        "read_only": true,
                        "label": "School name"
                    },
                    "emis_code": {
                        "type": "string",
                        "required": false,
                        "read_only": true,
                        "label": "Emis code"
                    },
                    "role_name": {
                        "type": "string",
                        "required": false,
                        "read_only": true,
                        "label": "Role name"
                    },
                    "last_name": {
                        "type": "string",
                        "required": false,
                        "read_only": false,
                        "label": "Last name",
                        "max_length": 150
                    },
                    "username": {
                        "type": "string",
                        "required": true,
                        "read_only": false,
                        "label": "Username",
                        "help_text": "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        "max_length": 150
                    },
                    "dob": {
                        "type": "date",
                        "required": false,
                        "read_only": false,
                        "label": "Dob"
                    },
                    "changed_password": {
                        "type": "boolean",
                        "required": false,
                        "read_only": false,
                        "label": "Changed password"
                    },
                    "role": {
                        "type": "choice",
                        "required": false,
                        "read_only": false,
                        "label": "Role",
                        "choices": [
                            {
                                "value": "A",
                                "display_name": "Admin"
                            },
                            {
                                "value": "SCHA",
                                "display_name": "School Admin"
                            },
                            {
                                "value": "SCHT",
                                "display_name": "School Teacher"
                            },
                            {
                                "value": "CO",
                                "display_name": "County Officer"
                            },
                            {
                                "value": "SCO",
                                "display_name": "Sub County Officer"
                            },
                            {
                                "value": "RO",
                                "display_name": "Read Only"
                            }
                        ]
                    },
                    "image": {
                        "type": "image upload",
                        "required": false,
                        "read_only": false,
                        "label": "Image"
                    },
                    "email": {
                        "type": "email",
                        "required": false,
                        "read_only": false,
                        "label": "Email address",
                        "max_length": 254
                    },
                    "phone": {
                        "type": "string",
                        "required": false,
                        "read_only": false,
                        "label": "Phone",
                        "max_length": 50
                    },
                    "gender": {
                        "type": "choice",
                        "required": false,
                        "read_only": false,
                        "label": "Gender",
                        "choices": [
                            {
                                "value": "M",
                                "display_name": "Male"
                            },
                            {
                                "value": "F",
                                "display_name": "Female"
                            },
                            {
                                "value": "NS",
                                "display_name": "Not Set"
                            }
                        ]
                    },
                    "password": {
                        "type": "string",
                        "required": true,
                        "read_only": false,
                        "label": "Password",
                        "max_length": 128
                    },
                    "profile_image": {
                        "type": "field",
                        "required": false,
                        "read_only": true,
                        "label": "Profile image"
                    },
                    "gender_display": {
                        "type": "string",
                        "required": false,
                        "read_only": true,
                        "label": "Gender display"
                    }
                }
            },
            "update_learner": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "default": false,
                "label": "Update Learner Status (If duplicate found)",
                "placeholder": "Check only when updating the status"
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
                "label": "Sheet Name",
                "max_length": 45
            },
            "import_file": {
                "type": "file",
                "required": true,
                "read_only": false,
                "label": "Import Sheet (.xls)",
                "max_length": 100
            },
            "step": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Step"
            },
            "errors_file": {
                "type": "file upload",
                "required": false,
                "read_only": false,
                "label": "Errors file",
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
            "args": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Args"
            },
            "rows_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Rows count"
            },
            "imported_rows_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Imported rows count"
            },
            "duplicates_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Duplicates count"
            },
            "error_rows_count": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "Error rows count"
            },
            "new_students_created": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "New students created"
            },
            "errors": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Errors",
                "max_length": 2000
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
    options
}