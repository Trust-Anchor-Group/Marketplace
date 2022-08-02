Title: Token Information
Description: more in depth information about a expecific Token.
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
Javascript: /Marketplace/src/Javascript/Popup.js
CSS: /Marketplace/src/css/marketplace.css
CSS: /Marketplace/src/Collections/Default/css/style.css
CSS: css/more-info.css
Parameter: TokenId
UserVariable: MarketplaceUser
Login: /Marketplace/src/Login.md

<div style='display:none'>
{{ 
    Token := select top 1 * from  Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = TokenId;
	Item := select top 1 * from Waher.Service.IoTBroker.Marketplace.AuctionItem where Tags[0].Value = Token.TokenId and Processed = null;
}}
</div>



<div class="container info zone">
		<div class="token-basic-info token-description-container">
			<div class="token-title">
				<h3 class= "default-blue" style= "text-align: center;">{{Token.FriendlyName}}</h3>
				<div class="token-img-container"><img class="token-img" src="Images/tokenImage.png" alt="glyph-image"/></div>
			</div>
			{{
			if Item = null then
			(
			]]<div class="token-price">
                <h2 class="default-blue"> Current price:</h2>
                <h2>((Token.Value)) ((Token.Currency))</h2>
            </div>
			<div>
                <button class="sell-button" onclick="displaySellQR('((TokenId))')">Offer to Sell</button>
                <div id="sellModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
						<div class="modal-header">
							<h5 class="modal-title">Scan the QR-code with your TAG ID App:</p>
						</div>
						<div >
							<img class="qr-code-img" src="https://mateo.lab.tagroot.io/QR/iotsc:((Url:="2a6d24b9-a8cd-b590-602d-c8634f0510d3@legal.mateo.lab.tagroot.io?TokenID="+TokenId+"&Role=Seller"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId+"&CommissionPercent="+GetSetting('Commission.Min',0);
							UrlEncode(Url) ))" alt="OR-code"/>
						</div>
							<p><strong>Or</strong> copy the following link and paste it into your application: </br> <code>iotsc:((Url))</code></p>
					</div>
				</div>
            </div>[[;
			);
			if Item != null then 
			(
			]]<div class="token-price">
                <h2 class="default-blue">Ongoing Auction, The auction ends in ((DateTime(Item.Expires.Year,Item.Expires.Month,Item.Expires.Day,Item.Expires.Hour,Item.Expires.Minute,Item.Expires.Second) -  DateTime(Now.Year,Now.Month,Now.Day,Now.Hour,Now.Minute,Now.Second) ))</h2>
            </div>
			<div class="token-price-wrapper">
			<div class="token-price">
				<h2 class="default-blue"> Asking Price:</h2>
				<h2>((Item.AskingPrice)) ((Item.Currency))</h2>
			</div>
			<div class="token-price">
				<h2 class="default-blue">Reject Price:</h2>
				<h2>((Item.RejectPrice)) ((Item.Currency))</h2>
			</div>
			<div class="token-price">
				<h2 class="default-blue"> Current bid:</h2>[[;
				if Item.BestBidPrice != null then
				(
				]]<h2>((Item.BestBidPrice)) ((Item.Currency))</h2>[[;
				);
				if Item.BestBidPrice = null then
				(
				]]<h2>0 ((Item.Currency))</h2>[[;
				);
			]]</div>
			<div class="token-price">
				<h2 class="default-blue">Accept Price:</h2>
				<h2>((Item.AcceptPrice)) ((Item.Currency))</h2>
			</div>
			</div>[[;
			);
			}}
			
<div class="token-basic-info">
	<div class="token-description-container">
		<div class="token-description">
			<h3 class="default-blue">Description</h3>
			<p>{{Token.Description}}</p>
		</div>

{{
]]<div>
<h3 class="default-blue">Technical Details</h3>
<table>
  <thead>
	<tr>
		<th>Property</th>
		<th>Value</th>
	</tr>
  </thead>
  <tbody class="table-group-divider text-break">
  <tr>
    <td>Name</td>
    <td>((Token.FriendlyName))</td>
  </tr>
  <tr>
    <td>Token ID</td>
    <td>((Token.TokenId))</td>
  </tr>
  <tr>
    <td>Ordinal</td>
    <td>1 of ((Token.Ordinal))</td>
  </tr>
  <tr>
    <td>Created</td>
    <td>((Token.Created))</td>
  </tr>
   <tr>
    <td>Expires</td>
    <td>((Token.Expires))</td>
  </tr>
  <tr>
    <td>Token URI</td>
    <td>nfeat: ((TokenId))</td>
  </tr>
  </tbody>
</table>
<p><strong>Scan</strong> the QR-code bellow with the <strong>TAG ID</strong> app to see more information:</p>
<img class="qr-code-img" src="https://mateo.lab.tagroot.io/QR/nfeat:((TokenId))" alt="OR-code"/>
</div>[[
}}
            </div>
        </div>
       
</div>
{{
MoreItemsFromCollection := select TOP 4 * from NeuroFeatureTokens where Category = Token.Category
and
    TokenId != TokenId
and 
	OwnerJid = MarketplaceUser.Properties.JID
order by
	FriendlyName;
if MoreItemsFromCollection.Length > 0 then
(
]]<div class="more-from-collection">
<h3 class="default-blue" >More from the Collection</h3>
<div class="zone grid-wrapper">[[;

foreach Item in MoreItemsFromCollection
do 
(   
]]<div class="box token_zone" onclick="location.href='TokenInfo.md?TokenId=((Item.TokenId))'">
	<img src="data:image/png;base64,((Base64Encode(Item.Glyph) ))" alt="glyph-image"/>
	<div class= "box-token-description">
	<h3><strong>((Item.FriendlyName))</strong></h3>
	Price
	<h3>((Item.Value)) ((Item.Currency))</h3>
	</div>
</div>[[
);
)
}}
</div>

