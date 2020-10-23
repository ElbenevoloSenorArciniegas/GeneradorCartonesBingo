

function main (n) {
	cartones = [];
	hashArray = [];
	
	for (var i = 0; i < n; i++) {
		var carton = {};
		carton.id = i;
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
	while (_tbody.hasChildNodes()) {
		_tbody.removeChild(_tbody.childNodes[0]);
	}
}


function toCanvas () {
	html2canvas(document.querySelector("#capture")).then(canvas => {
    	document.body.appendChild(canvas)
	});
}

//####################################################################################################

main(2);

for (var i = 0; i < cartones.length; i++) {
	pintar(cartones[i]);
	toCanvas();
	despintar();
};

setTimeout(function(){
	var imagenes = document.getElementsByTagName("canvas");
	for (var i = 0; i < cartones.length; i++) {
		var id = i;
		imagenes[i].toBlob(function(blob) {
	    	saveAs(blob, "bingo.png");
		});
	};
}, 3000);