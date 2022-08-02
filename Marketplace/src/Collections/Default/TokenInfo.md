Title: Token Information
Description: more in depth information about a expecific Token.
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
Javascript: /Marketplace/src/Javascript/Popup.js
CSS: /Marketplace/src/css/marketplace.css
CSS: /Marketplace/src/Collections/Default/css/style.css
Parameter: TokenId

<div style='display:none'>
{{ 
    Token := select top 1 * from  Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = TokenId;
	Item := select top 1 * from Waher.Service.IoTBroker.Marketplace.AuctionItem where TokenId = Token.TokenId and Processed = null;
	Items := (select top 5 * 
		from 
			Waher.Service.IoTBroker.Marketplace.AuctionItem 
		where 
			Type = Item.Type 
		and 
			Processed = null
		and 
			ObjectId != Item.ObjectId 
		and
			Expires > Now
		);
}}
</div>



<div class="container info zone">
	<div class="token-basic-info token-description-container">
		<div class="token-title">
			<div><h2 class= "default-blue" style= "text-align: center;">{{Token.FriendlyName}}</h2></div>
			<div class="token-img-container"><img class="token-img" src="Images/tokenImage.png" alt="glyph-image"/></div>
		</div>
		<div class="auction">
			The auction ends in {{DateTime(Item.Expires.Year,Item.Expires.Month,Item.Expires.Day,Item.Expires.Hour,Item.Expires.Minute,Item.Expires.Second) -  DateTime(Now.Year,Now.Month,Now.Day,Now.Hour,Now.Minute,Now.Second)}}
		</div>
		<div class="token-price-wrapper">
			<div class="token-price">
				<h2 class="default-blue"> Current bid:</h2>
				{{if Item.BestBidPrice != null then
				]]<h2>((Item.BestBidPrice)) ((Item.Currency))</h2>[[
				else 
				]]<h2>((Item.AskingPrice)) ((Item.Currency))</h2>[[
				}}
			</div>
			<div class="token-price">
				<h2 class="default-blue">Buy Now Price:</h2>
				<h2>{{Item.AcceptPrice}} {{Item.Currency}}</h2>
			</div>
			<div class="token-price">
				<h2 class="default-blue">Reject Price:</h2>
				<h2>{{Item.RejectPrice}} {{Item.Currency}}</h2>
			</div>
		</div>
		<div class= "token-price-buttons-wrapper">
			<div>
				<button class="buy-button" onclick="displayBuyQR('{{TokenId}}')">Buy now</button>
				<div id="buyModal" class="modal">
					<div class="modal-content">
						<span class="close">&times;</span>
						<div class="modal-header">
							<h5 class="modal-title">Scan the QR-code with your TAG ID App:</p>
						</div>
						<img class="qr-code-img" src="https://mateo.lab.tagroot.io/QR/iotsc:{{Url:="2a6d4954-a8cd-b788-602d-c8634f539d6d@legal.mateo.lab.tagroot.io?RequestForTendersId="+Item.ContractId+"&Price="+Item.AcceptPrice+"&Currency="+Item.Currency+"&Role=Buyer"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId;
						UrlEncode(Url)}}" alt="OR-code"/>
						<p><strong>Or</strong> copy the following link and paste it into your application: </br> <code>iotsc:{{Url}}</code></p>
					</div>
				</div>
			</div>
			<div>
				<button class="offer-button" onclick="displayOfferQR('{{TokenId}}')">Make an offer</button>
				<div id="offerModal" class="modal">
					<div class="modal-content">
						<span class="close">&times;</span>
						<div class="modal-header">
							<h5 class="modal-title">Scan the QR-code with your TAG ID App:</p>
						</div>
						<img class="qr-code-img" src="https://mateo.lab.tagroot.io/QR/iotsc:{{Url:="2a6d4954-a8cd-b788-602d-c8634f539d6d@legal.mateo.lab.tagroot.io?RequestForTendersId="+Item.ContractId+"&Currency="+Item.Currency+"&Role=Buyer"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId;
						UrlEncode(Url)}}" alt="OR-code"/>
						<p><strong>Or</strong> copy the following link and paste it into your application: </br> <code>iotsc:{{Url}}</code></p>
					</div>
				</div>
			</div>
		</div>
    </div>
	<div class="token-basic-info">
		<div class="token-description-container">
			<div class="token-description">
				<h3 class="default-blue">Description</h3>
				<p>{{Token.Description}}</p>
			</div>

{{
if Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.Public || Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.PublicSearchable then
(
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
);

if Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.DomainAndParts then 
(
]]<div>
<h3 class="default-blue">Technical Information</h3>
<p><strong>Token URI:</strong> nfeat: ((TokenId))</p>
<p><strong>Scan</strong> the QR-code bellow with the <strong>TAG ID</strong> app to see more information:</p>
<img class="qr-code-img" src="https://mateo.lab.tagroot.io/QR/nfeat:((TokenId))" alt="OR-code"/>
</div>[[
);

if Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.CreatorAndParts then 
(
]]<div>
<h3 class="default-blue">Technical Information</h3>
<p><strong>This information is only avialable for the parties involved in the Token</strong></p>
[[
);
}}             
            </div>
        </div>


{{
if Token.HasStateMachine AND Token.Visibility != Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.CreatorAndParts then
( 
]]<div class="token-basic-info">
<h3 class="default-blue" style= "text-align: center;">Present State</h3>

((Token.GeneratePresentReport() ))

<div class="report-btns">
	<button class="report-button" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=History'">View History</button>
	<button class="report-button" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=Diagram'">View State Diagram</button>
	<button class="report-button" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=Profiling'">View Profiling</button>
</div>
</div>[[;
);
}}
{{
if Items.Length > 0 then
(
]]<div class="more-from-collection">
<h3 class="default-blue" >More Tokens from the ((Token.Category)) collection</h3>
<div class="zone grid-wrapper">[[;
foreach Item in Items
do
(
Token :=  select * from Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = Item.Tags.Value[0];
if Token.Length != 0 then
(
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AskingPrice);
]]<div class="box token_zone" onclick="location.href='TokenInfo.md?TokenId=((Token.TokenId[0]))'">
<img class="box-token-img" src="data:image/png;base64,((Base64Encode(Token.Glyph[0]) ))" alt="glyph-image"/>
<div class= "box-token-description">
<h3><strong>((Token.FriendlyName[0]))</strong></h3>
Price
<h3>((Price)) ((Item.Currency))</h3></div>
</div>[[;
)
);
)
}}
</div>
</div>



