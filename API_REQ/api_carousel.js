    var styles = "@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');";
    var newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.href='data:text/css,'+escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);

    /*VARIABLES*/
    var arrayCarousel, attachToAddress, urlParams;

    /*ACTUALMENTE SOLO FUNCIONA PARA ARTICULOS SIMPLES, LA CONFIGURACIÓN NO ESTA PREPARADA PARA SPR*/
    /*EN EL ARRAY SE DEBEN INTRODUCIR 'ART' Y EL NÚMERO DE REFERENCIA*/
    function createAddress(){
        arrayA = [
            ["art","20281136"],
            ["art","10288242"],
            ["art","70340765"],
            ["art","70277957"],
            ["art","80331973"],
            ["art","30214504"],
            ["art","00154870"],
            ["art","60388041"]
        ];
        for(var h = 0; h<arrayA.length; h++){
        for(var j = 0; j<arrayA[h].length;j++){
            if(h==0 && j==0){
            attachToAddress=arrayA[h][j]+",";
            j++;
            }
            if (j==0){
            attachToAddress+=arrayA[h][j]+",";
            }else{
            attachToAddress+=arrayA[h][j]+";"
            }
        }
        }
        attachToAddress+="?ignoreErrors=true";
        return attachToAddress;
    }

    /*SE CREA LA URL PARA HACER EL REQUEST*/
    var respuestaCarousel = httpGet();
    function httpGet(){    
        urlParams = createAddress();
        var xmlHttp = new XMLHttpRequest();
            var adrr = "https://iows.ikea.com/retail/iows/es/es/catalog/items/"+urlParams;
        xmlHttp.open( "GET", adrr, false ); // false for synchronous request
        xmlHttp.setRequestHeader("Contract", "36341");
        xmlHttp.setRequestHeader("Accept", "application/vnd.ikea.iws+json;version=2.0");
        xmlHttp.setRequestHeader("Consumer", "FIRST");
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    var objCar = JSON.parse(respuestaCarousel); 

    /*CREAMOS LA EL CONTAINER Y LA ROW DONDE VAN TODOS LOS ELEMENTOS*/
    var containerCarousel = document.createElement("div");
    containerCarousel.classList.add("container");
    document.getElementsByTagName("body")[0].appendChild(containerCarousel);
    var filaCarousel = document.createElement("div");
    filaCarousel.classList.add("row");
    filaCarousel.id = "filaCarousel";
    containerCarousel.appendChild(filaCarousel);    

    var carruselMain = document.createElement("div");
    carruselMain.classList.add("home-product-new-hldr");
    filaCarousel.appendChild(carruselMain);

    /*AJUSTAMOS EL TAMAÑO*/
    var insideCar = document.createElement("div");
    insideCar.classList.add("home-product-new");
    insideCar.id = "insideCar";
    carruselMain.appendChild(insideCar);

    /*METEMOS EL BOTON IZQUIERDO*/
    var divBtnIzq = document.createElement("div");
    divBtnIzq.classList.add("slider-btn-hldr");
    divBtnIzq.classList.add("slider-btn-hldr-left");
    divBtnIzq.id = "btnIzquierdo";
    insideCar.appendChild(divBtnIzq);
    document.getElementById("btnIzquierdo").innerHTML = '<button id="left-btn" class="slider-btn" style="display: block;"><svg viewBox="0 0 256 256"><polyline fill="none" stroke="black" stroke-width="16" points="184,16 72,128 184,240"></polyline></svg></button>';


    /*INTRODUCIMOS EL CARRUSEL PRINCIPAL*/
    var mainCar = document.createElement("div");
    mainCar.classList.add("home-grid");
    mainCar.classList.add("products-grid");
    mainCar.classList.add("products-grid--max-4");
    mainCar.id = "theCarousel";
    document.getElementById("insideCar").appendChild(mainCar);

    
    /*RECORREMOS EL OBJETO*/
    for (var i = 0; i<objCar.RetailItemCommList.RetailItemComm.length; i++){

        /*DEFINIMOS EL INTERIOR DEL CARRUSEL*/
        var carInner = document.createElement("div");
        carInner.classList.add("item-container");
        var idCarInner = "carInner"
        carInner.id  = idCarInner;
        mainCar.appendChild(carInner);

        
        /*CREAMOS EL CONTENEDOR PRINCIPAL PARA CADA ELEMENTO*/
        var itemDiv = document.createElement("div");
        idItemDiv = "item_" + i;
        itemDiv.id = idItemDiv;
        itemDiv.classList.add("item");
        carInner.appendChild(itemDiv);

        /*CREAMOS EL ARTICULO*/
        var divArticle = document.createElement("div");
        var idArticle = "art_" +  objCar.RetailItemCommList.RetailItemComm[i].ItemNo.$;
        divArticle.classList.add("divArticuloCar")
        divArticle.id = idArticle;
        itemDiv.appendChild(divArticle);

        /*AÑADIMOS EL ENLACE GENERAL*/
        var aCarousel = document.createElement("a");
        aCarousel.href = "//www.ikea.com/es/es/catalog/products/"+objCar.RetailItemCommList.RetailItemComm[i].ItemNo.$;
        aCarousel.target = "_parent";
        aCarousel.classList.add("a-IKEA");
        var aID = "a_"+objCar.RetailItemCommList.RetailItemComm[i].ItemNo.$;
        aCarousel.id = aID;
        divArticle.appendChild(aCarousel);

        /*AÑADIMOS LA IMAGEN*/
        var imgCarousel = document.createElement("img");
        imgCarousel.classList.add("producto_slider");
        imgCarousel.classList.add("img-responsive");
        imgCarousel.src = "https://www.ikea.com" + objCar.RetailItemCommList.RetailItemComm[i].RetailItemImageList.RetailItemImage[3].ImageUrl.$;
        imgCarousel.alt = "";
        aCarousel.appendChild(imgCarousel);

        /*CREAMOS EL CONTENEDOR DE INFORMACION*/
        var divArticleInner = document.createElement("div");
        divArticleInner.classList.add("productDetails");
        var idInner = objCar.RetailItemCommList.RetailItemComm[i].ItemNo.$
        divArticleInner.id = "divInner_" + idInner;
        aCarousel.appendChild(divArticleInner);

        /*COMPRABAMOS SI ES NOVEDAD*/
        try {
            var newArtCar = objCar.RetailItemCommList.RetailItemComm[i].NewsType.$;
            var nACar = document.createElement("span");
            nACar.id = "new_tag_"+i;
            nACar.classList.add("newImgCss");
            divArticleInner.appendChild(nACar);
            document.getElementById("new_tag_"+i).innerHTML = "Novedad";
        } catch (error) {            
        }

        /*AÑADIMOS EL NOMBRE*/
        var nombreCar = document.createElement("p");
        var innerCuerpo = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].ProductName.$);
        nombreCar.classList.add("nombre-articulo");
        nombreCar.appendChild(innerCuerpo);
        divArticleInner.appendChild(nombreCar);

        /*AÑADIMOS LA DESCRIPCION*/
        var descripcionCar = document.createElement("p");
        var innerDescCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].ProductTypeName.$);
        descripcionCar.classList.add("desc-articulo");
        descripcionCar.appendChild(innerDescCar);
        divArticleInner.appendChild(descripcionCar);

        /*EMPEZAMOS A PINTAR LOS PRECIOS*/
        var xCar = objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice;
        /*PRECIO REGULAR O BTI*/
        if(!xCar.length){
            var yCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice.Price.$);
            var precioCar = document.createElement("p");
            precioCar.classList.add("precio-articulo");
            var btiCar = objCar.RetailItemCommList.RetailItemComm[i].BreathTakingItem.$;
            if(btiCar==true){
                precioCar.classList.add("precio-BTI");
            }
            precioCar.id = "preCar_"+i;
            precioCar.appendChild(yCar);
            divArticleInner.appendChild(precioCar);
            var yyCar = objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
            if(yyCar=="unidades"){
                yyCar = "/" + objCar.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + " " + objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
            }
            else{
                yyCar = "/" + yyCar;
            }
            yCar = document.getElementById("preCar_"+i).innerHTML;
            yCar = "€ "+ yCar.replace(".",",") + " " + yyCar;
            document.getElementById("preCar_"+i).innerHTML = yCar;
        }
        else{
            var zCar = objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].RetailPriceType.$;
            if(zCar=="RegularSalesUnitPrice"){
                /*PRECIO NLP*/
                var imgNLPCar = document.createElement("img");
                imgNLPCar.src = "/ms/img/nlp/es_ES/nlp_02.png";
                imgNLPCar.classList.add("img-newlowerprice");
                aCarousel.appendChild(imgNLPCar);
                var zzCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[0].Price.$);
                var precioNLPCar = document.createElement("p");
                precioNLPCar.classList.add("precio-articulo");
                precioNLPCar.id = "preCar_NLP"+i;
                precioNLPCar.appendChild(zzCar);
                divArticleInner.appendChild(precioNLPCar);
                var yyCar = objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
                if(yyCar=="unidades"){
                    yyCar = "/" + objCar.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ +" "+ objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
                }
                else{
                    yyCar = "/" + yyCar;
                }
                zzCar = document.getElementById("preCar_NLP"+i).innerHTML;
                zzCar = "€ " + zzCar.replace(".",",") + " " +yyCar;
                document.getElementById("preCar_NLP"+i).innerHTML = zzCar;
                var zyCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].Price.$);
                var precioRegularCar = document.createElement("p");
                precioRegularCar.classList.add("precioNLP");
                precioRegularCar.id = "preCar_REG_NLP"+i;
                precioRegularCar.appendChild(zyCar);
                divArticleInner.appendChild(precioRegularCar);
                var yyCar = objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
                if(yyCar=="unidades"){
                    yyCar = objCar.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
                }
                else{
                    yyCar = "/" + yyCar;
                }
                zyCar = document.getElementById("preCar_REG_NLP"+i).innerHTML;
                zyCar = "€ " + zyCar.replace(".",",") + " " +yyCar;
                document.getElementById("preCar_REG_NLP"+i).innerHTML = zyCar;
            }
            else if(zCar=="IKEAFamilySalesUnitPrice"){
                /*PRECIO FAMILY*/
                var cabFamCar = document.createElement("p");
                cabFamCar.classList.add("cabeceraFamily");
                var textCabCar = document.createTextNode("Precio IKEA FAMILY");
                cabFamCar.appendChild(textCabCar);
                divArticleInner.appendChild(cabFamCar);
                var precioFamCar = document.createElement("p");
                precioFamCar.classList.add("precio-articulo-multiple");
                precioFamCar.id = "preCar_FAM"+i;
                var zaCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].Price.$);
                precioFamCar.appendChild(zaCar);
                divArticleInner.appendChild(precioFamCar);
                var yyCar = objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
                if(yyCar=="unidades"){
                    yyCar = objCar.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
                }
                else{
                    yyCar = "/" +yyCar;
                }
                zaCar = document.getElementById("preCar_FAM"+i).innerHTML;
                zaCar = "€ " + zaCar.replace(".",",") + " " + yyCar;
                document.getElementById("preCar_FAM"+i).innerHTML = zaCar;
                var regFamCar = document.createElement("p");
                regFamCar.classList.add("precio-no-socio");
                var textRegCar = document.createTextNode("Precio normal");
                regFamCar.appendChild(textRegCar);
                divArticleInner.appendChild(regFamCar);
                var precioFamRegCar = document.createElement("p");
                precioFamRegCar.classList.add("precio-articulo-multiple");
                precioFamRegCar.id = "preCar_FAM_REG"+i;
                var zbCar = document.createTextNode(objCar.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[0].Price.$);
                precioFamRegCar.appendChild(zbCar);
                divArticleInner.appendChild(precioFamRegCar);
                var yyCar = objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
                if(yyCar=="unidades"){
                    yyCar = objCar.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + objCar.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
                }
                else{
                    yyCar = "/" + yyCar;
                }
                zbCar = document.getElementById("preCar_FAM_REG"+i).innerHTML;
                zbCar = "€ " + zbCar.replace(".",",") + " " + yyCar;
                document.getElementById("preCar_FAM_REG"+i).innerHTML = zbCar;
            }
        }

        try {
            var AverageRating = objCar.RetailItemCommList.RetailItemComm[i].RetailItemRating.ItemRating.AverageRating.$;
            AverageRating = (AverageRating * 2)*10;
            var NumRatings = objCar.RetailItemCommList.RetailItemComm[i].RetailItemRating.ItemRating.Count.$;
            var divRatings = document.createElement("div");
            divRatings.classList.add("dot-ratingsreviews-PLP-api");
            divRatings.id = "d_RR"+i;
            divArticleInner.appendChild(divRatings);
            document.getElementById("d_RR"+i).innerHTML = "<span class='api-rating-stars api-rating-stars-off' aria-hidden='true'>  ★★★★★ </span><span class='api-rating-stars api-rating-stars-on' style=width:"+AverageRating+"% !important; aria-hidden='true'>  ★★★★★ </span>"+
            "<p class='api-ratings-number-Car'>("+NumRatings+")</p></div>";
          } catch (error) {
            var divRatings = document.createElement("div");
            divRatings.classList.add("dot-ratingsreviews-PLP-api");
            divRatings.id = "d_RR"+i;
            divArticleInner.appendChild(divRatings);
            document.getElementById("d_RR"+i).innerHTML = "<span class='api-rating-stars api-rating-stars-off' aria-hidden='true'>  ★★★★★ </span><span class='api-rating-stars api-rating-stars-on' style=width:0% !important; aria-hidden='true'>  ★★★★★ </span>"+
            "<p class='api-ratings-number-Car'>(0)</p></div>";
          }
      
          var btnComprar = document.createElement("div");
          btnComprar.classList.add("comprar");
          btnComprar.id = "btn_comprar"+i;
          divArticleInner.appendChild(btnComprar);
          document.getElementById("btn_comprar"+i).innerHTML = "<a href='#' onclick='comprar("+i+");return false;'><span class='icon-carrito'></span>Comprar</a>";
          

    }
    /*AQUI ACABA EL BUCLE*/

     /*METEMOS EL BOTON IZQUIERDO*/
     var divBtnDer = document.createElement("div");
     divBtnDer.classList.add("slider-btn-hldr");
     divBtnDer.classList.add("slider-btn-hldr-right");
     divBtnDer.id = "btnDerecho";
     insideCar.appendChild(divBtnDer);
     document.getElementById("btnDerecho").innerHTML = '<button id="right-btn" class="slider-btn" style="display: block;"><svg viewBox="0 0 256 256"><polyline fill="none" stroke="black" stroke-width="16" points="72,16 184,128 72,240"></polyline></svg></button>';
 
 
  

    // Instantiate the Bootstrap carousel
    var listEl = document.querySelector('.home-grid.products-grid.products-grid--max-4');
    var btnLeftEl = document.querySelector('#left-btn');
    var btnRightEl = document.querySelector('#right-btn');
    count = 0;
    btnLeftEl.addEventListener("click", function(e) {
        count++;
        listEl.style.left = count * 288 + 'px';
        if (count > -4) {
            btnRightEl.style.display = 'block';
        }
        if (count > 0) {
            count = -4;
            listEl.style.left = count * 288 + "px";
        }
    });
    btnRightEl.addEventListener("click", function(e) {
        count--;
        listEl.style.left = count * 288 + 'px';
        if (count < 0) {
            btnLeftEl.style.display = 'block';
        }
        if (count < -4) {
            count = 0;
            listEl.style.left = 0 + "px";
        }
    });  