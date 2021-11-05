const UserService = require("../services/user.service");
const { OKSuccess } = require("../helper/success");
const { NotFoundError } = require("../helper/error");



module.exports.userCreate = async (req, res) => {
    try {
        const { body } = req;
        const userService = new UserService();
        const user = await userService.userCreate(body);
        const success = new OKSuccess("Successfully Added the user", user);
        res.status(success.status).send(success);
    }
    catch (err) {
        console.log(err);
        res.status(err.status).send(err);
    }
}

module.exports.userList = async (req, res) => {
    try {
        let result = await new UserService().userList(req);
        let response;

        if (result?.users?.length)
            response = new OKSuccess("Successfully Retrive the users", result);
        else
            response = new NotFoundError({ mesg: "No user in the database" });

        res.status(response.status).send(response);

    }
    catch (err) {
        console.log("error", err)
        res.status(500).send(err);
    }
}




module.exports.userStatus = async (req, res) => {
    try {
        const user = await new UserService().userDetail(req);
        const success = new OKSuccess({ message: "User Information updated", user });
      
        return res.status(success.status).send(success);
    }
    catch (err) {
      
        return res.status(err.status).send(err);
    }
}






module.exports.userEdit = async (req, res) => {
    try {
        const { body, params} = req;
        const {id} = params
        const data = await new UserService().userEdit(body, id);
        if (data.status === 404  || data.status === 400) {
     
            return res.status(data.status).send(data);
        }
       
        const success = new OKSuccess({ message: "user Information updated ", data });
        return res.status(success.status).send(success);
    }
    catch (err) {
        console.log("err", err)

        return res.status(err.status).send(err);
    }
}



