import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';
import fs from 'fs'
export default function logger(req:Request, res:Response, next:NextFunction) {
    const text = `Peticion: ${req.method} - ${req.url} - ${new Date().toLocaleString('es-ES')}`;
    console.log(chalk.blue(text));
    fs.writeFileSync('log.txt', text + '\n');
    next();
}