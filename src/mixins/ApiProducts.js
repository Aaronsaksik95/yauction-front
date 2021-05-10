import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");
import VueJwtDecode from "vue-jwt-decode";

export default {
    methods: {
        get_products() {
            return fetch(`${apiConfigs.apiUrl}products`)
                .then(res => res.json())
        },
        get_regions() {
            return fetch('https://geo.api.gouv.fr/regions?fields=nom,code')
                .then(res => res.json())
        },
        get_product(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`)
                .then(res => res.json())
        },
        get_products_filter() {
            return fetch(`${apiConfigs.apiUrl}products/filter/vehicle?vehicle=${this.vehicle}&state=${this.state}&brand=${this.brand}&model=${this.model}&yearMin=${this.yearMin}&yearMax=${this.yearMax}&color=${this.color}&energy=${this.energy}&mileageMin=${this.mileageMin}&mileageMax=${this.mileageMax}&region=${this.region}&startingPriceMin=${this.startingPriceMin}&startingPriceMax=${this.startingPriceMax}`, {
            }).then(res => res.json())
        },
        get_products_vehicle() {
            return fetch(`${apiConfigs.apiUrl}products/vehicle/${this.vehicle}`, {
            }).then(res => res.json())
        },
        get_products_vehicle_admin() {
            return fetch(`${apiConfigs.apiUrl}products/vehicle/admin/${this.vehicle}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        get_products_user() {
            return fetch(`${apiConfigs.apiUrl}products/user/`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        add_product() {
            const decode = VueJwtDecode.decode(token)
            return fetch(`${apiConfigs.apiUrl}products`, {
                method: "POST",
                body: JSON.stringify({
                    image: this.image,
                    type: this.type,
                    state: this.state,
                    brand: this.brand,
                    model: this.model,
                    year: this.year,
                    color: this.color,
                    energy: this.energy,
                    mileage: this.mileage,
                    seat: this.seat,
                    region: this.region,
                    startingPrice: this.startingPrice,
                    description: this.description,
                    auctionEndDate: this.auctionEndDate,
                    user: decode.id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        update_product(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    image: this.product.image,
                    type: this.product.type,
                    state: this.product.state,
                    brand: this.product.brand,
                    model: this.product.model,
                    year: this.product.year,
                    color: this.product.color,
                    energy: this.product.energy,
                    mileage: this.product.mileage,
                    seat: this.product.seat,
                    region: this.product.region,
                    startingPrice: this.product.startingPrice,
                    description: this.product.description,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then((res) => res.json(
                    this.$router.push("/vehicle/voiture")
                ))
        },
        delete_product(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        get_countdown() {
            var current_date = new Date();
            var event_date = new Date(this.date).getTime();
            var total_seconds = (event_date - current_date) / 1000;
            var days = Math.floor(total_seconds / (60 * 60 * 24));
            var hours = Math.floor(
                (total_seconds - days * 60 * 60 * 24) / (60 * 60)
            );
            var minutes = Math.floor(
                (total_seconds - (days * 60 * 60 * 24 + hours * 60 * 60)) / 60
            );
            var seconds = Math.floor(
                total_seconds - (days * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60)
            );
            var and = "and"
            var word_day = "J";
            var word_hour = "H";
            var word_minute = "M";
            var word_second = "S";
            if (days == 0) {
                days = "";
                word_day = "";
            }
            else if (days == 1) {
                word_day = "J,";
            }
            if (hours == 0) {
                hours = "";
                word_hour = "";
            }
            else if (hours == 1) {
                word_hour = "H,";
            }
            if (minutes == 0) {
                minutes = "";
                word_minute = "";
            }
            else if (minutes == 1) {
                word_minute = "M,";
            }
            if (seconds == 0) {
                seconds = "";
                word_second = "";
                and = "";
            }
            else if (seconds == 1) {
                word_second = "S";
            }
            if (minutes == 0 && hours == 0 && days == 0) {
                and = "";
            }
            this.countDay = days
            this.countHours = hours
            this.countMinute = minutes
            this.countsecond = seconds

            setTimeout(this.getCountdown, 1000);
        }
    }
}
