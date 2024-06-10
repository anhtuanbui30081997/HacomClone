"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./database.service"));
const Category_schema_1 = require("../models/schemas/Category.schema");
class CategoryService {
    async createCategory(categoryBody) {
        const { category, name, parent_category } = categoryBody;
        const result = await database_service_1.default.categories.insertOne(new Category_schema_1.Category({
            name,
            category,
            parent_category
        }));
        return result;
    }
    async getCategories(parent_category) {
        const result = await database_service_1.default.categories
            .find({
            parent_category: parent_category
        })
            .toArray();
        return result;
    }
    async getAllCategories(parent_category) {
        const categories = [];
        let i = 0;
        // get all categories of root node
        const result = await database_service_1.default.categories
            .find({
            parent_category: parent_category
        })
            .toArray();
        categories.push(...result);
        while (i < categories.length) {
            const categoryChild = await database_service_1.default.categories
                .find({
                parent_category: categories[i].category
            })
                .toArray();
            if (categoryChild.length > 0) {
                categories.splice(i, 1, ...categoryChild);
            }
            else {
                i++;
            }
        }
        return categories;
    }
    async getAllParentCategories(categoryType) {
        const parentCategories = [];
        // get current category
        const category = await database_service_1.default.categories.findOne({
            category: categoryType
        });
        if (category) {
            parentCategories.push(category);
        }
        while (parentCategories[0].parent_category !== 0) {
            const tempCategory = await database_service_1.default.categories.findOne({
                category: parentCategories[0].parent_category
            });
            if (tempCategory) {
                parentCategories.unshift(tempCategory);
            }
        }
        return parentCategories;
    }
}
const categoryService = new CategoryService();
exports.default = categoryService;
