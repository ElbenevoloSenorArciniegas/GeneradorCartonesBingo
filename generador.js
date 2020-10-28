

function main (n) {
	cartones = [];
	hashArray = [];
	
	for (var i = 0; i < n; i++) {
		var carton = {};
		carton.id = i+500;
		carton = generarCarton(carton);
		code= hashing(carton);
		while(hashArray.includes(code)){
			console.log("Cartón "+ i+ " repetido.   "+code);
			carton = generarCarton(carton);
			code= hashing(carton);
		}
		cartones.push(carton);
		hashArray.push(code);
	};
	console.log(cartones);
}

function generarCarton (carton) {
	for (var i = 1; i <= 5; i++) {
		carton[i-1]= [];
		for (var j = 0; j < 5; j++) {
			n =  generarNumero(i);
			while ( carton[i-1].includes(n)){
				n =  generarNumero(i);
			}
			carton[i-1][j] = n;
		};
	};
	return carton
}

function generarNumero (i) {
	return Math.floor(Math.random() * ( 15*i - 15*(i-1) )) + 15*(i-1) + 1;
}


function hashing (carton) {
	var s = ""
	for (var i = 0; i < 5; i++) {
		s+= i+":";
		for (var j = 0; j < 5; j++) {
			s+= carton[i][j]+","
		}
	}

	var code = md5(s);
	//console.log(code);
	return code;

}

function pintar (carton) {
	_idCarton.innerText = ""+ Math.floor(carton.id/100) + Math.floor((carton.id%100)/10) + carton.id%10;

	TR = document.createElement("tr");
	for (var i = 0; i < 5; i++) {
		Th = document.createElement("th");
		Th.innerText = "BINGO"[i];
		TR.appendChild(Th);
	}
	_tbody.appendChild(TR);

	for (var i = 0; i < 5; i++) {
		TR = document.createElement("tr");
		for (var j = 0; j < 5; j++) {
			TD = document.createElement("td");
			TD.innerText = carton[j][i];
			TR.appendChild(TD);
		}
		_tbody.appendChild(TR);
	}
}

function despintar () {
	/*for (var i = 1; i < _tbody.childNodes.length; i++) {
		_tbody.removeChild(_tbody.childNodes[i]);
	};*/
	while (_tbody.hasChildNodes()) {
		_tbody.removeChild(_tbody.childNodes[0]);
	}
}


function toCanvas () {
	html2canvas(document.querySelector("#capture")).then(canvas => {
    	document.body.appendChild(canvas)
    	procederADescargar();
	});
}

//####################################################################################################

var i = 0;

function primeraMitad () {
	if(i < cartones.length){
		console.log("primera");
		pintar(cartones[i]);
		promesaDeGraficar().then(function (result) {
			console.log("graficar");
    	});
	}
}

function segundaMitad () {
	console.log("segunda");
	despintar();
	i++;
	primeraMitad();
}

let promesaDeGraficar = function () {
    return new Promise(function (resolve, reject) {
    	console.log("toCanvas");
    	toCanvas();
    	resolve();
	});
};

let promesaDeDescargar = function () {
    return new Promise(function (resolve, reject) {
    	console.log("toBlob");
    	var canvas = document.getElementsByTagName("canvas")[i];
		canvas.toBlob(function(blob) {
    	saveAs(blob, "bingo.png");
		});
		resolve();
	});
};

function procederADescargar () {
	promesaDeDescargar().then(function (result) {
		console.log("descargar");
		segundaMitad(result);
	});
}

main(500);
primeraMitad();

/*
var imagenes = document.getElementsByTagName("canvas");
		for (var i = 0; i < imagenes.length; i++) {
			imagenes[i].toBlob(function(blob) {
		    	saveAs(blob, "bingo.png");
			});
		};
*/