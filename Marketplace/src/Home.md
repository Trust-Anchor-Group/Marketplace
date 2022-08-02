Title: Welcome
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
    Items := select * from Waher.Service.IoTBroker.Marketplace.AuctionItem
	where 
		Type != null
	and 
		Processed = null
	and	
		Expires > now 
	order by Type;

}}
</div>

<div class="hero-image">
   <div class="hero-text">
    	<h1>Welcome to the Trust Anchor Group Marketplace</h1>
    	<p>Making the world a better place</p>
    </div>
</div>

{{
if Items.Length != 0 then 
(
]]<div class="container-fluid">
<h2 class="text-center m-2">Explore Tokens</h2>
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
	]]<div class="box token_zone" onclick="moreTokenInfo('((HtmlAttributeEncode(Cgy) ))', '((HtmlAttributeEncode(Id) ))' )">
		<img id="token-image" src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/((Cgy))/Images/tokenImage.png" alt="glyph-image"/>
		<div class= "box-token-description">
		<h3><strong>((Name))</strong></h3>
		Price
		<h3>((Price)) ((Currency))</h3>
		</div>
	</div>
	[[
else
	]]<div class="box token_zone" onclick="moreTokenInfo('((HtmlAttributeEncode("Default") ))', '((HtmlAttributeEncode(Id) ))' )">
		<img id="token-image" src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/Default/Images/tokenImage.png" alt="glyph-image"/>
		<div class= "box-token-description">
		<h3><strong>((Name))</strong></h3>
		Price
		<h3>((Price)) ((Currency))</h3>
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