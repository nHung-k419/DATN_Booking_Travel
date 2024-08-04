import Connection from '../../Config/db/index.js'
import Tour from '../Models/Tour.js';
import { ObjectId } from 'mongodb';
class Tour_Controller {
    Create_Tour(req, res, next) {
        const { id_Category, Name_Tour, Price_Tour, Image_Tour, Title_Tour, Description_Tour, Outstanding_Tour, Start_Tour, End_Tour, total_Date } = req.body
        Connection.connect().then(async (db) => {
            try {
                const Create_Tour = new Tour(undefined, id_Category, Name_Tour, Price_Tour, Image_Tour, Title_Tour, Description_Tour, Outstanding_Tour, Start_Tour, End_Tour, total_Date)
                const result = await Create_Tour.CreateTour(db)
                if (result) return res.status(200).json({ message: 'Created Tour Success' })
            } catch (error) {
                console.log(error)
            }
        })
    }
    GetAllTour(req, res) {
        const { page, limit } = req.query
        Connection.connect().then(async (db) => {
            try {
                const AllTour = await Tour.ShowAll(db, parseInt(page), parseInt(limit))
                if (AllTour) {
                    return res.status(200).json({ Tours: AllTour })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
    DeleteTour(req, res, next) {
        const { id } = req.params
        Connection.connect().then(async (db) => {
            try {
                const Delete_Tour = await Tour.Delete(db, new ObjectId(id))
                if (Delete_Tour) {
                    return res.status(200).json({ message: "Delete Success" })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
    UpdateTour(req, res, next) {
        const { id } = req.params
        const { id_Category, Name_Tour, Price_Tour, Image_Tour, Title_Tour, Description_Tour, Outstanding_Tour, Start_Tour, End_Tour, total_Date } = req.body
        Connection.connect().then(async (db) => {
            try {
                const Update_Tour = new Tour(undefined, id_Category, Name_Tour, Price_Tour, Image_Tour, Title_Tour, Description_Tour, Outstanding_Tour, Start_Tour, End_Tour, total_Date)
                if (Update_Tour) {
                    const result = await Update_Tour.UpdateTour(db, new ObjectId(id))
                    if (result) return res.status(200).json({ message: "Update Success" })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
    SearchTour(req, res, next) {
        const { NameSearch, page, limit, PriceSearch } = req.query
        Connection.connect().then(async (db) => {
            try {
                const resultSearch = await Tour.Search(db, NameSearch, parseInt(PriceSearch), parseInt(page), parseInt(limit))
                if (resultSearch) return res.status(200).json({ search: resultSearch })
            } catch (error) {
                console.log(err)
            }
        })
    }
    DetailTour(req, res, next) {
        const { id } = req.params
        Connection.connect().then(async (db) => {
            try {
                const detailTour = await Tour.Detail(db, new ObjectId(id))
                if (detailTour) return res.status(200).json({ detailTour: detailTour })
            } catch (error) {
                console.log(error);
            }
        })
    }
}
export default new Tour_Controller()    