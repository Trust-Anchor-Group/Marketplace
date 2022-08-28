Copyright: /Copyright.md
Icon: /favicon.ico
Javascript: /Marketplace/src/Javascript/Portfolio.js
CSS: /Marketplace/src/css/marketplace.css
BodyOnly: off
AllowSciptTag: true
UserVariable: MarketplaceUser

<div style='display:none'>
{{Exists(MarketplaceUser) ? LogedIn := 1 : LogedIn := 0}}
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</div>
<head>
  <title>Marketplace</title>
  <meta charset="utf-8">
  <meta name="description" content="Home page for TAG Marketplaces">
  <meta name="author" content="Trust Anchor Group AB">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="NEURON" content={{Waher.IoTGateway.Gateway.Domain}}/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-light sticky-top shadow">
  <div class="container-fluid">
    <a class="navbar-brand" href="/Marketplace/src/Home.md">TAG</a>
      <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/Marketplace/src/Home.md">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Marketplace/src/TokenCollections.md">Explore</a>
        </li>
        </li>
		<li class="nav-item"> 
			<a class="nav-link" href="/Marketplace/src/Portfolio.md">Portfolio</a> 
		</li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/Marketplace/src/Resources/Resources.md" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Resources
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/Marketplace/src/Resources/Resources.md">Help Center</a></li>
            <li><a class="dropdown-item" href="/Marketplace/src/ComingSoon.md">Partners</a></li>
            <li><a class="dropdown-item" href="/Marketplace/src/ComingSoon.md">Docs</a></li>
			<li><a class="dropdown-item" href="/Marketplace/src/ComingSoon.md">NewsLetter</a></li>
          </ul>
        </li>
      </ul>
	<ul class="navbar-nav flex-row flex-wrap ms-md-auto">
		<li class="nav-item">
          <a class="nav-link" aria-current="page" href="#" onclick="changeLoginButton({{LogedIn}});">{{LogedIn = 1? ]]Logout[[ : ]]Login[[}}</a>
        </li>
	</ul>
  </div>
</nav>
</body>
<main class="main">[%Details]
</main>
<div class="container mt-auto">
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/Marketplace/src/Home.md" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="/Marketplace/src/TokenCollections.md" class="nav-link px-2 text-muted">Explore</a></li>
      <li class="nav-item"><a href="/Marketplace/src/ComingSoon.md" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="https://www.trustanchorgroup.com/aboutus" target="_blank" class="nav-link px-2 text-muted">About</a></li>
    </ul>
    <p class="text-center text-muted">© 2022 Trust Anchor Group AB</p>
  </footer>
</div>


    




