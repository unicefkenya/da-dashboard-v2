
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
            "sub_county": {
                "type": "multifield",
                "required": false,
                "read_only": false,
                "label": "Sub county",
                "display_name": "name",
                "placeholder": "Search Sub County Name ..",
                "value_field": "id",
                "edit_source_field": "items_details",

                "url": `api/v1/sub-counties/`,
                "search_field": "name",
                "edit_display_name": "item_name"
            }

        }
    }
}

export {
    filterOptions
}