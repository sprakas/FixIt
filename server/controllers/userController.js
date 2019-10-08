const UserModal = require('../modals/usersModal')
const jwt = require('jsonwebtoken')
const Bcrypt = require('bcryptjs')

const login = async (req) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return { message: 'Please enter all the fields' }
        }
        let user = await UserModal.User.findOne({ email });
        if (!user) {
            return { message: 'User Does not exists!' }
        }
        let isValid = Bcrypt.compareSync(password, user.password)
        if (isValid) {
            const token = await jwt.sign({ _id: user.id }, 'secret');
            let data = {
                _id: user.id,
                name: user.name,
                email: user.email,
                token
            };
            return data
        }
        else {
            return { message: "The password is invalid" }
        }


    }
    catch (err) {
        return { message: err }
    }
}
const register = async (req) => {
    try {
        const { error } = UserModal.validateUser(req.body);
        if (error) {
            return { message: 'Enter All Fields' };
        }
        let user = await UserModal.User.findOne({ email: req.body.email });
        if (user) return { message: "User already registered" };

        user = new UserModal.User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        });
        await user.save();
        user.generateAuthToken();
        return ({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        return { message: err }
    }
}
module.exports = { login, register };