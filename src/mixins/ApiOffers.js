import apiConfigs from "../configs/api.configs";
import VueJwtDecode from "vue-jwt-decode";
import { loadStripe } from "@stripe/stripe-js";
const token = localStorage.getItem("token");

export default {
    methods: {
        offer(newPrice) {
            if (token) {
                const decode = VueJwtDecode.decode(token)
                return fetch(`${apiConfigs.apiUrl}offers`, {
                    method: "POST",
                    body: JSON.stringify({
                        offeredPrice: newPrice,
                        user: decode.id,
                        product: this.product._id
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: token
                    },
                }).then((res) => res.json(
                    localStorage.removeItem('product'),
                    localStorage.removeItem('price')
                ))
            } else {
                this.$router.push("./login");
            }

        },
        async stripeOrder() {
            const stripePromise = loadStripe("pk_test_51IYBNvEQHZJwGPKJsBVhHzLtgNp955e6drYz0RILC0zOfwZGYny4lG8DLyN5GmRornKBXXKkKLbb51PgsMEnY1GQ007qQCwhJq");
            const stripe = await stripePromise;
            const response = await fetch(
                `${apiConfigs.apiUrl}create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        amount: this.product.startingPrice * 100,
                    }),
                }
            );
            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        },
        get_offer(id) {
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        get_my_offers() {
            return fetch(`${apiConfigs.apiUrl}offers/status/${this.$route.params.status}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        get_product_offers() {
            return fetch(`${apiConfigs.apiUrl}offers/product/${this.$route.params.product}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        get_user_offers() {
            return fetch(`${apiConfigs.apiUrl}offers/user/${this.$route.params.user}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        delete_order(id) {
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        update_status(id) {
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    status: this.status
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                }
            }).then((res) => res.json(
            ))
        }
    }
}