﻿function DisplayQuickLoginQRCode()
{
    var Div = document.getElementById("quickLoginCode");
    if (!Div)
        return;

    if (!Div.hasAttribute("data-done"))
    {
        Div.className = "QuickLogin";
        Div.setAttribute("data-done", "0");
    }
    else if (Div.getAttribute("data-done") == "1")
        return;

    var Mode = Div.getAttribute("data-mode");
    var Purpose = Div.getAttribute("data-purpose");
    var ServiceId = Div.hasAttribute("data-serviceId") ? Div.getAttribute("data-serviceId") : "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (xhttp.readyState === 4)
        {
            if (xhttp.status === 200)
            {
                try
                {
                    var Data = JSON.parse(xhttp.responseText);
                    if (Data.text)
                    {
                        var Pre = document.getElementById("quickLoginPre");

                        if (!Pre)
                        {
                            Pre = document.createElement("PRE");
                            Pre.setAttribute("id", "quickLoginPre");
                            Div.appendChild(Pre);
                        }

                        Pre.innerText = Data.text;

                        var Img = document.getElementById("quickLoginImg");
                        if (Img)
                            Img.parentNode.removeChild(Img);
                    }
                    else
                    {
                        var Img = document.getElementById("quickLoginImg");

                        if (!Img)
                        {
                            Img = document.createElement("IMG");
                            Img.setAttribute("id", "quickLoginImg");
                            Div.appendChild(Img);
                        }

                        if (Data.base64)
                            Img.setAttribute("src", "data:" + Data.contentType + ";base64," + Data.base64);
                        else if (Data.src)
                            Img.setAttribute("src", Data.src);

                        Img.setAttribute("width", Data.width);
                        Img.setAttribute("height", Data.height);

                        var Pre = document.getElementById("quickLoginPre");
                        if (Pre)
                            Pre.parentNode.removeChild(Pre);
                    }

                    LoginTimer = window.setTimeout(function () { DisplayQuickLoginQRCode(); }, 2000);
                }
                catch (e)
                {
                    console.log(e);
                    console.log(xhttp.responseText);
                }
            }
            else
                ShowError(xhttp);
        };
    }

    var Uri = window.location.protocol + "//" + FindNeuronDomain() + "/QuickLogin";

    xhttp.open("POST", Uri, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(
        {
            "serviceId": ServiceId,
            "tab": TabID,
            "mode": Mode,
            "purpose": Purpose
        }));
}

function SignatureReceivedBE(Empty)
{
	var Parameters=new URLSearchParams(window.location.search);
	var From=Parameters.get("from");
	if(From == null){window.location.href = "Portfolio.md"; return;}
	window.location.href=From;
}

var LoginTimer = window.setTimeout(function () { DisplayQuickLoginQRCode(); }, 500);