
const filterOptions = {
    "name": "Learner API",
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
            "report_type": {
                "type": "field",
                "required": true,
                "read_only": false,
                "label": "Type of Report",
                "default": "students",
                "choices": [
                    {
                        value: "attendances",
                        display_name: "Attendance Report"
                    },
                    {
                        value: "students",
                        display_name: "Students Report"
                    }
                ]
            },
            "grouping": {
                "type": "field",
                "required": true,
                "read_only": false,
                "max_length": 45,
                "label": "Group By",
                "default": "id",
                "choices": [
                    {
                        value: "id",
                        display_name: "No Grouping"
                    },
                    {
                        value: "class",
                        display_name: "Class"
                    },
                    {
                        value: "county",
                        display_name: "County"
                    },
                    {
                        value: "sub_county",
                        display_name: "Sub County"
                    },
                    {
                        value: "school",
                        display_name: "School"
                    },
                    {
                        value: "special-need",
                        display_name: "Special Needs"
                    },
                    {
                        value: "student-status",
                        display_name: "Status"
                    },
                    {
                        value: "gender",
                        display_name: "Gender"
                    },
                    {
                        value: "year",
                        display_name: "Year"
                    },
                    {
                        value: "month",
                        display_name: "Month"
                    },
                    {
                        value: "week",
                        display_name: "Week"
                    },
                    {
                        value: "day",
                        display_name: "Day"
                    },
                    {
                        value: "knwos-dob",
                        display_name: "Knows Date of Birth"
                    }
                ]
            },
            "first_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Search First Name"
            },

        }
    }
}

export {
    filterOptions
}