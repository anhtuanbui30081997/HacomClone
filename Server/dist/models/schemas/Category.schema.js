"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(category) {
        this._id = category._id;
        this.name = category.name;
        this.category = category.category;
        this.parent_category = category.parent_category;
    }
}
exports.Category = Category;
