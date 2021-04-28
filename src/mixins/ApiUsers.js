import apiConfigs from "../configs/api.configs"
import VueJwtDecode from "vue-jwt-decode";
const token = localStorage.getItem("token");

export default {
    methods: {
        is_admin(){
            const decode = VueJwtDecode.decode(token)
            return decode.isAdmin
        },
        get_users() {
            return fetch(`${apiConfigs.apiUrl}users`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        get_user() {
            const decode = VueJwtDecode.decode(token)
            return fetch(`${apiConfigs.apiUrl}users/${decode.id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
            
        },
        get_user_admin(id) {
            return fetch(`${apiConfigs.apiUrl}users/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        delete_user(id) {
            return fetch(`${apiConfigs.apiUrl}users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        update_user() {
            const decode = VueJwtDecode.decode(token)
            return fetch(`${apiConfigs.apiUrl}users/${decode.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address,
                    city: this.user.city,
                    postalCode: this.user.postalCode,
                    country: this.user.country
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
        },
        update_user_admin(id) {
            return fetch(`${apiConfigs.apiUrl}users/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address,
                    city: this.user.city,
                    postalCode: this.user.postalCode,
                    country: this.user.country,
                    isAdmin: this.user.isAdmin
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
        },
    }
}