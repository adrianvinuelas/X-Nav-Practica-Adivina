var dif = 0;
var difstring = "";
var namegame = "";
var latitud = 0;
var longitud = 0;
var nombrelugar = "";
var hayintervalo = false;//para saber si hay intervalo de mostrar las fotos
var intervalo;//intervalo en el que se muestran las fotos
var numimagenes = 0;
var inicializarmapa = false;//inicializar el mapa cada vez que hay que mostrarlo
var inicializarbotones = true;//inicializar botones
var inicializarbotones1 = true;//inicializar botones
var inicializarbotones2 = true;//inicializar botones
var inicializarbotones3 = true;//inicializar botones
var map; 
var numberOfEntries = 0; //longitud del historial
var juegos;//string con los juegos a añadir al html
var numjuegosanadidos= 0;//para saber cuantos juegos juegados he añadido para mostrar 
var go=false;//para saber si voy a volver atrás en el historial
var ibapor= 0;//para recuperar en el historial por donde iba
var numanterior = 0;

window.onpopstate = function(event) {//evento que salta cada vez que se hace un go o back
	if(!go){
		if(event.state != null){
			if(JSON.stringify(event.state.namegame) != undefined){//si hay namegame es una partida
				if(numjuegosanadidos < 5){
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
	juegos ="<p><ul>";
	numjuegosanadidos = 0;
	numanterior = 0;
	numberOfEntries = window.history.length;
	if(numberOfEntries>1){
		for(i=1; i<numberOfEntries;i++){
			numgo= -(i);//variable para saber cuantos go hay que hacer si me llaman a ese juego
   			window.history.back();
   		}
   		window.history.go(numberOfEntries-1);
	}
	juegos+="</ul></p>"
   	$("#juegosjugados").html(juegos);
}

function volverjugar(num){
	numjuegosanadidos = 0;
	if(num>0){//si me llaman después de retroceder, con un go hacia adelante
		window.history.go(ibapor);//vuelvo al pincipio del historial para recalcular
		num = numanterior + num;//(-(4) + 2) por ejemplo
	}else if(num<0 && numanterior !=0 ){//si me llaman después de retroceder,para que retroceda(recalculo)
		window.history.go(ibapor);//vuelvo al principio del historial para recalcular
		num = numanterior + num;//(-4 + (-1)) por ejemplo
	}
	go = false;//para añadir partidas si las hay
	numberOfEntries = window.history.length;
	juegos ="<p><ul>";
	if(numberOfEntries>1){
		for(i=1; i<numberOfEntries;i++){
			if(i< -(num)){
				numgo = -(num) - i;// -(-3)-1 = 2 (go)
			}else if(i> -(num)){
				numgo = -(i+num); //-(5+(-3)) = -2 (back)
			}else if(i = -(num)){
				numgo = 0;
			}
   			window.history.back();
   		}
   		go=true;//variable para indicar que no estoy en la ultima entrada si esta a true
   		ibapor =  -num; //-(-3) para hacer un go(3) despues de jugar
   		window.history.go(numberOfEntries-1);//vuelvo al principio
   		window.history.go(num);//hago el go que corresponde
	}
	numanterior = num;
	juegos+="</ul></p>"
   	$("#juegosjugados").html(juegos);
}

function inicio(){
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
		window.clearInterval(intervalo);
	}
	window.history.pushState({}, "IADIVINA", "inicio");
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
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo);
	}
	window.history.pushState({}, "AADIVINA", "ayuda");
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
	$("#dificultad").show();
	if(inicializarbotones1){
		inicializarbotones1 = false;
		$("#botonfacil").click(function(){
			dificultad($("#botonfacil").val());
		});
		$("#botonmedio").click(function(){
				dificultad($("#botonmedio").val());
		});
		$("#botondificil").click(function(){
				dificultad($("#botondificil").val());
		});
	}
	$("#barraprogreso").css( "width", "50%" );
}

function dificultad(valor){
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
}

function jugar(){
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
	window.history.pushState({}, "JADIVINA", "jugar");
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo);
	}
	if(go){
		window.history.go(ibapor);
		go=false;
	}
	juegosjugados();
	
}
function onMapClick(e) {
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo);
	}
	var R = 6371.0;//Radio de la Tierra para calcular la distancia
	var diflat = ((latitud - e.latlng.lat) * Math.PI) /180;
	var diflng = ((longitud - e.latlng.lng) * Math.PI) /180;
	//a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlong/2)
	var a = Math.sin(diflat/2)*Math.sin(diflat/2) + Math.cos((e.latlng.lat*Math.PI)/180)
			* Math.cos((latitud * Math.PI)/180) * Math.sin(diflng/2) *Math.sin(diflng/2);
	//c = 2 · atan2(√a, √(1−a))
	var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var distancia = parseInt(R * c);
	var puntuacion ="";
	var result = 0;
	if(distancia <= 200){
		puntuacion = "HAS GANADO";
	}else{
		result = 1;
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
	if(go){
		window.history.go(ibapor);
		go=false;
	}
	var obj = {namegame: namegame, difstring: difstring, puntos: puntos}
	window.history.pushState(obj, "PADIVINA", namegame+difstring);
}	

function empezarpartida(njug,ndif){
	if(ndif != undefined){
		namegame=njug;
		difstring = ndif;
		if(difstring=="FÁCIL"){
			dif=5;
		}else if(difstring=="MEDIO"){
			dif=3;
		}else if(difstring=="DIFÍCIL"){
			dif=1;
		}
	}
	if(hayintervalo){
		hayintervalo=false;
		window.clearInterval(intervalo);
		$('#fotos').html("");
	}
	if(!go){//si esta a true es que he vuelto a atrás en el historial
		window.history.pushState({}, "PADIVINA", namegame+difstring);
	}
	
	numimagenes = 0;
	$("#selec-juego").hide();
	$("#myCarousel").hide();
	$("#ayuda").hide();
	$("#puntuacion").hide();
	$("#game").html("<H1>ESTAS JUGANDO A " + namegame + " CON DIFICULTAD " + difstring +
				", BUENA SUERTE!</H1>");
	$("#partida").show();
	
	if(inicializarbotones3){
		inicializarbotones3=false;
		$("#cancelgame").click(jugar);
	}
	if(inicializarmapa){//para volver a cargar el mapa,la primera vez no me meto
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
		var enigma = data.features[Math.round(Math.random() * 10)];
		latitud = enigma.coordinates[0];
		longitud = enigma.coordinates[1];
		nombrelugar = enigma.properties.name;
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			{
	          tags: enigma.properties.name,//nombre de la ciudad o pais del que se buscan las fotos
	          tagmode: "any",
	          format: "json"
        	},	function(data){
        		var num=0;
        		intervalo = setInterval(function(){
        			hayintervalo = true;
        			var imagen = "<img src="+ data.items[num].media.m
        				+" style='width: 100%; height: 360px;'>";
        				$('#fotos').html(imagen);
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