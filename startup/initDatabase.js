const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const categoriesMock = require('../mock/categories.json')
const subcategoriesMock = require('../mock/subcategories.json')

module.exports = async () => {
  const categories = await Category.find()
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock)
  }

  const subcategories = await Subcategory.find()
  if (subcategories.length !== subcategoriesMock.length) {
    await createInitialEntity(Subcategory, subcategoriesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  await Promise.all(
    data.map(async item => {
      try {
        const itemModel = new Model(item)
        await itemModel.save()
        return itemModel
      } catch(error) {
        return error
      }
     
    })
  )
}
