
import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
        next()
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

export default verifyAuthToken