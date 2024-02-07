//// BACK DO MEU PROJECT-REACT

const express = require('express');  // Importa o módulo 'express' para a variável express
const uuid = require('uuid'); // Importa o módulo 'uuid' para gerar identificadores únicos
const cors = require('cors');  // Importa o módulo 'cors' para lidar com políticas de compartilhamento de recursos entre diferentes origens

const port = 3002;   // Define a porta em que o servidor irá escutar as requisições
const app = express();  // Inicializa o aplicativo Express
app.use(express.json());   // Adiciona o middleware para interpretar corpos de solicitação no formato JSON
app.use(cors());  // Adiciona o middleware para permitir solicitações de origens diferentes (Cross-Origin Resource Sharing)




// Cria um array vazio para armazenar os usuários
const users = [];

                // Define um middleware para verificar se um usuário com o ID especificado existe
const checkUserId = (request, response, next) => {
    const { id } = request.params;

    
    const index = users.findIndex(user => user.id === id);  // Procura pelo índice do usuário com o ID especificado no array de usuários

    
    if (index < 0) {  // Se o índice for menor que zero, significa que o usuário não foi encontrado
        return response.status(404).json({ error: "User not Found" });
    }

    // Adiciona o índice do usuário e o ID à requisição para uso posterior
    request.userIndex = index;
    request.userId = id;


    // Chama a próxima função de middleware na pilha
    next();
};

// Rota para buscar todos os usuários
app.get('/users', (request, response) => {
    return response.json(users);
});

// Rota para criar um novo usuário
app.post('/users', (request, response) => {
    const { name, age } = request.body;

    
    const user = { id: uuid.v4(), name, age }; // Cria um novo usuário com um ID único gerado pelo módulo 'uuid'

    
    users.push(user); // Adiciona o novo usuário ao array de usuários

    
    return response.status(201).json(user); // Retorna o novo usuário como resposta com o status 201 (Created)
});

// Rota para atualizar um usuário existente
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body;
    const index = request.userIndex;
    const id = request.userId;

    
    const updateUser = { id, name, age };  // Cria um objeto com os novos dados do usuário

   
    users[index] = updateUser;   // Substitui o usuário existente pelo usuário atualizado no array de usuários

    
    return response.json(updateUser); // Retorna o usuário atualizado como resposta
});



// Rota para excluir um usuário existente
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex;

    
    users.splice(index, 1);  // Remove o usuário do array de usuários

    
    return response.status(204).json();  // Retorna uma resposta com o status 204 (No Content) indicando que a operação foi bem-sucedida
});



// Inicia o servidor na porta especificada e exibe uma mensagem indicando que o servidor está ativo
app.listen(port, () => {
    console.log(`🚀server stardet on port ${port}`);
});






