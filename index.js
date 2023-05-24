const express = require ('express')
const uuid = require('uuid')

const port = 3000
const app = express ()
app.use(express.json())

/*
        - Query params => meusite.com/users?nome=romulo23&age=28       // FILTROS
        - Routr params => /users/2       // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
        - Request body => { "name": "Romulo", "age":}

        - GET          => Buscar informação no back-end
        - POST         => Criar informaçãoo no back-end
        - PUT / PATH   => Alterar/Atualixar informação no back-end
        - DELETE       => Deletar informação no back-end

        -Middleware => INTERCEPITADOR => Tm o poder de parar ou alterar dados da requisição

*/

const users = []

const checkUserId = ( request, response, next) =>{
   const {id} = request.params 
    
   const index = users.findIndex( user => user.id === id)

   if(index < 0){
       return response.status(404).json ({ error: "User not Found"})
   }

   request.userIndex = index
   request.userId = id
   next()

}

app.get('/users', (request, response) =>{
  return response.json(users)
})


//BUSCANDO INFORMAÇÕES
app.get('/users', (request, response) => {  // apos o '/' voce coloca o nome que quisr da pasta, obs: toda edição precisa ir la no terminal e rodar novamente 
        //importante sempre colocar o ':' e apos o nome que deseja nesse caso coloquei ':id'
    return response.json(users)
})




// CRIANDO INFORMAÇÃO
app.post('/users', (request, response) => {
    const {name, age} = request.body


 //Alterar/Atualizar informação
    const user = { id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})





// ATUALIZAR USUARIO
app.put('/users/:id',checkUserId, (request, response) => {
    //const {id} = request.params
    const { name,age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}



    users[index] = updateUser
    
    return response.json(updateUser)
 
})

app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1) 

    return response.status(204).json()
})


/// npm run dev

 /* 
    const{ name, age, } = request.query
    return response.json({name, age}) // se a chave e o valor for igual pra economizar codigo ({name, age })
*/


app.listen (port, () =>{
    console.log(`🚀server stardet on port ${port}`) //digite Windows tecla do logotipo + . (ponto) pra emoji
})