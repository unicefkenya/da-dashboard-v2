const filterOptions = {
    "name": "List Create Admin Credentials",
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
                        "value": "CO",
                        "display_name": "County Admin"
                    },
                    {
                        "value": "SCO",
                        "display_name": "Sub County Admin"
                    }
                ]
            },
            "sub_county": {
                "type": "multifield",
                "required": true,
                "read_only": false,
                "label": "Sub county",
                "display_name": "name",
                "placeholder": "Search Sub County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/sub-counties/`,
                "search_field": "name",
                "edit_display_name": "item_name",
                "show_only": "SCO",
                "from_field": "role",
            },
            "school": {
                "type": "multifield",
                "required": true,
                "read_only": false,
                "label": "School",
                "multiple": true,
                "search_field": "name",
                "url": `api/v1/schools/`,
                "display_name": "name",
                "placeholder": "Search school name..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "show_only": "SCHA",
                "from_field": "role",
            },
            "county": {
                "type": "multifield",
                "required": true,
                "read_only": false,
                "label": "County",
                "display_name": "name",
                "placeholder": "Search County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/counties/`,
                "search_field": "name",
                "edit_display_name": "item_name",
                "res_value_field": "county",
                "show_only": "CO",
                "from_field": "role",
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
                "obscure": true,
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
    }
}


export {
    filterOptions
}