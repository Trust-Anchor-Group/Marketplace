Title: Quick Login
Description: Quick login Test for Marketplace
Date: 2022-04-12
Author: Mateo Florez
Copyright: /Copyright.md
Master: Master.md
JavaScript: /Marketplace/src/Login/QuickLogin.js
JavaScript: /Marketplace/src/Javascript/Events.js
CSS: Login/QuickLogin.css
Neuron: {{
     QuickLoginSessionId:=Request.Header.Cookie["HttpSessionID"];
     QuickLoginNeuron:=Waher.IoTGateway.Gateway.Domain;
     QuickLoginCallbackUrl:=Waher.IoTGateway.Gateway.GetUrl("/Marketplace/src/Response.ws");

     LogDebug("Registering QuickLogin example service.",
     {
          Domain:QuickLoginNeuron,
          SessionId:QuickLoginSessionId,
          CallbackUrl:QuickLoginCallbackUrl
     });

     Data:=Post("https://"+QuickLoginNeuron+"/QuickLogin",
     {
          sessionId:QuickLoginSessionId,
          service:QuickLoginCallbackUrl
     });

     QuickLoginServiceId:=Data.serviceId;

     LogDebug("QuickLogin example service registered.",
     {
          Domain:QuickLoginNeuron,
          SessionId:QuickLoginSessionId,
          CallbackUrl:QuickLoginCallbackUrl,
          ServiceId:QuickLoginServiceId
     });

     QuickLoginNeuron}}
     Access-Control-Allow-Origin: {{QuickLoginNeuron}}
     Parameter: from
}}


<div class="container text-center">
	<h2>Scan the QR-Code with your TAG ID application to login</h2>
	<div>
	<div id="quickLoginCode"
     		data-mode="image"
     		data-purpose= "To perform a quick login on the Test Marketplace, and display your identity information on the page. This request is valid for one (1) minute."
     		data-serviceId = "{{QuickLoginServiceId}}"
     	/>
	</div>
</div>

