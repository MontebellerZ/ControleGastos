const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'controlegastos'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.get('/api/get', (req, res) => {
    const sqlSelect = (
        "SELECT * FROM Usuarios;"
    );

    db.query(sqlSelect, (err, result) => {
        if(!err){
            res.send(result);
        }
    })
});

app.post("/api/insert", (req, res) => {
    const params = [req.body.email, req.body.senha, req.body.nome, req.body.sobrenome];

    const sqlInsert = (
        "INSERT INTO Usuarios (email, senha, nome, sobrenome) VALUES (?,?,?,?);"
    );
    db.query(sqlInsert, params, (err, result) => {
        if(!err){
            res.send(result);
        }
    });
});

app.delete('/api/delete', (req, res) => {
    const email = req.body.email;

    const sqlDelete = (
        "DELETE FROM Usuarios WHERE (email=?)"
    );

    db.query(sqlDelete, email, (err, result) => {
        if(err){
            res.send(err);
        }
    });
});

app.put('/api/update', (req, res) => {
    const params = [req.body.email, req.body.nome];

    const sqlUpdate = (
        "UPDATE Usuarios SET (senha=?) WHERE (email=?);"
    );

    db.query(sqlUpdate, params, (err, result) => {
        if(!err){
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});