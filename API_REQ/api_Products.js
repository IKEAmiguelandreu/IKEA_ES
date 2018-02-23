  var styles = "@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');";
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='data:text/css,'+escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);

/*VARIABLES*/
var arrayA, attachToAddress, urlParams;
var iden, idElementoInterno, elementoADD;
/*VARIABLES*/
function createAddress(){
    arrayA = [
      ["art","20281136"],
      ["art","10288242"],
      ["art","70340765"],
      ["art","70277957"],
      ["art","80331973"],
      ["art","00295554"],
      ["art","30277959"],
      ["art","00263850"],
      ["art","30214504"],
      ["art","00154870"],
      ["art","20231306"],
      ["art","30258913"],
      ["art","10270478"]
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
  
  var respuesta = httpGet();
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
  var obj = JSON.parse(respuesta); 
  var controlID = 0;
  var cuerpo = document.getElementsByTagName("body")[0];
  var contenedorPrincipal = document.createElement("div");
  contenedorPrincipal.classList.add("container");
  cuerpo.appendChild(contenedorPrincipal);

  for(var i = 0; i< obj.RetailItemCommList.RetailItemComm.length; i++){
    var check = i%4;
    if(i==0 || check == 0){
      var row = document.createElement("div");
      row.classList.add("row");
      iden = "fila_" + controlID;
      controlID++;
      row.id = iden;
      contenedorPrincipal.appendChild(row);
    }
    

    var divArticle = document.createElement("div");
    divArticle.classList.add("col-xs-6");
    divArticle.classList.add("col-sm-6");
    divArticle.classList.add("col-md-3");
    divArticle.classList.add("col-lg-3");
    divArticle.classList.add("divArticulo");
    idElementoInterno = "item_" + obj.RetailItemCommList.RetailItemComm[i].ItemNo.$;
    divArticle.id = idElementoInterno;
    document.getElementById(iden).appendChild(divArticle);


    var aPLP = document.createElement("a");
    aPLP.href = "//www.ikea.com/es/es/catalog/products/"+obj.RetailItemCommList.RetailItemComm[i].ItemNo.$;
    aPLP.target = "_parent";
    var aID = "a_"+obj.RetailItemCommList.RetailItemComm[i].ItemNo.$;
    aPLP.id = aID;
    document.getElementById(idElementoInterno).appendChild(aPLP);
    elementoADD = document.getElementById(aID);

    
    var img = document.createElement("img");
    img.src = "https://www.ikea.com" + obj.RetailItemCommList.RetailItemComm[i].RetailItemImageList.RetailItemImage[3].ImageUrl.$;
    img.classList.add("img-responsive");
    img.classList.add("img-producto");
    elementoADD.appendChild(img);

    try {
      var newArt = obj.RetailItemCommList.RetailItemComm[i].NewsType.$;
      var nA = document.createElement("span");
      nA.id = "new_tag_"+i;
      nA.classList.add("newImgCss");
      elementoADD.appendChild(nA);
      document.getElementById("new_tag_"+i).innerHTML = "Novedad";
    } catch (error) {
      
    }

    var nombre = document.createElement("p");
    var innerCuerpo = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].ProductName.$);
    nombre.classList.add("nombre-articulo");
    nombre.appendChild(innerCuerpo);
    elementoADD.appendChild(nombre);


    var descripcion = document.createElement("p");
    var innerDesc = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].ProductTypeName.$);
    descripcion.classList.add("desc-articulo");
    descripcion.appendChild(innerDesc);
    elementoADD.appendChild(descripcion);

    var x = obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice;
    if (!x.length){
      var y = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice.Price.$);
      var precio = document.createElement("p");
      precio.classList.add("precio-articulo");
      var bti = obj.RetailItemCommList.RetailItemComm[i].BreathTakingItem.$;
      if(bti==true){
        precio.classList.add("precio-BTI");
      }
      precio.id = "pre_"+i;
      precio.appendChild(y);
      elementoADD.appendChild(precio);
      var yy = obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
      if(yy=="unidades"){
        yy = "/" + obj.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + " " + obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
      }
      else{
        yy = "/" + yy;
      }
      y = document.getElementById("pre_"+i).innerHTML;
      y = "€ "+ y.replace(".",",") + " " + yy;
      document.getElementById("pre_"+i).innerHTML = y;
    }
    else{
      var z = obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].RetailPriceType.$;
      if (z=="RegularSalesUnitPrice"){
        var imgNLP = document.createElement("img");
        imgNLP.src = "/ms/img/nlp/es_ES/nlp_02.png";
        imgNLP.classList.add("img-newlowerprice");
        elementoADD.appendChild(imgNLP);
        var zz = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[0].Price.$);
        var precioNLP = document.createElement("p");
        precioNLP.classList.add("precio-articulo");
        precioNLP.id = "pre_NLP"+i;
        precioNLP.appendChild(zz);
        elementoADD.appendChild(precioNLP);
        var yy = obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
        if(yy=="unidades"){
          yy = "/" + obj.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ +" "+ obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
        }
        else{
          yy = "/" + yy;
        }
        zz = document.getElementById("pre_NLP"+i).innerHTML;
        zz = "€ " + zz.replace(".",",") + " " + yy;
        document.getElementById("pre_NLP"+i).innerHTML = zz;
        var zy = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].Price.$);
        var precioRegular = document.createElement("p");
        precioRegular.classList.add("precioNLP");
        precioRegular.id = "pre_REG_NLP"+i;
        precioRegular.appendChild(zy);
        elementoADD.appendChild(precioRegular);
        var yy = obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
        if(yy=="unidades"){
          yy = obj.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
        }
        else{
          yy = "/" + yy;
        }
        zy = document.getElementById("pre_REG_NLP"+i).innerHTML;
        zy = "€ " + zy.replace(".",",") + " " + yy;
        document.getElementById("pre_REG_NLP"+i).innerHTML = zy;
      }
      else if(z=="IKEAFamilySalesUnitPrice"){
        var cabFam = document.createElement("p");
        cabFam.classList.add("cabeceraFamily");
        var textCab = document.createTextNode("Precio IKEA FAMILY");
        cabFam.appendChild(textCab);
        elementoADD.appendChild(cabFam);
        var precioFam = document.createElement("p");
        precioFam.classList.add("precio-articulo-multiple");
        precioFam.id = "pre_FAM"+i;
        var za = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[1].Price.$);
        precioFam.appendChild(za);
        elementoADD.appendChild(precioFam);var yy = obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
        if(yy=="unidades"){
          yy = obj.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
        }
        else{
          yy = "/" + yy;
        }
        za = document.getElementById("pre_FAM"+i).innerHTML;
        za = "€ " + za.replace(".",",") + " " + yy;
        document.getElementById("pre_FAM"+i).innerHTML = za;
        var regFam = document.createElement("p");
        regFam.classList.add("precio-no-socio");
        var textReg = document.createTextNode("Precio normal");
        regFam.appendChild(textReg);
        elementoADD.appendChild(regFam);
        var precioFamReg = document.createElement("p");
        precioFamReg.classList.add("precio-articulo-multiple");
        precioFamReg.id = "pre_FAM_REG"+i;
        var zb = document.createTextNode(obj.RetailItemCommList.RetailItemComm[i].RetailItemCommPriceList.RetailItemCommPrice[0].Price.$);
        precioFamReg.appendChild(zb);
        elementoADD.appendChild(precioFamReg);var yy = obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$;
        if(yy=="unidades"){
          yy = obj.RetailItemCommList.RetailItemComm[i].ItemPriceUnitFactorMetric.$ + "/" + obj.RetailItemCommList.RetailItemComm[i].PriceUnitTextMetric.$
        }
        else{
          yy = "/" + yy;
        }
        zb = document.getElementById("pre_FAM_REG"+i).innerHTML;
        zb = "€ " + zb.replace(".",",") + " " + yy;
        document.getElementById("pre_FAM_REG"+i).innerHTML = zb;
      }
    }

    try {
      var AverageRating = obj.RetailItemCommList.RetailItemComm[i].RetailItemRating.ItemRating.AverageRating.$;
      AverageRating = (AverageRating * 2)*10;
      var NumRatings = obj.RetailItemCommList.RetailItemComm[i].RetailItemRating.ItemRating.Count.$;
      var divRatings = document.createElement("div");
      divRatings.classList.add("dot-ratingsreviews-PLP-api");
      divRatings.id = "d_RR"+i;
      elementoADD.appendChild(divRatings);
      document.getElementById("d_RR"+i).innerHTML = "<span class='api-rating-stars api-rating-stars-off' aria-hidden='true'>  ★★★★★ </span><span class='api-rating-stars api-rating-stars-on' style=width:"+AverageRating+"% !important; aria-hidden='true'>  ★★★★★ </span>"+
      "<p class='api-ratings-number'>("+NumRatings+")</p></div>";
    } catch (error) {
      var divRatings = document.createElement("div");
      divRatings.classList.add("dot-ratingsreviews-PLP-api");
      divRatings.id = "d_RR"+i;
      elementoADD.appendChild(divRatings);
      document.getElementById("d_RR"+i).innerHTML = "<span class='api-rating-stars api-rating-stars-off' aria-hidden='true'>  ★★★★★ </span><span class='api-rating-stars api-rating-stars-on' style=width:0% !important; aria-hidden='true'>  ★★★★★ </span>"+
      "<p class='api-ratings-number'>(0)</p></div>";
    }

    var btnComprar = document.createElement("div");
    btnComprar.classList.add("comprar");
    btnComprar.id = "btn_comprar"+i;
    elementoADD.appendChild(btnComprar);
    document.getElementById("btn_comprar"+i).innerHTML = "<a href='#' onclick='comprar("+i+");return false;'><span class='icon-carrito'></span>Comprar</a>";
    
  }

  var ikeaShop = 'https://secure.ikea.com/webapp/wcs/stores/servlet/InterestItemDisplay?';
  var ikeaShopAdd = 'https://secure.ikea.com/webapp/wcs/stores/servlet/IrwWSInterestItemAdd?';
  /** @type {Object} */
  var ikeaPopup;
  var param = 'storeId=11&langId=-5';
  var art;
  function comprar(i){    
    if(i==0) art = {"20281136" : 1};
    else if(i==1) art = {"10288242" : 1};
    else if(i==2) art = {"20154869" : 1};
    else if(i==3) art = {"70277957" : 1};
    else if(i==4) art = {"80258915" : 1};
    else if(i==5) art = {"00295554" : 1};
    else if(i==6) art = {"30277959" : 1};
    else if(i==7) art = {"00263850" : 1};
    else if(i==8) art = {"30214504" : 1};
    else if(i==9) art = {"00154870" : 1};
    else if(i==10) art = {"20231306" : 1};
    else if(i==11) art = {"30258913" : 1};
    else if(i==12) art = {"10270478" : 1};
    c_art(art);
  }
  function c_art(art){
    var n = 0;var ikeaPath = ikeaShopAdd + param;for (var i in art) {ikeaPath += '&partNumber_'+ n +'=' + i;ikeaPath += '&quantity_'+ n +'=' + art[i];n++;}ikeaPath += '&catalogId=null&priceexclvat';setTimeout(function(){var iframe = document.createElement("iframe");iframe.src = ikeaPath;iframe.style.display = "none";document.getElementsByTagName("body")[0].appendChild(iframe);iframe.on('load', function() {iframe.remove();if (typeof ikeaPopup !== 'undefined') {ikeaPopup.location = ikeaShop + param;} else {window.open(ikeaShop + param);}});}, 1000);ikeaPopup = window.open(ikeaShop + param);
  }

