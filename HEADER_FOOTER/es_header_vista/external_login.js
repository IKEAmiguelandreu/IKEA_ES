<script type="text/javascript">
    //<![CDATA[
    var storeId = "11";
    var userInfo = getUserInfo('11','normal');                                              
    document.observe('dom:loaded', function(){
        userInfo = getUserInfo('11');
        updateWelcomeText();
        updateNoOfCartItems('11');
        generateScLinkListener('11');
    });
    function updateWelcomeText(){
        var userLoggedIn = '<p style="text-align:center;margin-top:1em;margin-bottom: 0em;margin-left: 1em;margin-right: 1em;font-size:12px;">¡Hola {title} {firstname} {lastname}!</p><p style="text-align:center; font-size: 11px; margin-top: 2em;">Accede a tu <a style="padding-top: 0em; font-size: 11px !important;" href="https://secure.ikea.com/webapp/wcs/stores/servlet/MyProfile?langId=-5&amp;storeId=11">área personal.</a></p><p style="margin-bottom: 0px; margin-top: 0px;text-align:center;"><a style="text-align:center;font-size: 11px;margin-top: -2em;" href="/ms/es_ES/service-offer/ikea-donde-esta-mi-pedido.html">¿Dónde está mi pedido?</a></p><hr><p style="text-align:center; font-size: 11px">¿No eres {firstname}?<br><a style="text-align:center; font-size: 11px" href="/webapp/wcs/stores/servlet/Logoff?langId=-5&amp;storeId=11&amp;forgetMe=true" rel="nofollow"> Haz clic aquí</a></p>';
        var userNotLoggedIn = '<p style="text-align:center;margin-top:1em;margin-bottom:1em;font-size: 12px;">¡Hola de nuevo!<br>Nos gusta volver a verte<br></p><p style="text-align:center; font-size: 12px !important;"><a href="javascript:logonLink();" class="btn-IniciaSesion" rel="nofollow">Inicia Sesión</a></p><hr class="hr-login"><p style="text-align:center; font-size: 12px;">¿No tienes cuenta?<br><br><a href="javascript:logonLink();" style="color:black !important; text-decoration:underline;">Créala ahora</a></p>';
        if(userInfo != null && userInfo.firstName != "" && userInfo.firstName != ""){
            userLoggedIn = userLoggedIn.replace(/{firstname}/g,userInfo.firstName.escapeHTML());
            userLoggedIn = userLoggedIn.replace(/{lastname}/g,userInfo.lastName.escapeHTML());
            userLoggedIn = userLoggedIn.replace(/{title}/g,userInfo.title.escapeHTML());
            document.getElementById("loginFormFunction").innerHTML = userLoggedIn;
            document.getElementById("login-ico").style.filter = "none";     
        }
        else{
            document.getElementById("loginFormFunction").innerHTML = userNotLoggedIn;
            document.getElementById("login-ico").style.filter = "filter: grayscale(100%);"; 
        }
    };
    //]]>
</script>