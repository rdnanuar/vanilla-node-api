import { v4 } from 'uuid'
import products from '../data/product.json'
import {wirteDataToFile} from '../utils'

export const Product = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

export const findById = (productId) => {
    return new Promise((resolve, reject) => {
        const product = products.find(({id}) => id == productId )
        resolve(product)
    })
}
export const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct =  {
            id : v4(),
            ...product
        }
        products.push(newProduct)
        wirteDataToFile('./data/product.json', products)
        resolve(newProduct)
    })
}

export const updateProducts = (id, prod) => {
        return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...prod}
        wirteDataToFile('./data/product.json', products);
        resolve(products[index])
    })
}

export const deleteProducts = (id) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products.splice(index, 1)
        wirteDataToFile('./data/product.json', products);
        resolve(products[index])
    })
}