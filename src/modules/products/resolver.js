import model from './model.js'
import path from 'path'
import fs from 'fs'

export default{
    Mutation: {
        addProduct: async (_, args, context) => {
            try {
                let {file} = args
                const { createReadStream, filename, mimetype, encoding } = await file
                const stream = createReadStream()
                let fileSize = stream._writeStream._writableState.length 
                fileSize = (fileSize / (1024 * 1024)).toFixed(2)
                if(fileSize > 5) throw new Error("Files size is not valid!")
                if(mimetype != "image/jpg" && mimetype != "image/jpeg" && mimetype != "image/png"){
                    throw new Error("File mymetype is not valid!")
                }
                let fileName = (Date.now() % 1000) + filename.trim()
                const fileAddress = path.join(process.cwd(), 'images', fileName)
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)
                args.img_url = fileName 
                const res = await model.addProduct(args)
                return {
                    status: 200,
                    message: "OK",
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message,
                }
            }
        },
        updateProduct: async(_, args, context) => {
            try {

                let {file} = args
                const { createReadStream, filename, mimetype, encoding } = await file
                const stream = createReadStream()
                let fileSize = stream._writeStream._writableState.length 
                fileSize = (fileSize / (1024 * 1024)).toFixed(2)
                if(fileSize > 5) throw new Error("Files size is not valid!")
                if(mimetype != "image/jpg" && mimetype != "image/jpeg" && mimetype != "image/png"){
                    throw new Error("File mymetype is not valid!")
                }
                let fileName = (Date.now() % 1000) + filename.trim()
                const fileAddress = path.join(process.cwd(), 'images', fileName)
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)
                args.img_url = fileName 

                const res = await model.updateProduct(args)
                if(res.length == 0) throw new Error("There is no such products!")
                return {
                    status: 200,
                    message: "OK",
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message,
                }
            }
        },
        deleteProduct: async(_, args, context) => {
            try {
                const res = await model.deleteProduct(args)
                if(res.length == 0) throw new Error("There is no such product!")
                return {
                    status: 200,
                    message: "OK",
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message,
                }
            }
        }
    },
    
    Query: {
        products: async (_, args) => {
            try{
                return await model.getProducts(args)
            }catch(error){
                return {
                    status: 400,
                    message: error.message,
                }
            }
        }
    }
}