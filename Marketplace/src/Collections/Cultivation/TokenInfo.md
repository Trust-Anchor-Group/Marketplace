Title: Token Information
Description: more in depth information about a expecific Token.
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
Javascript: /Marketplace/src/Javascript/Popup.js
CSS: /Marketplace/src/css/marketplace.css
CSS: /Marketplace/src/Collections/Cultivation/css/style.css
Parameter: TokenId

<div style='display:none'>
{{ 
    Token := select top 1 * from  Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = TokenId;
	TokenEvents := select * from Waher.Service.IoTBroker.NeuroFeatures.Events.TokenEvent where TokenId = TokenId;
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



<div class="container info zone ">
	<div class="token-basic-info token-description-container bg-secondary bg-opacity-10">
		<div class="token-title">
			<div><h2 class= "default-blue Lead" style= "text-align: center;">{{Token.FriendlyName}}</h2></div>
			<div class="token-img-container"><img class="shadow token-img" src="Images/tokenImage.png" alt="glyph-image"/></div>
		</div>
		<div class="auction default-blue m-3">
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
							<h5 class="modal-title">Scan the QR-code with your <a class="link-secondary" href="/Marketplace/src/Resources/Tutorials/TagId/TagIdResources.md">TAG ID App</a>:</p>
						</div>
						<img class="qr-code-img" src="/QR/iotsc:{{Url:="2a7d62ce-a8e5-d476-9c1f-618860926193@legal.mateo.lab.tagroot.io?RequestForTendersId="+Item.ContractId+"&Visibility=PublicSearchable"+"&Price="+Item.AcceptPrice+"&Currency="+Item.Currency+"&Role=Buyer"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId;
						UrlEncode(Url)}}" alt="OR-code"/>
					</div>
				</div>
			</div>
			<div>
				<button class="offer-button btn-primary" onclick="displayOfferQR('{{TokenId}}')">Make an offer</button>
				<div id="offerModal" class="modal">
					<div class="modal-content">
						<span class="close">&times;</span>
						<div class="modal-header">
							<h5 class="modal-title">Scan the QR-code with your <a class="link-secondary" href="/Marketplace/src/Resources/Tutorials/TagId/TagIdResources.md">TAG ID App</a>:</p>
						</div>
						<img class="qr-code-img" src="/QR/iotsc:{{Url:="2a7d62ce-a8e5-d476-9c1f-618860926193@legal.mateo.lab.tagroot.io?RequestForTendersId="+Item.ContractId+"&Currency="+Item.Currency+"&Visibility=PublicSearchable"+"&Role=Buyer"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId;
						UrlEncode(Url)}}" alt="OR-code"/>
					</div>
				</div>
			</div>
		</div>
    </div>
	<div class="token-basic-info bg-secondary bg-opacity-10">
		<div class="token-description-container">
			<div class="token-description">
				<h4 class="default-blue">Description</h4>
				<p>{{Token.Description}}</p>
			</div>

{{
if Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.Public || Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.PublicSearchable then
(
]]<div>
<h4 class="default-blue">Technical Details</h4>
<table class =" table-responsive table text-start">
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
<img class="qr-code-img" src="/QR/nfeat:((TokenId))" alt="OR-code"/>
</div>[[
);

if Token.Visibility == Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.DomainAndParts then 
(
]]<div>
<h3 class="default-blue">Technical Information</h3>
<p><strong>Token URI:</strong> nfeat: ((TokenId))</p>
<p><strong>Scan</strong> the QR-code bellow with the <strong>TAG ID</strong> app to see more information:</p>
<img class="qr-code-img" src="/QR/nfeat:((TokenId))" alt="OR-code"/>
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
]]<div class="token-basic-info bg-secondary bg-opacity-10">
<h4 class="default-blue" style= "text-align: center;">Present State</h4>

((Token.GeneratePresentReport() ))

<div class="report-btns">
	<button class="btn btn-primary" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=History'">View History</button>
	<button class="btn btn-primary" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=Diagram'">View State Diagram</button>
	<button class="btn btn-primary" onclick="location.href='Reports.md?TokenId=((Token.TokenId))&ReportType=Variables'">View State Variables</button>
</div>
</div>[[;
);
}}
<div class="token-basic-info bg-secondary bg-opacity-10">
    <div class="token-description-container">
        <div class="token-description">
            <h4 class="default-blue">Token Events</h4>
            <p>Following are the public transaction events recorded for the token</p>
        </div>
		<div class="table-responsive">
		<table class ="table text-start">
		  <thead>
			<tr>
				<th>Event</th>
				<th>Price</th>
				<th>From</th>
				<th>To</th>
				<th>Ownership Contract</th>
				<th>Timestamp</th>
			</tr>
		  </thead>
		  <tbody class="table-group-divider text-wrap">
{{
foreach event in TokenEvents do
(
if (event.ElementName = "Transferred" and event.Personal = false) then
(
]]<tr>
<td>((event.ElementName))</td>
<td>((event.Value)) ((event.Currency))</td>
<td>((event.Seller))</td>
<td>((event.Owner))</td>
<td>((event.OwnershipContract))</td>
<td>((event.Timestamp))</td>
</tr>[[
)
else if (event.ElementName = "Created" and event.Personal = false) then
(
]]<tr>
<td>((event.ElementName))</td>
<td>((event.Value)) ((event.Currency))</td>
<td></td>
<td>((event.Owner))</td>
<td>((event.OwnershipContract))</td>
<td>((event.Timestamp))</td>
</tr>[[
)
)
}}
</tbody>
</table>
</div>
<button type="button" class="btn btn-primary" onclick="location.href='Reports.md?TokenId={{Token.TokenId}}&ReportType=Events'">View all events</button>
</div>
</div>
{{
if Items.Length > 0 then
(
]]<div class="more-from-collection">
<h4 class="default-blue" >More Tokens from the ((Token.Category)) collection</h4>
<div class="zone grid-wrapper">[[;
foreach Item in Items
do
(
Tkn :=  select * from Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = Item.Tags.Value[0];
if Tkn.Length != 0 then
(
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AskingPrice);
]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="location.href='TokenInfo.md?TokenId=((Tkn.TokenId[0]))'">
<img class="card-img-top token-image" src="/Marketplace/src/Collections/Cultivation/Images/tokenImage.png" alt="glyph-image"/>
<div class= "card-body">
	<h6 class="card-title text-start">((Tkn.FriendlyName[0]))</h6>
	<p class="card-text text-start">Price <br>((Price)) ((Item.Currency))</p>
</div>
</div>[[;
)
);
)
}}
</div>
</div>



