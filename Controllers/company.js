import { PrismaClient } from '@prisma/client'
import * as fs from "fs";

const prisma = new PrismaClient()

export const getRequitments = async (req, res) => {
    try {
        const requitments = await prisma.requitment.findMany()
        return res.status(200).json(requitments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getRequitment = async (req, res) => {
    try {
        const { name } = req.params
        const requitment = await prisma.requitment.findUnique({
            where: {
                Business_Name: name
            }
        })
        return res.status(200).json(requitment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createRequitment = async (req, res) => {
    try {
        const { Business_Name, Address, Detail, role, Work_Location, status } = req.body

        const requitment = await prisma.requitment.create({
            data: {
                Business_Name, 
                Address,
                Detail, 
                Work_Location, 
                role, 
                status:"รับสมัคร",
            }, select: {
                Business_Name: true,
            }
        })
        return res.status(201).json(requitment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateRequitment = async (req, res) => {
    try {
        const { Business_Name } = req.params
        const { Address, Date, Detail, role, Work_Location, status } = req.body
        let logo = null
        if (req.file) {
            logo = req.file.path
        }
        const requitment = await prisma.requitment.update({
            where: {
                Business_Name: Business_Name
            }, data: {
                ...(Address && { Address }), ...(Date && { Date }), ...(Detail && { Detail }), ...(role && { role }),...(Work_Location && { Work_Location }), ...(status && { status }),
            }, select: {
                Business_Name: true,
            }
        })
        return res.status(200).json(requitment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteRequitment = async (req, res) => {
    try {
        const { Business_Name } = req.params
        await prisma.requitment.delete({
            where: {
                Business_Name: Business_Name
            }
        })
        return res.status(200).json({ message: "Delete user successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}