const express = require('express');

const app = express();

app.use(express.json());
app.listen(3333);

let cursos = ['Curso 01', 'Curso 02', 'Curso 03'];

app.get('/cursos', (req, res) => {
  return res.json(cursos);
});

app.post('/cursos', (req, res) => {
  const { novoCurso } = req.query;

  console.log('novoCurso', novoCurso);

  cursos.push(novoCurso);

  return res.json({ novoCurso });
});

app.put('/cursos/:idCurso', (req, res) => {
  const { idCurso } = req.params;
  const cursoAtualizado = cursos[idCurso];

  cursos = cursos.map((curso, idxCurso) => {
    if (idxCurso === Number(idCurso)) {
      return `Curso ${idCurso} ????`;
    }

    return curso;
  });

  return res.json(cursoAtualizado);
});

app.patch('/cursos/:idCurso', (req, res) => {
  const { idCurso } = req.params;
  const cursoAtualizado = cursos[idCurso];

  cursos = cursos.map((curso, idxCurso) => {
    if (idxCurso === Number(idCurso)) {
      return `Curso ${idCurso}???`;
    }

    return curso;
  });

  return res.json(cursoAtualizado);
});

app.delete('/cursos/:idCurso', (req, res) => {
  const { idCurso } = req.params;
  const cursoAtualizado = cursos[idCurso];

  cursos = cursos.filter((_, idxCurso) => idxCurso !== Number(idCurso));

  return res.json(cursoAtualizado);
});
