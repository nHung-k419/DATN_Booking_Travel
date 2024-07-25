class Tour {
    constructor(_id, Name_Tour, Type_Tour, Price_Tour, Image_Tour, Title_Tour, Description_Tour, Outstanding, Start_Tour, End_Tour, total_Date) {
        this._id = _id
        this.Name_Tour = Name_Tour
        this.Type_Tour = Type_Tour
        this.Price_Tour = Price_Tour
        this.Image_Tour = Image_Tour
        this.Title_Tour = Title_Tour
        this.Description_Tour = Description_Tour
        this.Outstanding_Tour = Outstanding
        this.Start_Tour = Start_Tour
        this.End_Tour = End_Tour
        this.total_Date = total_Date
    }

    async CreateTour(db) {
        try {
            const result_Create = await db.collection('Tours').insertOne(this)
            return result_Create
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    static async ShowAll(db, page, limit) {
        try {
            const ResultGetTours = await db.collection('Tours').find({})
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ Price_Tour: 1 })
                .toArray()
            const totalItems = await db.collection('Tours').countDocuments({})
            const response = ResultGetTours.map(item => new Tour(item._id, item.Name_Tour, item.Price_Tour, item.Image_Tour, item.Title_Tour, item.Description_Tour, item.Start_Tour, item.End_Tour))
            return {
                totalItems: totalItems,
                Page: page,
                TotalPages: Math.ceil(totalItems / limit),
                datas: [...response]
            }
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    static async Delete(db, id) {
        try {
            const Result_Delete = await db.collection('Tours').deleteOne({ _id: id })
            return Result_Delete
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    async UpdateTour(db, id) {
        try {
            if (id) {
                const result_Update = await db.collection('Tours').updateOne(
                    { _id: id },
                    {
                        $set: {
                            Name_Tour: this.Name_Tour,
                            Price_Tour: this.Price_Tour,
                            Image_Tour: this.Image_Tour,
                            Title_Tour: this.Title_Tour,
                            Description_Tour: this.Description_Tour,
                            Start_Tour: this.Start_Tour,
                            End_Tour: this.End_Tour
                        }
                    }
                )
                return result_Update
            }
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    static async Search(db, NameSearch, PriceSearch, page, limit) {
        try {
            const resultSearch = await db.collection('Tours')
                .find({
                    $or: [
                        { Name_Tour: { $regex: new RegExp(NameSearch, 'i') } },
                        { Price_Tour: { $regex: new RegExp(PriceSearch, 'i') } }
                    ]
                })
                .limit(limit)
                .sort({ Price_Tour: -1 })
                .toArray()
            // console.log(resultSearch);
            const totalItems = await resultSearch.length
            return {
                totalItems: totalItems,
                Page: page,
                TotalPages: Math.ceil(totalItems / limit),
                datas: [...resultSearch]
            }
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    static async Detail(db, id) {
        const resultDetail = await db.collection('Tours')
            .find({ _id: id })
            .sort({ Price_Tour: -1 })
            .toArray()
        return resultDetail
    }
}

export default Tour