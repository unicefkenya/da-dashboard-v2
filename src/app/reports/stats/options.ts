
const filterOptions = {
    "name": "Learner Api",
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
            "active": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by In School",
                "choices": [
                    {
                        value: true,
                        display_name: "In School"
                    },
                    {
                        value: false,
                        display_name: "Dropout"
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
                        display_name: "No Grouping",
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
                        value: "sub-county",
                        display_name: "Sub County"
                    },
                    {
                        value: "partner",
                        display_name: "Partner"
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
                        value: "age",
                        display_name: "Age"
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
                        value: "day",
                        display_name: "Day"
                    },
                    {
                        value: "duplicate",
                        display_name: "DLCT"
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
            "no_special_needs": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by Learners With / Without Special Needs",
                "choices": [
                    {
                        value: false,
                        display_name: "With Special Needs"
                    },
                    {
                        value: true,
                        display_name: "Without Special Needs"
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
            "special_needs": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Special Need",
                "display_name": "name",
                "placeholder": "Search Special Need ..",
                "value_field": "id",
                "url": `api/v1/special-needs/`,
                "default": null,
                "search_field": "name",
            },
            "school_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by County",
                "display_name": "name",
                "placeholder": "Search County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",

                "url": `api/v1/counties/`,
                "search_field": "name",
                "edit_display_name": "item_name",
                "res_value_field": "county"
            },
            "school_sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Sub County",
                "display_name": "name",
                "placeholder": "Search Sub County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",

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
            "start_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Filter by Start Date",
                "placeholder": "Search Start Date .."
            },
            "end_date": {
                "type": "date",
                "required": false,
                "read_only": false,
                "label": "Filter by End Date",
                "placeholder": "Search End Date .."
            },
            "status": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter by Status",
                "display_name": "name",
                "value_field": "value",
                "placeholder": "Search Learner Status ..",
                "choices": [
                    {
                        "value": "OOSC",
                        "display_name": "Dropped Out"
                    },
                    {
                        "value": "NE",
                        "display_name": "Never Been To School"
                    },
                    {
                        "value": "PE",
                        "display_name": "Already Enrolled"
                    }
                ]
            },
            "school": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by School",
                "display_name": "name",
                "placeholder": "Search School Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",

                "url": `api/v1/schools/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "is_training_school": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Show Training School Data",
                "default": "false",
                "choices": [
                    { "display_name": "Yes", "value": true },
                    { "display_name": "No", "value": false },
                ]
            },

            "partner": {
                "type": "field",
                "required": false,
                "read_only": false,
                "label": "Filter By Partner",
                "placeholder": "Select Partner",
                "choices": [

                    {
                        value: 10713,
                        display_name: "Werk"
                    },
                    {
                        value: 10714,
                        display_name: "FCA"
                    },
                    {
                        value: 10715,
                        display_name: "LISP"
                    },
                    {
                        value: 10716,
                        display_name: "Special Olympics"
                    },
                    {
                        value: 10717,
                        display_name: "Save The Children"
                    },
                    {
                        value: 10718,
                        display_name: "IRCK"
                    },
                    {
                        value: 10719,
                        display_name: "Qatar Charity"
                    },
                    {
                        value: 12563,
                        display_name: "HIWYA"
                    },
                    {
                        value: 8972,
                        display_name: "CDE BARINGO"
                    },
                    {
                        value: 8973,
                        display_name: "	CDE BUNGOMA"
                    },
                    {
                        value: 8974,
                        display_name: "CDE GARISSA"
                    },
                    {
                        value: 8975,
                        display_name: "CDE ISIOLO"
                    },
                    {
                        value: 8976,
                        display_name: "CDE KAJIADO"
                    },
                    {
                        value: 8977,
                        display_name: "CDE KILIFI"
                    },
                    {
                        value: 8978,
                        display_name: "CDE KWALE"
                    },
                    {
                        value: 8979,
                        display_name: "CDE MANDERA"
                    },
                    {
                        value: 8980,
                        display_name: "CDE MARSABIT"
                    },
                    {
                        value: 8981,
                        display_name: "CDE NAIROBI"
                    },
                    {
                        value: 8982,
                        display_name: "CDE NAROK"
                    },
                    {
                        value: 8983,
                        display_name: "CDE SAMBURU"
                    },
                    {
                        value: 8984,
                        display_name: "CDE TANARIVER"
                    },
                    {
                        value: 8985,
                        display_name: "CDE TURKANA"
                    },
                    {
                        value: 8986,
                        display_name: "CDE WAJIR"
                    },
                    {
                        value: 8987,
                        display_name: "CDE WESTPOKOT"
                    }
                ]
            }

        }
    }
}

export {
    filterOptions
}