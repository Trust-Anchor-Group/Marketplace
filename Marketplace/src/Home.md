Title: Home
Description: Welcome to Token Marketplace
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: Master.md
Javascript: Javascript/Moreinfo.js
CSS: css/Home/hero-image.css
AllowSciptTag: true

<div style='display:none' id = "collections">
{{ 
    Items := select top 4 * from Waher.Service.IoTBroker.Marketplace.AuctionItem
	where 
		Type != null
	and 
		Processed = null
	and	
		Expires > now 
	order by Type;

}}
</div>


<div class="hero-image mb-2">
	<div class="hero-image-gradient"></div>
	<div class="container hero-text">
    	<h1>Welcome to the Trust Anchor Group Marketplace</h1>
    	<p class="lead">Discover, collect, and sell Next-Generation Tokens</p>
    </div>
</div>

{{
if Items.Length != 0 then 
(
]]<div class="container mt-5 mb-5">
<h4 class="text-center m-3 pb-2 border-bottom">Notable Items</h2>
<div class="zone grid-wrapper">[[;

foreach Item in Items
do    
(
Token :=  select * from Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = Item.Tags.Value[0];
if Token.Length != 0 then
(
Cgy := Item.Type;
Name := Token.FriendlyName[0];
Id := Token.TokenId[0];
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AskingPrice);
Currency := Item.Currency;
if System.IO.Directory.Exists(System.IO.Path.Combine(Waher.IoTGateway.Gateway.RootFolder,"Marketplace\\src\\Collections",Cgy)) then
	]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="moreTokenInfo('((HtmlAttributeEncode(Cgy) ))', '((HtmlAttributeEncode(Id) ))' )">
		<img class="card-img-top token-image" src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/((Cgy))/Images/tokenImage.png" alt="glyph-image"/>
		<div class= "card-body">
		<h6 class="card-title">((Name))</h6>
		<p class="card-text text-start">Price <br>((Price)) ((Currency))</p>
		</div>
	</div>
	[[
else
	]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="moreTokenInfo('((HtmlAttributeEncode("Default") ))', '((HtmlAttributeEncode(Id) ))' )">
		<img class="card-img-top token-image" src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/Default/Images/tokenImage.png" alt="glyph-image"/>
		<div class= "card-body">
			<h6 class="card-title">((Name))</h6>
			<p class="card-text text-start">Price <br>((Price)) ((Currency))</p>
		</div>
	</div>
	[[
)
);
)
else 
]]<div class="container">
	<div class="token-basic-info token-description-container">
		<div class="token-title">
			<div>
				<h3 class= "default-blue" style= "text-align: center;">No Tokens listed at the moment</h3>
			</div>
		</div>
	</div>
</div>[[;
}}
</div>
</div>
<div class="create-and-sell mt-5">
	<div class="container px-4 py-5" id="hanging-icons">
    <h4 class="pb-2 border-bottom text-center">Create & Sell your Tokens</h4>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature-col text-center">
		<div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-phone-fill" viewBox="0 0 16 16">
				<path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
			</svg>
		</div>
        <div>
          <h6 >Setup TAG ID App</h6>
          <p>Once you’ve downloaded and set up the <span class="text-primary">TAG ID</span> app from the app store, log in by clicking the Login button in the top right corner.<p>
        </div>
      </div>
      <div class="feature-col text-center">
	  	<div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-phone-fill" viewBox="0 0 16 16">
				<path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
			</svg>
		</div>
        <div>
          <h6 >Create your own Token </h6>
          <p>Create your own Tokens with the help of our <span class="text-primary">next-generation Smart Contracts</span> via the TAG ID app.</p>
        </div>
      </div>
      <div class="feature-col text-center">
		<div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-phone-fill" viewBox="0 0 16 16">
				 <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
				<path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
			</svg>
		</div>
        <div>
          <h6 >List Token for sale</h6>
          <p>You choose how you want to sell your Token, the most efficient way is an <span class="text-primary">auction</span>, where the auction is automated to find the best buyer for your Token.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container px-4 py-5" id="custom-cards">
<h4 class="pb-2 border-bottom text-center">Resources to get started </h4>

<div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
  <div class="col">
	<div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-1.jpg');">
	  <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
		<h6 class="mb-4 display-6 lh-1 fw-bold text-center">TAG ID App</h2>
		<p class="mt-auto">How to setup the TAG ID application</p>
	  </div>
	</div>
  </div>

  <div class="col">
	<div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-2.jpg');">
	  <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
		<h6 class="mb-4 display-6 lh-1 fw-bold text-center">Buy Tokens</h2>
		<p class="mt-auto" >How to buy your first Token</p>
	  </div>
	</div>
  </div>

  <div class="col">
	<div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
	  <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
		<h6 class=" mb-4 display-6 lh-1 fw-bold text-center">Sell Tokens</h2>
		<p class="mt-auto">How to list your first Token for sale</p>
	  </div>
	</div>
  </div>
</div>
</div>