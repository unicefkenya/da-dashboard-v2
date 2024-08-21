const options = {
    "name": "List Create Teachers Dynamics Api",
    "description": "Group statistics by:\n`type` = id, sub-county, county",
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
            "school_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "School name"
            },
            "username": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Username"
            },
            "gender_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Gender name"
            },
            "gender": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Gender"
            },
            "role": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Role"
            },
            "role_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Role name"
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
            "first_name": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "First name",
                "max_length": 45
            },
            "middle_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Middle name",
                "max_length": 45
            },
            "last_name": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Last name",
                "max_length": 45
            },
            "date_started_teaching": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Date started teaching"
            },
            "joined_current_school": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Joined current school"
            },
            "is_non_delete": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Is non delete"
            },
            "active": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Active"
            },
            "type": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Teacher Type",
                "choices": [
                    {
                        "value": "TSC",
                        "display_name": "TSC"
                    },
                    {
                        "value": "BRD",
                        "display_name": "BOM"
                    }
                ]
            },
            "tsc_no": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Tsc no",
                "max_length": 45
            },
            "phone": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Phone Number",
                "max_length": 20
            },
            "qualifications": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Qualifications",
                "choices": [
                    {
                        "value": "NS",
                        "display_name": "Not Set"
                    },
                    {
                        "value": "UNI",
                        "display_name": "UNIVERSITY"
                    },
                    {
                        "value": "COL",
                        "display_name": "COLLEGE"
                    }
                ]
            },
            "is_school_admin": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Is school admin"
            },
            "email": {
                "type": "email",
                "required": true,
                "read_only": false,
                "label": "Email Address ( Used to receive account password )",
                "max_length": 100
            },
            "marital_status": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Marital status",
                "choices": [
                    {
                        "value": "NS",
                        "display_name": "Not Set"
                    },
                    {
                        "value": "S",
                        "display_name": "Single"
                    },
                    {
                        "value": "M",
                        "display_name": "Married"
                    },
                    {
                        "value": "D",
                        "display_name": "Divorced"
                    }
                ]
            },
            "dob": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Date of Birth"
            },
            "moe_id": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Moe id",
                "max_length": 50
            },
            "user": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "User"
            },
            "school": {
                "type": "multifield",
                "required": true,
                "read_only": false,
                "label": "Assign School",
                "display_name": "name",
                "placeholder": "Search school name..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "url": `api/v1/schools/`,
                "search_field": "name",
                "edit_display_name": "item_name",
                "res_value_field": "item_config"
            },
            "streams": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Streams"
            }
        }
    }
}

export {
    options
}