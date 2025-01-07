class Electronics {
    constructor(data) {
        this.seller_id = data.seller_id;
        this.name = data.name;
        this.description = data.description || ''; 
        this.category = 'electronics';
        this.price = data.price;
        this.stock = data.stock || 0; 
        this.status = data.status || 'active';  // Default to 'active'
        this.brand = data.brand; 
    }
}

module.exports = Electronics;
