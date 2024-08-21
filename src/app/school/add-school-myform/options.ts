const options = {
    "name": "List Create Schools Dynamics Api",
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
            "village_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Village name"
            },
            "district_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "District name"
            },
            "district": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "District"
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
                "required": true,
                "read_only": false,
                "label": "School Name",
                "max_length": 45
            },
            "emis_code": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Emis Code",
                "max_length": 45
            },
            "phone": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Phone",
                "max_length": 30
            },
            "email": {
                "type": "email",
                "required": false,
                "read_only": false,
                "label": "Email Address",
                "max_length": 100
            },
            "school_ministry": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "School ministry",
                "max_length": 100
            },
            "founder_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Founder name",
                "max_length": 70
            },
            "year_of_foundation": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Year of foundation"
            },
            "ownership": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Ownership",
                "max_length": 100
            },
            "location": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "School Category",
                "choices": [
                    {
                        "value": "R",
                        "display_name": "Rural"
                    },
                    {
                        "value": "U",
                        "display_name": "Urban"
                    }
                ]
            },
            "lat": {
                "type": "float",
                "required": false,
                "read_only": false,
                "label": "Lat"
            },
            "lng": {
                "type": "float",
                "required": false,
                "read_only": false,
                "label": "Lng"
            },
            "start_of_calendar": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Start of calendar"
            },
            "end_of_calendar": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "End of calendar"
            },
            "active": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Active"
            },
            "lowest_grade": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Lowest grade",
                "choices": [
                    {
                        "value": "1",
                        "display_name": "1"
                    },
                    {
                        "value": "2",
                        "display_name": "2"
                    },
                    {
                        "value": "3",
                        "display_name": "3"
                    },
                    {
                        "value": "4",
                        "display_name": "4"
                    },
                    {
                        "value": "5",
                        "display_name": "5"
                    },
                    {
                        "value": "6",
                        "display_name": "6"
                    },
                    {
                        "value": "7",
                        "display_name": "7"
                    },
                    {
                        "value": "8",
                        "display_name": "8"
                    }
                ]
            },
            "highest_grade": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Highest grade",
                "choices": [
                    {
                        "value": "1",
                        "display_name": "1"
                    },
                    {
                        "value": "2",
                        "display_name": "2"
                    },
                    {
                        "value": "3",
                        "display_name": "3"
                    },
                    {
                        "value": "4",
                        "display_name": "4"
                    },
                    {
                        "value": "5",
                        "display_name": "5"
                    },
                    {
                        "value": "6",
                        "display_name": "6"
                    },
                    {
                        "value": "7",
                        "display_name": "7"
                    },
                    {
                        "value": "8",
                        "display_name": "8"
                    }
                ]
            },
            "schooling": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Schooling",
                "choices": [
                    {
                        "value": "D",
                        "display_name": "Day Only"
                    },
                    {
                        "value": "B",
                        "display_name": "Boarding Only"
                    },
                    {
                        "value": "BD",
                        "display_name": "Boarding and Day"
                    }
                ]
            },
            "gender": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "School Type",
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
                        "value": "MX",
                        "display_name": "Mixed"
                    }
                ]
            },
            "moe_id": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Moe id",
                "max_length": 50
            },
            "moe_emis_code": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Moe emis code",
                "max_length": 50
            },
            "sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Sub County",
                "url": `api/v1/sub-counties/`,
                "display_name": "name",
                "placeholder": "Search Sub County name ..",
                "value_field": "id",
                "search_field": "name"
            }
        }
    }
}

export {
    options
}