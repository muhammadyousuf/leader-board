const User = require('../model/user-model');
const {  NotFoundError, InternalServerError, BadRequestError} = require("../helper/error");
const { Pagination } = require("../helper/pagination");
const { userQuerySearch } = require("../query/userQuery");


class UserService {
    constructor() {
     
    }
  
    async userCreate(body) {
        try {
            let user = new User(body);
            const saveUser = await user.save();
            return saveUser
        } catch (err) {
            throw new InternalServerError({ message: `user create error`, data: err });
        }
    }

    async userList(data) {
        try {
            let skip = data.query.skip;
            var mysort = { createdAt: -1 };
            let perPage = data.query.page;

            var _search =
                data.query.search == undefined || "" ? "" : data.query.search.trim();
            let querySearch = await userQuerySearch(_search)
            const users = await User.find(
                querySearch
            )
                .sort(mysort)
                .limit(parseInt(parseInt(perPage)))
                .skip(parseInt(_search ? 0 : skip * parseInt(perPage)));
            if (users.length >= 1) {

                const count = await User.countDocuments(querySearch);

                let pagination = perPage && skip ? await Pagination(count, perPage, skip) : {}
                return { users, pagination };
            } else {
                return { users };
            }

        }
        catch (err) {
            console.log(err);
            throw new InternalServerError(err);
        }
    }

    async userDetail(req) {
        const { id } = req.params;
        const data = await User.findOne({ id: id, isDelete: false })
        if (!data) {
            throw new NotFoundError({ message: `User is not available by this id: ${id}` });
        }
        data["isDelete"] = !data["isDelete"]
        await data.save();
        return data;
    }









    async userEdit(body, id) {
        try {
            const updates = Object.keys(body);
            const allowUpdates = ["point"];
            const isValidOperator = updates.every(update =>
                allowUpdates.includes(update)
            );
            if (!isValidOperator) {
                throw new BadRequestError({ message: `Invalid key argument` });

            }
            let user;

            user = await User.findOne({
                isDelete: false,
                id: id
            })
            if (user)
                user = await User.findOneAndUpdate({ id: id }, { $set: body }, { new: true, runValidators: true })
            else
              throw new NotFoundError({message: `user not found`})

            return user;
        }
        catch (err) {
            if (err.status === 404 || err.status === 400)
                return err;
            else
                throw new InternalServerError({ message: 'error in editing', data: err })
        }
    }



}


module.exports = UserService;