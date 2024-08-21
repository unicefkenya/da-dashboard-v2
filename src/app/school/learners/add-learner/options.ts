
const options = {
    "name": "List Students Dynamics Api",
    "description": "Group statistics by:\n`type` = class, school, sub-county, county, special-need, gender, id, student-status, dropout-reason, knows-dob, month, year, day",
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
            "stream_name": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Stream name"
            },
            "base_class": {
                "type": "string",
                "required": false,
                "read_only": true,
                "label": "Class"
            },
            "full_name": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Full name"
            },
            "student_id": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Student id"
            },
            "date_enrolled": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Date Enrolled"
            },
            "special_needs_details": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Special needs details",
                "child": {
                    "type": "nested object",
                    "required": false,
                    "read_only": true,
                    "children": {
                        "id": {
                            "type": "integer",
                            "required": false,
                            "read_only": true,
                            "label": "ID"
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
                            "label": "Name",
                            "max_length": 100
                        },
                        "abbreviation": {
                            "type": "string",
                            "required": false,
                            "read_only": false,
                            "label": "Abbreviation",
                            "max_length": 10
                        }
                    }
                }
            },
            "county": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "County"
            },
            "guardian_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Guardian county",
                "url": `api/v1/schools/`,
                "display_name": "name",
                "placeholder": "Search school name..",
                "value_field": "id",
                "edit_source_field": "items_details",
            },
            // "age": {
            //     "type": "string",
            //     "required": false,
            //     "read_only": true,
            //     "label": "Estimate Age (Years)"
            // },
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
            "emis_code": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Emis code",
                "min_value": -9223372036854775808,
                "max_value": 9223372036854775807
            },
            "first_name": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "First name",
                "max_length": 200
            },
            "middle_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Middle name",
                "max_length": 200
            },
            "last_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Last name",
                "max_length": 200
            },
            "date_of_birth": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Date of birth"
            },
            "admission_no": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Admission Number",
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
                    }
                ]
            },
            "previous_class": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Previous class",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "mode_of_transport": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Mode of transport",
                "choices": [
                    {
                        "value": "PERSONAL",
                        "display_name": "Personal Vehicle"
                    },
                    {
                        "value": "BUS",
                        "display_name": "School Bus"
                    },
                    {
                        "value": "FOOT",
                        "display_name": "By Foot"
                    },
                    {
                        "value": "NS",
                        "display_name": "Not Set"
                    }
                ]
            },
            "time_to_school": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Time to school",
                "choices": [
                    {
                        "value": "1HR",
                        "display_name": "One Hour"
                    },
                    {
                        "value": "-0.5HR",
                        "display_name": "Less than 1/2 Hour"
                    },
                    {
                        "value": "+1HR",
                        "display_name": "More than one hour."
                    },
                    {
                        "value": "NS",
                        "display_name": "Not Set"
                    }
                ]
            },
            "distance_from_school": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Distance from school (km)",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "household": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Household",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "meals_per_day": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Meals per day",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "not_in_school_before": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Not in school before"
            },
            "cash_transfer_beneficiary": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Cash Transfer Beneficiary"
            },
            "emis_code_histories": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Emis code histories",
                "max_length": 200
            },
            "total_attendance": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Total attendance",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "total_absents": {
                "type": "integer",
                "required": false,
                "read_only": false,
                "label": "Total absents",
                "min_value": -2147483648,
                "max_value": 2147483647
            },
            "last_attendance": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Last attendance"
            },
            "knows_dob": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Knows dob"
            },
            "guardian_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Guardian name",
                "max_length": 50
            },
            "guardian_phone": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Guardian phone",
                "max_length": 20
            },
            "guardian_status": {
                "type": "choice",
                "required": false,
                "read_only": false,
                "label": "Guardian status",
                "choices": [
                    {
                        "value": "B",
                        "display_name": "Both Parents"
                    },
                    {
                        "value": "S",
                        "display_name": "Single Parent"
                    },
                    {
                        "value": "N",
                        "display_name": "No Parents"
                    }
                ]
            },
            "village": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Learner's Village",
                "max_length": 45
            },
            "active": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Active"
            },
            "graduated": {
                "type": "boolean",
                "required": false,
                "read_only": false,
                "label": "Graduated"
            },
            "dropout_reason": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Dropout reason",
                "max_length": 200
            },
            "offline_id": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Offline id",
                "max_length": 20
            },
            "status": {
                "type": "choice",
                "required": true,
                "read_only": false,
                "label": "Status",
                "choices": [
                    {
                        "value": "OOSC",
                        "display_name": "Dropped Out"
                    },
                    {
                        "value": "NE",
                        "display_name": "Never Been to School"
                    },
                    {
                        "value": "PE",
                        "display_name": "Previously Enrolled"
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
            "moe_unique_id": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Moe unique id",
                "max_length": 45
            },
            "moe_extra_info": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Moe extra info"
            },
            "upi": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Upi Number",
                "help_text": "Unique Identification provided by the school",
                "max_length": 45
            },
            "stream": {
                "type": "multifield",
                "required": true,
                "read_only": false,
                "label": "Assign Stream",
                "display_name": "full_class_name",
                "placeholder": "Search School Name ..",
                "url": `api/v1/streams/`,
                "value_field": "id",
                "search_field": "school_name"
            },
            "guardian_sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Guardian Sub county",
                "url": `api/v1/sub-counties/`,
                "display_name": "name",
                "placeholder": "Search Sub County name ..",
                "value_field": "id",
                "search_field": "name"
            },
            "sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Learner's Sub county",
                "url": `api/v1/sub-counties/`,
                "display_name": "name",
                "placeholder": "Search Sub County name ..",
                "value_field": "id",
                "search_field": "name"

            },
            "graduates_class": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Graduates class"
            },
            "special_needs": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Special needs",
                "multiple": true,
                "url": `api/v1/special-needs/`,
                "display_name": "name",
                "placeholder": "Search Special needs ..",
                "value_field": "id",
                "search_field": "name",
            }
        }
    }
}

export {
    options
}
