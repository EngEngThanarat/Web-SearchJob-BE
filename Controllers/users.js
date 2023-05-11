import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ Message: error.Message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { Email } = req.params
        const user = await prisma.users.findUnique({
            where: {
                Email: Email
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {

    try {
        const { Email, password } = req.body
        const user = await prisma.users.findUnique({
            where: {
                Email
            },
            select: {
                Email: true,
                Password: true,
            }
        })
        if (!Email) {
            return res.status(400).json({ message: "Email not found" })
        }
        if (user.Password != password) {
            return res.status(400).json({ message: "Password incorrect" })
        }
        const { Password, ...rest } = user
        return res.status(200).json(rest)
    } catch (error) {
        return res.status(500).json({ message: e.message })
    }
}

export const createUser = async (req, res) => {

    try {
        const { Email, Password, Name, Lastname, Address, Telephone, Nationality } = req.body
        const userExists = await prisma.users.findUnique({
            where: {
                Email
            }, select: {
                Email: true,
            }
        })
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" })
        }

        const user = await prisma.users.create({
            data: {
                Email,
                Password,
                Name,
                Lastname,
                Address,
                Telephone,
                Nationality,
            }, select: {
                Email: true,
            }
        })
        return res.status(201).json(user)
    } catch (e) {
        console.log({ e });
        return res.status(500).json({ message: e.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { Email } = req.params
        const { Name, Lastname, Address, Telephone, Nationality, } = req.body
        const user = await prisma.users.update({
            where: {
                Email: Email
            }, data: {
                ...(Name && { Name }),
                ...(Lastname && { Lastname }), 
                ...(Address && { Address }), 
                ...(Telephone && { Telephone }), 
                ...(Nationality && { Nationality }), 
            }, select: {
                Email: true,
                Name: true
            }
        })
        return res.status(200).json(user)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { Email } = req.params
        await prisma.users.delete({
            where: {
                Email: Email
            }
        })
        return res.status(200).json({ message: "Delete user successfully" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}