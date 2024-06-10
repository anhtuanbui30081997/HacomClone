"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Laptop = void 0;
const mongodb_1 = require("mongodb");
class Laptop {
    constructor(laptop) {
        this._id = laptop._id || new mongodb_1.ObjectId();
        this.product_code = laptop.product_code;
        this.brand = laptop.brand;
        this.style = laptop.style;
        this.color = laptop.color;
        this.laptop_category = laptop.laptop_category;
        this.cpu = laptop.cpu;
        this.ram = laptop.ram;
        this.vga = laptop.vga;
        this.size_screen = laptop.size_screen;
        this.screen_resolution = laptop.screen_resolution;
        this.touch_screen = laptop.touch_screen;
        this.screen_frequency = laptop.screen_frequency;
        this.operation_system = laptop.operation_system;
    }
}
exports.Laptop = Laptop;
