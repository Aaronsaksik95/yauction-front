export default {
    methods: {
        add_whish(product) {
            const newItem = {
                _id: product._id,
                brand: product.brand.title,
                model: product.model.title,
                year: product.year,
                startingPrice: product.startingPrice,
                image: product.image
            }
            var whish = JSON.parse(localStorage.getItem('whish')) || [];
            const alreadyExisting = (el) => el._id === product._id;
            const index = whish.findIndex(alreadyExisting);
            if (index !== -1) {
                localStorage.setItem('whish', JSON.stringify(whish))
            }
            else {
                whish.push(newItem)
                localStorage.setItem('whish', JSON.stringify(whish))
            }
        },

        get_whish() {
            return JSON.parse(localStorage.getItem('whish'))
        },

        remove_item_whish(product) {
            var whish = JSON.parse(localStorage.getItem('whish'))
            const removeWithIndex = (el) => el._id === product._id;
            const index = whish.findIndex(removeWithIndex);
            whish.splice(index, 1)
            localStorage.setItem('whish', JSON.stringify(whish))
            if (whish.length == 0) {
                this.remove_whish()
            }
            else {
                document.location.reload();
            }
        },
        remove_whish() {
            localStorage.removeItem('whish');
            document.location.reload();
        },
    }
}