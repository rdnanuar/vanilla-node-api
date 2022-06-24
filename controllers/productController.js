import {Product, findById, create, updateProducts} from '../models/productModel'
import {getPostData} from '../utils'
/**
 * @route GET /api/products
 * @desc Gets ALl products
 */ 
export const getProducts = async(req, res) => {
    try {
    res.writeHead(200, {
        "Content-Type" : "application/json"
    })
    res.end(JSON.stringify(await Product()))
    } catch (error) {
        console.log(error)
    }
}

/**
 * @route GET /api/products/:id
 * @desc Gets Single products
 */ 
export const getProduct = async(req, res, id) => {
    try {
        const product = await findById(id)
        if(!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify({
                message : `Data with id ${id} not found`
            }))
        }
        else {
            res.writeHead(200, 
            {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * @route POST /api/products/
 * @desc Create new data with id uuidv4
 */ 
export const createProduct = async(req, res) => {
    try {
        const body = await getPostData(req)
        
        const {tittle, description, price} = JSON.parse(body)

        const product = {
            tittle,
            description,
            price
        }

        const newProduct = await create(product)
        res.writeHead(201, {
            "Content-Type" : "application/json"
        })
        res.end(JSON.stringify(newProduct))
    } catch (error) {
        
    }
}

export const updateProduct = async(req, res, id) => {
    try {
        const productId = await findById(id)
        if(!productId) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify({
                message : `Data with id ${id} not found`
            }))
        }
        else {
            const body = await getPostData(req)

            const {tittle, description, price} = JSON.parse(body)

            const productData = {
                tittle : tittle || productId.tittle,
                description: description || productId.description,
                price: price || productId.price
            }

            const updProduct = await updateProducts(id, productData)
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(updProduct))
        }
    } catch (error) {
        console.log(error)
    }
}


