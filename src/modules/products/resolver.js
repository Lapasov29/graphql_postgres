import model from './model.js'
import path from 'path'
import fs from 'fs'

export default{
    Mutation: {
        addProduct: async (_, args) => {
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
                console.log(12, args);
                // await finished(out)
                const res = await model.addProduct(args)
                console.log(13, res);
                return {
                    status: 200,
                    message: "OK",
                    product: res
                }
            } catch (error) {
                console.log(error.message);
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },
        updateProduct: async(_, args) => {
            try {
                console.log(args);
                const res = await model.updateProduct(args)
                console.log(res);
                return {
                    status: 200,
                    message: "OK",
                    category: res[0]
                }
            } catch (error) {
                console.log(error.message);
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },
        deleteProduct: async(_, args) => {
            try {
                const res = await model.deleteProduct(args)
                console.log(res);
                return {
                    status: 200,
                    message: "OK",
                    category: res[0]
                }
            } catch (error) {
                console.log(error.message);
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        }
    },
    
    Query: {
        products: async (_, args) => {
            try{
                return await model.getProducts(args)
            }catch(error){
                console.log(error);
            }
        }
    }
}