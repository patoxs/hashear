const fs          = require('fs');
// Cifrado de Nodejs con CTR
const crypto      = require('crypto');
//const algoritmo = "aes192";
//const algoritmo = "sha256";
const algoritmo   = "aes-256-cbc";
//const clave       = "SoyUnGonzález";
//const clave       = "Año2021YAntesEraElAño2020";
//const clave       = "cccbeb0d472b2674a582bffbb5e4125dca83039d988c6e3c3830b7fe417";
const clave       = "A71shjYRDld34hj%s57oEWFGIODEG1lL";
const initVector  = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);


function encriptar(texto) {
	var cipher = crypto.createCipher(algoritmo, new Buffer(clave))
	var crypted = cipher.update(texto, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

function descifrar(texto) {
	var decipher = crypto.createDecipher(algoritmo, new Buffer(clave))
	var dec = decipher.update(texto, 'hex', 'utf8')
	dec += decipher.final('utf8')
	return dec
}

function crypt(ed, file, destino) {
	fs.readFile(file, (error, data) => {
	    if(error) {
	        throw error;
	    }
	    let texto = data.toString();
	    if (ed == '-e') {
	    	fs.writeFile(destino+'.encrypt', encriptar(texto), function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("The file was encrypt!");
			});
	    } else {
	    	fs.writeFile(destino, descifrar(texto), function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("The file was decrypt!");
			});
	    } 
		    
	});	 
}

// encriptar archivo
// node index.js -e ~/path/script-origen.yaml --destino ~/path/nuevo-nombre
// desencriptar archivo
// node index.js -d ~/path/script-encriptado.yaml --destino ~/path/nuevo-nombre

arreglo = process.argv.slice(2);
// console.log(arreglo);
if ( arreglo[0] == '-e' || arreglo[0] == '-d' ) {
	if (arreglo[1] != '') {
		if (arreglo[2] == '--destino' && arreglo[3] != '') {
			crypt(arreglo[0], arreglo[1], arreglo[3]);
		} else {
			console.log('Error - debe incluir file destino');
		}
	} else {
		console.log('Error - debe incluir file origen');
	}
}
