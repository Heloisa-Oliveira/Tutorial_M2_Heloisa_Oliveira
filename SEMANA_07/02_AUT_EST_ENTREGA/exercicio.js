const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false})

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './banco.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static("./"));

app.get('/', (req,res)=>{
	res.sendFile(__dirname+"/index.html")
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/listaformacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT * FROM formacao ORDER BY Curso';
        db.all(sql, [], (err, rows) => {
            if(err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereformacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    console.log(req.body.curso);
	sql = "INSERT INTO formacao (curso, duracao) VALUES ('" + req.body.curso + "', '" + req.body.duracao + "');";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>FORMAÇÃO INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaformacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM formacao WHERE id_formacao="+ req.query.id_formacao;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaformacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE formacao SET curso='" + req.body.curso + "', duracao = '" + req.body.duracao + "' WHERE id_formacao='" + req.body.id_formacao + "';";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>FORMAÇÃO ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeformacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM formacao WHERE id_formacao='" + req.query.id_formacao + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>FORMAÇÃO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); 
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/listapersonalidade', (req, res) => {
	console.log("acessado")
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT * FROM personalidade ORDER BY nome';
        db.all(sql, [], (err, rows) => {
            if(err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizapersonalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM personalidade WHERE id_personalidade="+ req.query.id_personalidade;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizapersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = `UPDATE personalidade SET nome='` + req.body.curso + `', caracteristicas = '` + req.body.caracteristicas + `' WHERE id_personalidade='` + req.body.id_personalidade + `'`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>PERSONALIDAE ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/inserepersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    console.log(req.body.curso);
	sql = "INSERT INTO personalidade (nome, caracteristicas) VALUES ('" + req.body.nome + "','');";
	console.log(sql);
	db.run(sql, err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>PERSONALIDADE INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/listahabilidades', (req, res) => {
	console.log("acessado")
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT * FROM habilidades ORDER BY nome';
        db.all(sql, [], (err, rows) => {
            if(err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
});

// Insere um registro (é o C do CRUD - Create)
app.post('/inserehabilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    console.log(req.body.curso);
	sql = "INSERT INTO habilidades (nome, caracteristicas) VALUES ('" + req.body.nome + "','');";
	console.log(sql);
	db.run(sql, err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>HABILIDADE INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
});
