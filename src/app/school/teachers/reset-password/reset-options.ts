const options = {
    "name": "Reset Teacher Password",
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
            "username": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "School Nemis Code / Teacher's Phone Number",
                "max_length": 150
            },
            "new_password": {
                "type": "string",
                "required": false,
                "obscure": true,
                "read_only": false,
                "label": "New Password",
                "max_length": 150
            },
        }
    }
}

export {
    options
}