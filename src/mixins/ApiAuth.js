import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        signupUser() {
            return fetch(`${apiConfigs.apiUrl}users`, {
                method: "POST",
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                    address: this.address,
                    city: this.city,
                    postalCode: this.postalCode,
                    country: this.country,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then((res) => res.json())
        },
        loginUser() {
            return fetch(`${apiConfigs.apiUrl}users/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
                .then((res) => res.json())
        }

    }
}