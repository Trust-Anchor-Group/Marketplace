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
UserVariable: MarketplaceUser
Login: /Marketplace/src/Login.md
Parameter: TokenId

<div style='display:none'>
{{ 
    Token := select top 1 * from  Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = TokenId;
	Item := select top 1 * from Waher.Service.IoTBroker.Marketplace.AuctionItem where TokenId = Token.TokenId and Processed = null;
	TokenEvents := select * from Waher.Service.IoTBroker.NeuroFeatures.Events.TokenEvent where TokenId = TokenId;
}}
</div>


<div class="container info zone">
		<div class="token-basic-info token-description-container bg-secondary bg-opacity-10">
			<div class="token-title">
				<h2 class= "default-blue" style= "text-align: center;">{{Token.FriendlyName}}</h2>
				<div class="token-img-container"><img class="shadow token-img" src="Images/tokenImage.png" alt="glyph-image"/></div>
			</div>
			{{
			if Item = null then
			(
			]]<div class="token-price">
                <h2 class="default-blue"> Current price:</h2>
                <h2>((Token.Value)) ((Token.Currency))</h2>
            </div>
			<div>
                <button class="btn btn-primary" onclick="displaySellQR('((TokenId))')">Offer to Sell</button>
                <div id="sellModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
						<div class="modal-header">
							<h5 class="modal-title">Scan the QR-code with your <a class="link-secondary" href="/Marketplace/src/Resources/Tutorials/TagId/TagIdResources.md">TAG ID App</a>:</5>
						</div>
						<div >
							<img class="qr-code-img" src="/QR/iotsc:((Url:="2a9fe733-cb30-78b2-540a-dd549b0ed8a0@legal.lab.tagroot.io?TokenID="+TokenId+"&Role=Seller"+"&Visibility=PublicSearchable"+"&Auctioneer="+Waher.IoTGateway.Setup.LegalIdentityConfiguration.LatestApprovedLegalIdentityId+"&Currency="+Token.Currency+"&CommissionPercent="+GetSetting('Commission.Min',0)+"&Category="+Token.Category+"&FriendlyName="+Token.FriendlyName;
							UrlEncode(Url) ))" alt="OR-code"/>
						</div>
					</div>
				</div>
            </div>[[;
			);
			if Item != null then 
			(
			]]<div class="auction default-blue">
                Ongoing Auction, The auction ends in ((DateTime(Item.Expires.Year,Item.Expires.Month,Item.Expires.Day,Item.Expires.Hour,Item.Expires.Minute,Item.Expires.Second) -  DateTime(Now.Year,Now.Month,Now.Day,Now.Hour,Now.Minute,Now.Second) ))
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
		</div>
<div class="token-basic-info bg-secondary bg-opacity-10">
	<div class="token-description-container">
		<div class="token-description">
			<h4 class="default-blue">Description</h4>
			<p>{{Token.Description}}</p>
		</div>

{{
]]<div>
<h4 class="default-blue">Technical Details</h4>
<table class="table table-responsive text-start">
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
}}
            </div>
        </div>
{{
if Token.HasStateMachine AND Token.Visibility != Waher.Service.IoTBroker.Legal.Contracts.ContractVisibility.CreatorAndParts then
( 
]]<div class="token-basic-info bg-secondary bg-opacity-10">
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
C := Token.Category = null ? null : Token.Category;
MoreItemsFromCollection := select TOP 5 * from Waher.Service.IoTBroker.NeuroFeatures.Token where Category = C
and
    TokenId != TokenId
and 
	OwnerJid = MarketplaceUser.Properties.JID
order by
	FriendlyName;
if MoreItemsFromCollection.Length > 0 then
(
]]<div class="more-from-collection">
<h2 class="default-blue" >More from the Collection</h2>
<div class="zone grid-wrapper">[[;

foreach Itm in MoreItemsFromCollection
do 
(   
]]<div class="shadow card m-2 token_zone" onclick="location.href='PortfolioTokenView.md?TokenId=((Itm.TokenId))'">
	<img class="card-img-top token-image" src="data:image/png;base64,((Base64Encode(Itm.Glyph) ))" alt="glyph-image"/>
	<div class= "card-body">
		<h6 class="card-title text-start">((Itm.FriendlyName))</h6>
		<p class="card-text text-start">Price <br>((Itm.Value)) ((Itm.Currency))</p>
	</div>
</div>[[
);
)
}}
</div>
</div>
