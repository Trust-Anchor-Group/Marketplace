Copyright: /Copyright.md
Icon: /favicon.ico
Javascript: /Marketplace/src/Javascript/Portfolio.js
CSS: /Marketplace/src/css/marketplace.css
BodyOnly: off
UserVariable: MarketplaceUser
AllowSciptTag: true

<div style='display:none'>
{{Exists(MarketplaceUser) ? LogedIn := 1 : LogedIn := 0}}
</div>

<head>
  <title>Marketplace</title>

  <meta charset="utf-8">
  <meta name="description" content="welcome page for TAG Marketplaces">
  <meta name="author" content="Trust Anchor Group">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="NEURON" content="mateo.lab.tagroot.io"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

</head>


<nav class="tag sticky bg-light">
    <ul class="main-nav">
        <li>
            <a href="/Marketplace/src/Home.md">Home</a>
        </li>
        <li>
            <a href="/Marketplace/src/TokenCollections.md">Explore</a>
        </li>{{ 
if LogedIn = 1 then ]]<li> <a href="/Marketplace/src/Portfolio.md">Portfolio</a> </li>[[
}}
        <li>
            <a href="https://www.trustanchorgroup.com/kopia-pa-about-us-2" target="_blank">Contact</a>
        </li>
        <li class="push">
            <button id="login_btn" class="btn btn-dark" onclick="changeLoginButton({{LogedIn}});">
            {{LogedIn = 1? ]]Logout[[ : ]]Login[[}}
            </button>
        </li>
    </ul>
</nav> 

<main class="main">  
[%Details]
</main>

    




