import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getSearchByQuery = async (req, res) => {
    try {
        const {Business_Name , role} = req.query
        const requitment = await prisma.requitment.findMany({
            where:{
                OR:[{
                    Business_Name
                }, {
                    role
                }]
            }
        })
        return res.status(200).json(requitment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
