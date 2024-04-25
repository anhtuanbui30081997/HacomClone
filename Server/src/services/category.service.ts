import { CategoryRequestBody } from '~/models/requests/Category.requests'
import databaseService from './database.service'
import { Category } from '~/models/schemas/Category.schema'
import { CategoryType } from '~/constants/enums'

class CategoryService {
  async createCategory(categoryBody: CategoryRequestBody) {
    const { category, name, parent_category } = categoryBody
    const result = await databaseService.categories.insertOne(
      new Category({
        name,
        category,
        parent_category
      })
    )
    return result
  }
  async getCategories(parent_category: CategoryType) {
    const result = await databaseService.categories
      .find({
        parent_category: parent_category
      })
      .toArray()
    return result
  }

  async getAllCategories(parent_category: CategoryType) {
    const categories = []
    let i = 0
    // get all categories of root node
    const result = await databaseService.categories
      .find({
        parent_category: parent_category
      })
      .toArray()
    categories.push(...result)
    while (i < categories.length) {
      const categoryChild = await databaseService.categories
        .find({
          parent_category: categories[i].category
        })
        .toArray()
      if (categoryChild.length > 0) {
        categories.splice(i, 1, ...categoryChild)
      } else {
        i++
      }
    }
    return categories
  }

  async getAllParentCategories(categoryType: CategoryType) {
    const parentCategories: Category[] = []
    // get current category
    const category = await databaseService.categories.findOne({
      category: categoryType
    })
    if (category) {
      parentCategories.push(category)
    }

    while (parentCategories[0].parent_category !== 0) {
      const tempCategory = await databaseService.categories.findOne({
        category: parentCategories[0].parent_category
      })
      if (tempCategory) {
        parentCategories.unshift(tempCategory)
      }
    }
    return parentCategories
  }
}

const categoryService = new CategoryService()
export default categoryService
