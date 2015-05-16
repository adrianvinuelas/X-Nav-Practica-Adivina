var dif = 0;
var difstring = "";
var namegame = "";
var latitud = 0;
var longitud = 0;
var nombrelugar = "";
var hayintervalo = false;
var intervalo;
var numimagenes = 0;
var inicializarmapa = false;
var inicializarbotones = true;
var inicializarbotones1 = true;
var inicializarbotones2 = true;
var inicializarbotones3 = true;
var map;
var numberOfEntries = 0;
var juegos;
var numjuegosanadidos= 0;
var llamadago = false;
var anadejuego = false;
var anadir = true;
var go=false;
var ibapor= 0;//para recuperar en el historial por donde iba
var numanterior = 0;

window.onpopstate = function(event) {
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
	if(!go){
		if(event.state != null){
			if(JSON.stringify(event.state.namegame) != undefined){
				//console.log("añado juego " + JSON.stringify(event.state.namegame) + ", nivel : "+ JSON.stringify(event.state.difstring))
				//console.log("numgo = " + numgo)
				//console.log("numjuegosanadidos = " + numjuegosanadidos)
				if(numjuegosanadidos < 5){
					//console.log("añado juego a la lista");
					juegos+= "<li onclick='volverjugar("+numgo+");empezarpartida("+JSON.stringify(event.state.namegame)+
							","+JSON.stringify(event.state.difstring) +");'>juego : " 
							+ JSON.stringify(event.state.namegame) + ", nivel : " 
							+JSON.stringify(event.state.difstring)+", puntos: "
							+JSON.stringify(event.state.puntos)+"</li>";
					numjuegosanadidos++;
				}
				
			}
		}
	}
		
}

function juegosjugados(){
	console.log("entro a juegos jugados");
	juegos ="<p><ul>";
	numjuegosanadidos = 0;
	numanterior = 0;
	numberOfEntries = window.history.length;
	//console.log("numberOfEntries juegojugados = " + numberOfEntries);
	if(numberOfEntries>1){
		for(i=1; i<numberOfEntries;i++){
			numgo= -(i);
			//console.log("history.back -" + i);
   			window.history.back();
   			//console.log("numero de entradas despues de back = " +window.history.length)
   		}
   		window.history.go(numberOfEntries-1);
	}
	juegos+="</ul></p>"
   	$("#juegosjugados").html(juegos);
}

function volverjugar(num){
	//para saber si me dan un go(2)por ejemplo,cual era la posicion anterior
	console.log("entro a volver ajugar")
	numjuegosanadidos = 0;
	//le paso el num del que tengo que hacer go ->go(-3)
	if(num>0){//si me llaman despues de retroceder con un go hacia adelante
		//console.log("go hacia adelante despues de haber vuelto a atrás!!!!!!!!!!!!!!")
		window.history.go(ibapor);//vuelvo al pincipio del historial para recalcular
		//console.log("historylengh antes de cambiar = " + window.history.length)
		//console.log("num antes de cambiar = " + num);
		//console.log("numanterior antes de cambiar = " + numanterior);
		num = numanterior + num;//(-(4) + 2) por ejemplo
		//console.log("num despues de cambiar = " + num);
	}else if(num<0 && numanterior !=0 ){//si me llaman despues de retroceder,para que retroceda(recalculo)
		window.history.go(ibapor);//vuelvo al principio del historial para recalcular
		num = numanterior + num;//(-4 + (-1)) por ejemplo
	}
	go = false;//para añadir partidas si las hay
	numberOfEntries = window.history.length;
	juegos ="<p><ul>";
	//console.log("numberOfEntries = " + numberOfEntries);
	if(numberOfEntries>1){
		for(i=1; i<numberOfEntries;i++){
			if(i< -(num)){
				numgo = -(num) - i;// -(-3)-1 = 2 por ejemplo
			}else if(i> -(num)){
				numgo = -(i+num); //-(5+(-3)) = -2
				//console.log("entro a numgo = " + numgo);
			}else if(i = -(num)){
				numgo = 0;
			}
   			window.history.back();
   			//console.log("history.back " + -(i));
   			//console.log("numero de entradas despues de back = " +window.history.length)
   		}
   		go=true;//variable para indicar que no estoy en la ultima entrada si esta a true
   		//console.log("numero total = " + numberOfEntries);
   		//console.log("numero que retroceso = " +  num);
   		ibapor =  -num; //-(-3) para hacer un go(3) despues de jugar
   		//console.log("numero que tengo que hacer go despues = " + ibapor);
   		window.history.go(numberOfEntries-1);//vuelvo al principio
   		window.history.go(num);//hago el go que corresponde
	}
	numanterior = num;
	juegos+="</ul></p>"
   	$("#juegosjugados").html(juegos);
}

function inicio(){
	//console.log("pulsado el boton inicio");
	$("#selec-juego").hide();
	$("#myCarousel").show();
	$("#partida").hide();
	$("#resultado").hide();
	$("#resultado1").hide();
	$("#puntuacion").hide();
	$("#juegosjugados1").show();
	$("#ayuda").hide();
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo)
		//console.log("cerrado el intervalo")
	}
	window.history.pushState({}, "ADIVINAgame", "inicio");
	juegosjugados();
	

}

function ayuda(){
	$("#selec-juego").hide();
	$("#resultado").hide();
	$("#resultado1").hide();
	$("#puntuacion").hide();
	$("#partida").hide();
	$("#dificultad").hide();
	$("#confirmarpartida").hide();
	$("#myCarousel").hide();
	$("#juegosjugados1").show();
	$("#ayuda").show();
	window.history.pushState({}, "ADIVINAgame", "ayuda");
	juegosjugados();
}

function selecdif(nombrejuego){
	if(nombrejuego == "1"){
		namegame = "Capitales";
	}else if(nombrejuego == "2"){
		namegame = "Paises";
	}
	$("#juegos").hide();
	$("#juegoselec").html("HAS SELECCIONADO JUGAR A : " + namegame);
	//console.log("el nombre del juego es : " + namegame);
	$("#dificultad").show();
	if(inicializarbotones1){
		inicializarbotones1 = false;
		$("#botonfacil").click(function(){
			//console.log("val() = " + $("#botonfacil").val());
			dificultad($("#botonfacil").val());
		});
		$("#botonmedio").click(function(){
				//console.log("val() = " + $("#botonmedio").val());
				dificultad($("#botonmedio").val());
		});
		$("#botondificil").click(function(){
				//console.log("val() = " + $("#botondificil").val());
				dificultad($("#botondificil").val());
		});
	}
	$("#barraprogreso").css( "width", "50%" );
}

function dificultad(valor){
	//console.log("VALOR = " + valor);
	if(valor=="1"){
		dif=5;
		difstring = "FÁCIL";
	}else if(valor=="2"){
		dif=3;
		difstring = "MEDIO";
	}else if(valor=="3"){
		dif=1;
		difstring = "DIFÍCIL";
	}
	$("#dificultad").hide();
	$("#difselec").html("HAS SELECCIONADO DIFICULTAD : " + difstring);
	$("#confirmarpartida").show();
	if(inicializarbotones2){
		inicializarbotones2 = false;
		$("#botonempezar").click(empezarpartida);
		$("#botondeshacer").click(jugar);
	}	
	$("#barraprogreso").css( "width", "100%" );

	//console.log("el valor de la dificultad es : " + valor);
}

function jugar(){
	//console.log("pulsado el boton jugar");
	$("#juegoselec").html("");
	$("#difselec").html("");
	$("#selec-juego").show();
	$("#juegos").show();
	$("#dificultad").hide();
	$("#confirmarpartida").hide();
	$("#partida").hide();
	$("#resultado").hide();
	$("#resultado1").hide();
	$("#puntuacion").hide();
	$("#myCarousel").hide();
	$("#juegosjugados1").show();
	$("#ayuda").hide();
	if(inicializarbotones){
		inicializarbotones = false;
		$("#botoncapitales").click(function(){
			selecdif($("#botoncapitales").val());
		});
		$("#botonpaises").click(function(){
			selecdif($("#botonpaises").val());
		});
	}
	$("#barraprogreso").css( "width", "0%" );
	window.history.pushState({}, "ADIVINAgame", "jugar");
	if(go){
		//console.log("vuelvo a por donde iba")
		window.history.go(ibapor);
		go=false;
	}
	juegosjugados();
	
}
function onMapClick(e) {
	//console.log("pinchado mapa");
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo)
		//console.log("cerrado el intervalo")
	}
	var R = 6371.0;//Radio de la Tierra para calcular la distancia
	var diflat = ((latitud - e.latlng.lat) * Math.PI) /180;
	var diflng = ((longitud - e.latlng.lng) * Math.PI) /180;
	//a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlong/2)
	var a = Math.sin(diflat/2)*Math.sin(diflat/2) + Math.cos((e.latlng.lat*Math.PI)/180)
			* Math.cos((latitud * Math.PI)/180) * Math.sin(diflng/2) *Math.sin(diflng/2);
	//console.log("a = " + a);
	//c = 2 · atan2(√a, √(1−a))
	var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	//console.log("c = " + c);
	var distancia = parseInt(R * c);
	//console.log("distancia entre los dos puntos es = " + distancia);
	var puntuacion ="";
	var result = 0;
	if(distancia <= 200){
		//console.log("entra a ganar");
		puntuacion = "HAS GANADO";
	}else{
		result = 1;
		//console.log("entra a perder")
		puntuacion = "PERDISTE, VUELVE A INTENTARLO";
	}
	if(numimagenes==0){
		numimagenes++;
	}
	var puntos = distancia * numimagenes;
	hayintervalo=false;
	window.clearInterval(intervalo)
	$("#partida").hide();
	if(result == 0){
		$("#resultado").html("<p>La solución correcta es <h2>" + nombrelugar +"</h2></p><p>"+puntuacion+
			"</p><p>Distancia : " + distancia+" Km</p>" +
			 	"<p>Imágenes : " + numimagenes + "</p>");
		$("#resultado").show();
	}else{
		$("#resultado1").html("<p>La solución correcta es <h2>" + nombrelugar +"</h2></p><p>"+puntuacion+
			 "</p><p>Distancia : " + distancia+" Km</p>" +
			 	"<p>Imágenes : " + numimagenes + "</p>");
		$("#resultado1").show();
	}
	$("#puntuacion").html("PUNTUACIÓN FINAL : <p>"+puntos+"</p>");
	$("#puntuacion").show();
	$("#juegosjugados1").hide();
	$('#fotos').html("");
	anadejuego = true;
	if(go){
		//console.log("vuelvo a por donde iba")
		window.history.go(ibapor);
		go=false;
	}
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo)
		//console.log("cerrado el intervalo")
	}
	//crear el objeto para que se inicialice a null
	var obj = {namegame: namegame, difstring: difstring, puntos: puntos}
	window.history.pushState(obj, "ADIVINAgame", namegame+difstring);
}	//acordarme de que cambie el guardar partida para que funcione con el servidor

function empezarpartida(njug,ndif){
	if(ndif != undefined){
		namegame=njug;
		difstring = ndif;
	}
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo)
		$('#fotos').html("");
		//console.log("cerrado el intervalo")
	}
	if(!go){//si esta a true es que he vuelto a atrás en el historial
		window.history.pushState({}, "ADIVINAgame", namegame+difstring);
	}
	//console.log("QUE EMPIECE LA PARTIDA!")
	numimagenes = 0;
	$("#selec-juego").hide();
	$("#myCarousel").hide();
	$("#ayuda").hide();
	$("#puntuacion").hide();
	$("#game").html("<H1>ESTAS JUGANDO A " + namegame + " CON DIFICULTAD " + difstring +
				", BUENA SUERTE!</H1>");
	$("#partida").show();
	
	//history.pushState(data, event.target.textContent, event.target.href);
	if(inicializarbotones3){
		inicializarbotones3=false;
		$("#cancelgame").click(jugar);
	}
	if(inicializarmapa){//para volver a cargar el mapa,la primera vez no se mete
		map.remove();
	}
	
	map = L.map('map', {
	    center: [0, 0],
	    zoom: 2
	});

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	map.on('click', onMapClick);

	inicializarmapa= true;
	

	$.getJSON("http://adrianvinuelas.github.io/X-Nav-Practica-Adivina/juegos/"+namegame+".json",function(data){
		//console.log("estoy dentro del json");
		var enigma = data.features[Math.round(Math.random() * 10)];
		latitud = enigma.coordinates[0];
		longitud = enigma.coordinates[1];
		nombrelugar = enigma.properties.name;
		console.log("el sitio a adivinar es -> " + enigma.properties.name )
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			{
	          tags: enigma.properties.name,//nombre de la ciudad o pais del que se buscan las fotos
	          tagmode: "any",
	          format: "json"
        	},	function(data){
        		var num=0;
        		//console.log("data.items.length = " + data.items.length);
        		intervalo = setInterval(function(){
        			hayintervalo = true;
        			//console.log("se ejecuta el intervalo");
        			var imagen = "<img src="+ data.items[num].media.m
        				+" style='width: 100%; height: 360px;'>";
        				$('#fotos').html(imagen);
        				console.log("num = " + num);
        				if(num == data.items.length - 1){//si es la ultima foto vuelvo a la primera
        					num = 0;
        				}else{//si no sigo cogiendo la siguiente foto
        					num++;
        				}
        				numimagenes++;//numero de imagenes que se van mostrando
        		}, dif*1000);
	           
    	});
	});	
}

jQuery(document).ready(function() {
	//console.log("dom cargado modificado 1");
	$("#partida").hide();
	$("#selec-juego").hide();
	$("#resultado").hide();
	$("#resultado1").hide();
	$("#puntuacion").hide();
	$("#ayuda").hide();
	$(".jugar").click(jugar);
	$(".inicio").click(inicio);
	$(".ayuda").click(ayuda);
	$(".contacto").click(inicio);
   	juegosjugados();
});