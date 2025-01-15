import UserModel from '../models/usermodel.js'


export const createUser = async ({
    email, password
}) => {
    if (!email || !password) {
        throw new Error("Email and Password are required")
    }
    const hashPassword = await UserModel.hashPassword(password);

    const user = await UserModel.create({
        email,
        password: hashPassword
    });

    return user;
}

export const getAllUsers = async ({ userId }) => {
    const users = await UserModel.find({
        _id: { $ne: userId }
    });
    return users;
}