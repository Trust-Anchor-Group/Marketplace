Title: Welcome
Description: Welcome to Token Marketplace
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
CSS: css/Explore/hero-image.css
Javascript: Javascript/MoreInfo.js
Master: Master.md


<div style='display:none' id = "collections">
{{ 
    Collections := select distinct Type 
		from 
			Waher.Service.IoTBroker.Marketplace.AuctionItem
		where 
			Type != null 
		and 
			Processed = null
		and 
			Expires  > Now
		order by Type;

}}
</div>

{{
if Collections.Length != 0 then
(
]]<div class="hero-image">
   <div class="hero-text">
    	<h1>Explore Token Collections</h1>
    </div>
</div>
<div class="zone grid-wrapper">
[[;
foreach C in Collections
do  
(  
	if System.IO.Directory.Exists(System.IO.Path.Combine(Waher.IoTGateway.Gateway.RootFolder,"Marketplace\\src\\Collections",C)) then
		]]<div class="box token_zone bg-image" onclick="moreInfo('((HtmlAttributeEncode(C) ))', '((HtmlAttributeEncode(" ") ))' )">
			<img src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/((C))/Images/tokenImage.png" alt="glyph-image"/>
			<div class= "box-token-description">
			<h3><strong>The ((C)) Collection</strong></h3>
			</div>
		</div>
		[[
	else
		]]<div class="box token_zone bg-image" onclick="moreInfo('((HtmlAttributeEncode("Default") ))', '((HtmlAttributeEncode(C) ))' )">
			<img src="https://mateo.lab.tagroot.io/Marketplace/src/Collections/Default/Images/tokenImage.png" alt="glyph-image"/>
			<div class= "box-token-description">
			<h3><strong>The ((C)) Collection</strong></h3>
			</div>
		</div>
		[[
		
);
)
else 
]]<div class="hero-image">
   <div class="hero-text">
    	<h1>Explore Token Collections</h1>
    </div>
</div>
<div class="container">
	<div class="token-basic-info token-description-container">
		<div class="token-title">
			<div>
				<h3 class= "default-blue" style= "text-align: center;">No Tokens listed at the moment</h3>
			</div>
		</div>
	</div>
</div>
[[;
}}
</div>