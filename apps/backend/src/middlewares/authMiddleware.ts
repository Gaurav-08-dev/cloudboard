import jwt from "jsonwebtoken"

import type {
    Request,
    Response,
    NextFunction
} from "express"

export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401)
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token!, process.env.JWT_SECRET!)

        //@ts-ignore
        req.user = decoded;
        next()

    } catch {

        res.sendStatus(403)
    }
}