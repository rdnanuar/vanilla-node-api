import fs from 'fs'

export const wirteDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) throw err
    })

}

export const getPostData = (req) => {
    return new Promise((resolve, reject)=> {
        try {
            let body  = ""
            req.on("data", (chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}