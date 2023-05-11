import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getcheckapplicants = async (req, res) => {
    try{
        const checkapplicants = await prisma.checkapplicants.findMany()
        return res.status(200).json(checkapplicants)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const getcheckapplicant = async ( req, res) => {
    try{
        const {id} = req.params
        const checkapplicants = await prisma.checkapplicants.findUnique({
            where:{
                id:parseInt(id)
            }
        })
        return res.status(200).json(checkapplicants)
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const createApplicant = async (req, res) => {
    try{
        const { UserEmail , BusinessName } = req.body

        const Applicant = await prisma.checkapplicants.create({
            data:{
                UserEmail,
                BusinessName,
                status:"รับสมัคร",
            }, select: {
                id : true,
            }
        })
        return res.status(201).json(Applicant)
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}

export const updateCheckapplicants = async (req, res) => {
    try {
        const {id} = req.params
        const { status } = req.body
        const checkapplicants = await prisma.checkapplicants.update({
            where:{
                id: parseInt(id)
            }, data: {
                ...(status && { status }),
            }
        })
        return res.status(200).json(checkapplicants)
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
}

export const deleteCheckapplicant = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.checkapplicants.delete({
            where:{
                id: parseInt(id)
            }
        })
        return res.status(200).json({message: "Delete Applicant success"})
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
}