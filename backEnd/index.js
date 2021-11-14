const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "controlegastos",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/usuario/get", (req, res) => {
	const sqlSelect = "SELECT * FROM Usuarios;";

	db.query(sqlSelect, (err, result) => {
		if (!err) {
			res.send(result);
		} else {
			console.log(err);
		}
	});
});

app.get("/usuario/login/:email/:senha", (req, res) => {
	const params = [req.params.email, req.params.senha];
	const sqlSelect = "SELECT * FROM Usuarios WHERE (email=? AND senha=?);";

	db.query(sqlSelect, params, (err, result) => {
		if (!err) {
			res.send(result);
		} else {
			console.log(err);
		}
	});
});

app.post("/usuario/insert", (req, res) => {
	const params = [
		req.body.email,
		req.body.senha,
		req.body.nome,
		req.body.sobrenome,
	];

	const sqlInsert =
		"INSERT INTO Usuarios (email, senha, nome, sobrenome) VALUES (?,?,?,?);";
	db.query(sqlInsert, params, (err, result) => {
		if (!err) {
			res.send(result);
		} else {
			console.log(err);
		}
	});
});

app.delete("/usuario/delete", (req, res) => {
	const email = req.body.email;

	const sqlDelete = "DELETE FROM Usuarios WHERE (email=?)";

	db.query(sqlDelete, email, (err, result) => {
		if (err) {
			res.send(err);
		}
	});
});

app.put("/usuario/update/:id", (req, res) => {
    const params = [
        req.body.email,
		req.body.senha,
		req.body.nome,
		req.body.sobrenome,
		req.body.balanco,
		req.body.entrada,
		req.body.saida,
		req.params.id,
	];
    
	const sqlUpdate = "UPDATE Usuarios SET email=?, senha=?, nome=?, sobrenome=?, balanco=?, entrada=?, saida=? WHERE (id=?);";
    
	db.query(sqlUpdate, params, (err, result) => {
        if (!err) {
            res.send(result);
		}
        else{
            res.send(err);
        }
	});
});

app.post("/gasto/insert", (req, res) => {
	const params = [
		req.body.conta,
		req.body.dia,
		req.body.tipo,
		req.body.objeto,
		req.body.acao,
		req.body.valor,
	];

	const sqlInsert =
		"INSERT INTO Usuarios (conta_id, dia, tipo, objeto, acao, valor) VALUES (?,?,?,?,?,?);";
	db.query(sqlInsert, params, (err, result) => {
		if (!err) {
			adoido;
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
