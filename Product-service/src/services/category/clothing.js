class Clothing {
    constructor(data) {
        this.seller_id = data.seller_id;
        this.name = data.name;
        this.description = data.description || '';
        this.category = 'clothing';
        this.price = data.price;
        this.stock = data.stock || 0;
        this.status = data.status || 'active';
        this.size = data.size;
    }
}

module.exports = Clothing;
