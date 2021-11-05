module.exports = {
    userQuerySearch: async (_search) => {
        let querySearch = {
            "$or": []
        };
        querySearch["$or"].push(
            {
                name: { $regex: ".*" + _search + ".*" },
                isDelete: false

            },
            {
                country: { $regex: ".*" + _search + ".*" },
                isDelete: false

            },
            {
                actionType: { $regex: ".*" + _search + ".*" },
                isDelete: false
            }
        )

        return querySearch

    }
}