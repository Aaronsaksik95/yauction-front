import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        get_brands() {
            return fetch(`${apiConfigs.apiUrl}brands`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        get_brand(id) {
            return fetch(`${apiConfigs.apiUrl}brands/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        add_brand() {
            return fetch(`${apiConfigs.apiUrl}categories`, {
                method: "POST",
                body: JSON.stringify({
                    title: this.brand,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())

        }
    }
}