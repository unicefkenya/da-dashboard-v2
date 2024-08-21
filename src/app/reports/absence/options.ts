const filterOptions = {
    "name": "MOE Dash Api",
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
                        display_name: "Attendance List (No Grouping)"
                    },
                    {
                        value: "reason",
                        display_name: "Reason For Absence"
                    },

                    {
                        value: "gender",
                        display_name: "Gender"
                    },
                    {
                        value: "class",
                        display_name: "Class"
                    },
                    {
                        value: "school",
                        display_name: "School"
                    }


                    // {
                    //     value: "reason-description",
                    //     display_name: "Reason Description"
                    // },
                ]
            },
            "first_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Search First Name"
            },
            "stream": {
                "type": "multifield",
                "required": false,
                "multiple": false,
                "read_only": false,
                "label": "Filter by Stream",
                "url": `api/v1/streams/`,
                "value_field": "id",
                "search_field": "school_name",
                "placeholder": "Search School Name ..",
                "display_name": "full_class_name"
            },
            "start_attendance_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Filter by Start Date",
                "placeholder": "Search Start Date .."
            },
            "end_attendance_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Filter by End Date",
                "placeholder": "Search End Date .."
            },
            "gender": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by Gender",
                "choices": [
                    {
                        value: "M",
                        display_name: "Male"
                    },
                    {
                        value: "F",
                        display_name: "Female"
                    }
                ]
            },
            "leaner_status": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by Leaner Status",
                "display_name": "name",
                "value_field": "value",
                "placeholder": "Search Learner Status ..",
                "choices": [
                    {
                        "value": "OOSC",
                        "display_name": "Over Age"
                    },
                    {
                        "value": "NE",
                        "display_name": "Never Enrolled"
                    },
                    {
                        "value": "PE",
                        "display_name": "Re Enrolled"
                    }
                ]
            },
            "status": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter By Attendance ",
                "choices": [
                    {
                        value: "1",
                        display_name: "Present"
                    },
                    {
                        value: "0",
                        display_name: "Absent"
                    }
                ]
            },
            "base_class": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by Class",
                "default": "",
                "choices": [
                    {
                        value: "1",
                        display_name: "1"
                    },
                    {
                        value: "2",
                        display_name: "2"
                    },
                    {
                        value: "3",
                        display_name: "3"
                    },
                    {
                        value: "4",
                        display_name: "4"
                    },
                    {
                        value: "5",
                        display_name: "5"
                    },
                    {
                        value: "6",
                        display_name: "6"
                    },
                    {
                        value: "7",
                        display_name: "7"
                    },
                    {
                        value: "8",
                        display_name: "8"
                    },

                ],

            },
            "county_id": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by County",
                "display_name": "name",
                "placeholder": "Search County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": false,
                "url": `api/v1/counties/`,
                "search_field": "name",
                "edit_display_name": "item_name",
                "res_value_field": "county"
            },
            "sub_county_id": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Sub County",
                "display_name": "name",
                "placeholder": "Search Sub County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": false,
                "url": `api/v1/sub-counties/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "search": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Search ",
                "display_name": "name",
                "placeholder": "Search county name..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/sub-counties/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "paginator": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Mode",
                "default": "pa",
                "choices": [
                    { "value": "cursor", display_name: "Preview" },
                    { "value": "pa", display_name: "Detailed" },
                ]
            },
            "school_id": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by School",
                "display_name": "name",
                "placeholder": "Search School Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/schools/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "reason": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Reason",
                "display_name": "name",
                "placeholder": "Search Reason Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/students-absent-reasons/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "special_needs": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Special Needs",
                "display_name": "name",
                "placeholder": "Search Special Need ..",
                "value_field": "id",
                "edit_source_field": "items_details",
                "multiple": true,
                "url": `api/v1/special-needs/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            }
        }
    }
}

export {
    filterOptions
}