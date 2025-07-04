#!/usr/bin/env node
import fs from 'node:fs'
import chalk from "chalk";
import path from 'node:path';


const directorio = process.argv[2] || '.'; //
console.log('ESTAS DENTRO DE', directorio) // el 3 parametro o ., que significa la carpeta donde estas

if(fs.existsSync(directorio)){
    const archivos = fs.readdirSync(directorio)
console.log(chalk.bgMagenta(`contenido de ${directorio}`));

let totalFiles = 0
    archivos.forEach((a) => {
        const archivoPath = path.join(directorio, a)
        const fileStat = fs.statSync(archivoPath)
        if(fileStat.isFile()){
            console.log(chalk.green(`ARCHIVO ${a} - KB: ${(fileStat.size / 1024).toFixed(2)} KB`));
            totalFiles++
        } else if (fileStat.isDirectory()){
            console.log(chalk.yellow(`CARPETA ${a}`));
            totalFiles++
        }

    })
    console.log(chalk.cyan('ARCHIVOS TOTALES',totalFiles)) 
} else {
    console.log(`el directorio ${directorio} no existe`) 
    process.exit(1)
}