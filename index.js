const express = require('express');
const server = express();
server.use(express.json());

const usuarios = [];
let nextId = 0;

server.post('/usuarios', (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  const id = usuarios.length + 1;
  const cursos = [];

  usuarios.push({
    id,
    nome,
    idade,
    cursos,
  });

  return res.status(201).json(usuarios);
});

server.get('/usuarios', (req, res) => {
  return res.status(200).json(usuarios);
});

// server.put('/usuarios/:id', (req, res) => {
//   const id = req.params.id;
//   const idade = req.body.idade;
//   const cursos = req.body.cursos;

//   usuarios[id - 1].idade = idade;
//   usuarios[id - 1].cursos = cursos;

//   return res.status(201).json(usuarios);
// });

// server.delete('/usuarios/:id', (req, res) => {
//   const id = req.params.id;

//   let indice = -1;

//   usuarios.map((usuario, index) => {
//     if (usuario.id === Number(id)) {
//       indice = index;
//     }
//     return usuario;
//   });

//   if (indice === -1) {
//     return res
//       .status(400)
//       .json({ error: 'Não existe nenhum usuario com esse identificador! ' });
//   }

//   usuarios.splice(indice, 1);

//   return res.status(200).send();
// });

/*
    Listar os cursos 
*/
server.get('/usuarios/:id/cursos', (req, res) => {
  const id = req.params.id;
  let cursos = [];

  usuarios.map((usuario) => {
    if (usuario.id === Number(id)) {
      cursos = usuario.cursos;
    }
    return usuario;
  });

  return res.status(201).json(cursos);
});

/*
    Incluir um curso é necessário incluir apenas o curso. Ex: {"curso": "Maratona Dev - Stefanini"}
*/
server.post('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const curso = req.body.curso;
  let idCurso = nextId++;

  //usuarios[id - 1].cursos.length + 1;

  usuarios[id - 1].cursos.push({
    idCurso,
    curso,
  });
  return res.status(201).json(usuarios);
});

/*
    Para alterar de um curso é necessário informar, alem do id do usuário como parametro na rota o id do curso no body. 
*/
server.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const cursoReq = req.body.curso;
  const idCurso = req.body.idCurso;

  usuarios[id - 1].cursos.map((curso) => {
    if (curso.idCurso === idCurso) {
      curso.curso = cursoReq;
    }
    return usuarios[id - 1];
  });
  return res.status(201).json(usuarios[id - 1]);
});

/*
    Para exclusão de um curso é necessário informar, alem do id do usuário como parametro na rota o id do curso no body.
*/
server.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const idCurso = req.body.idCurso;

  usuarios[id - 1].cursos.map((curso) => {
    if (idCurso === curso.idCurso) {
      usuarios[id - 1].cursos.splice(
        usuarios[id - 1].cursos.indexOf(curso, 0),
        1
      );
    }
  });

  return res.status(201).json(usuarios[id - 1]);
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/ ');
});
