
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
            "county": {
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
            "sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Filter by Sub county",
                "display_name": "name",
                "placeholder": "Search Sub County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",

                "url": `api/v1/sub-counties/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            },
            "emis_code": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Filter by Emis Code",
                "max_length": 45
            },

        }
    }
}

export {
    filterOptions
}