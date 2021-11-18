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

//ok
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

//ok
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
			res.status(599).send(err);
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

//ok
app.put("/usuario/update/:id", (req, res) => {
	const params = [
		req.body.email,
		req.body.senha,
		req.body.nome,
		req.body.sobrenome,
		req.params.id,
	];

	const sqlUpdate =
		"UPDATE Usuarios SET email=?, senha=?, nome=?, sobrenome=? WHERE (id=?);";

	db.query(sqlUpdate, params, (err, result) => {
		if (!err) {
			res.send(result);
		} 
		else {
			res.send(err);
			console.log(err);
		}
	});
});

//ok
app.get("/transacao/get/:usuario", (req, res) => {
	const sqlSelect = "SELECT * FROM Transacoes WHERE usuario_id=? ORDER BY dia;";

	db.query(sqlSelect, req.params.usuario, (err, result) => {
		if (!err) {
			res.send(result);
		} else {
			res.send(err);
			console.log(err);
		}
	});
});

//ok
app.post("/transacao/insert", (req, res) => {
	const params = [
		req.body.usuario,
		req.body.dia,
		req.body.categoria,
		req.body.motivo,
		req.body.tipo,
		req.body.valor,
	];

	const sqlInsert =
		"INSERT INTO Transacoes (usuario_id, dia, categoria, motivo, tipo, valor) VALUES (?,?,?,?,?,?);";
	db.query(sqlInsert, params, (err, result) => {
		if (!err) {
			res.send(result);
		}
		else{
			console.log(err);
			res.send(err);
		}
	});
});

//ok
app.delete("/transacao/delete/:id", (req, res) => {
	const sqlDelete = "DELETE FROM Transacoes WHERE (id=?)";

	db.query(sqlDelete, req.params.id, (err, result) => {
		if (err) {
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
