const dynamoose = require('dynamoose')
const uuid = require('uuid')

dynamoose.AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-1'
})

const notasModel = dynamoose.model(
    // Nome Tabela
    'nota', 
    // Schema
    {
        id: {type: String, hashKey: true}, 
        name: String
    }
)

module.exports.cadastrar = async name => {
    const nota = new notasModel({id: uuid.v1(), name})
    return await nota.save()
}

module.exports.getId = async id => {
    return await notasModel.queryOne("id").eq(id).exec()
}

module.exports.count = async () => {
    const count = await notasModel.scan().count().exec()
    return count[0]
}

module.exports.update = async (id, name) => {
    return await notasModel.update({id, name})
}

module.exports.list = async () => {
    return await notasModel.scan().exec()
}

module.exports.delete = async id => {
    return await notesModel.delete(id)
}