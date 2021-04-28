import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        get_models_brand(id) {
            return fetch(`${apiConfigs.apiUrl}models/brand/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        get_model(title) {
            return fetch(`${apiConfigs.apiUrl}models/title/${title}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        get_model_id(id) {
            return fetch(`${apiConfigs.apiUrl}models/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        add_model() {
            return fetch(`${apiConfigs.apiUrl}categories`, {
                method: "POST",
                body: JSON.stringify({
                    title: this.model,
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