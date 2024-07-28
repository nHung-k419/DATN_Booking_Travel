import Connection from '../../Config/db/index.js'
import Categories from '../Models/Categories.js';
import { ObjectId } from 'mongodb';
class Categories_Controller {
    GetAllCategory(req, res, next) {
        Connection.connect().then(async (db) => {
            try {
                const AllCategories = await Categories.getAll(db)
                if (AllCategories) return res.status(200).json({ Categories: AllCategories })
            } catch (error) {
                console.log(error);
            }
        })
    }
    CreateCategory(req, res, next) {
        const { NameCate } = req.body
        Connection.connect().then(async (db) => {
            const CreateCategory = new Categories(undefined, NameCate)
            const result = await CreateCategory.Create(db)
            if (result) return res.status(200).json({ message: 'Create Success' })
        })
    }
    UpdateCategory(req, res, next) {
        const { id } = req.params
        const { NameCate } = req.body
        Connection.connect().then(async (db) => {
            try {
                const UpdateCategory = new Categories(undefined, NameCate)
                const result = await UpdateCategory.Update(db, new ObjectId(id))
                if (result) return res.status(200).json({ message: 'Update Success' })
            } catch (error) {
                console.log(error);
            }
        })
    }
    DeleteCategory(req, res, next) {
        const { id } = req.params
        Connection.connect().then(async (db) => {
            try {
                const DeleteCategory = Categories.Delete(db, new ObjectId(id))
                if (DeleteCategory) return res.status(200).json({ message: 'Delete Success' })
            } catch (error) {
                console.log(error);
            }
        })
    }
}
export default new Categories_Controller()