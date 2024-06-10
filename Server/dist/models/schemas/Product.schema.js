"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongodb_1 = require("mongodb");
class Product {
    constructor(product) {
        this._id = product._id || new mongodb_1.ObjectId();
        this.name = product.name;
        this.specifications = product.specifications;
        this.old_price = product.old_price;
        this.new_price = product.new_price;
        this.guarantee = product.guarantee;
        this.categories = product.categories;
        this.showrooms = product.showrooms;
        this.images = product.images;
        this.product_code = product.product_code;
        this.rating = product.rating || 0;
        this.number_rating = product.number_rating || 0;
        this.comments = product.comments || 0;
        this.views = product.views || 0;
        this.group = product.group || 'laptop';
    }
}
exports.Product = Product;
