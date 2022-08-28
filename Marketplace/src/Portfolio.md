Title: Portfolio
Description: Portfolio
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: Master.md 
UserVariable: MarketplaceUser
Login: Login.md
CSS: css/Portfolio/portfolio.css
Parameter: Sort
Parameter: LogOut
Parameter: LogIn

<div style='display:none'>
{{
	if MarketplaceUser = null then 
	(
	TemporaryRedirect("Login.md?from=Portfolio.md")
	)
	else if LogOut then
	(
		MarketplaceUser := null;
		TemporaryRedirect("Login.md?from=Portfolio.md");
	)
	else if LogIn then(LogIn:=False;)
}}
{{
	Order := empty(Sort) ? "Value" : Str(Sort);
	if Order = "Value ASC" then
		Tokens := select *
		from
			Waher.Service.IoTBroker.NeuroFeatures.Token
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			Value ASC;
	if Order = "Value DESC" then
		Tokens := select *
		from
			Waher.Service.IoTBroker.NeuroFeatures.Token
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			Value DESC;
	if Order = "Name ASC" then
		Tokens := select *
		from
			Waher.Service.IoTBroker.NeuroFeatures.Token
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			FriendlyName ASC;
	if Order = "Name DESC" then
			Tokens := select *
		from
			Waher.Service.IoTBroker.NeuroFeatures.Token
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			FriendlyName DESC;
	if Order = "Value" then
		Tokens := select *
		from
			Waher.Service.IoTBroker.NeuroFeatures.Token
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			Value;
	
	LogDebug("Checking if a POST has been made.");
	
	if exists(Posted) then 
	(
		LogDebug("Destroying Marketplaceuser.");
		Destroy(MarketplaceUser);

		LogDebug("Redirecting to login page.");
		TemporaryRedirect("Login.md?from=Portfolio.md");
	)
}} 
</div>
<div class="hero-image">
	<div class="hero-image-gradient"></div>
	<div class="container hero-text">
    	<h1>Welcome {{MarketplaceUser.Properties.FIRST ??? ""}} {{MarketplaceUser.Properties.LAST ??? ""}}!</h1>
		<img class="profile-img" src="{{MarketplaceUser.Attachments[0].BackEndUrl}}" alt="Profile Picture"/>
    </div>
</div>
<div class = "container">
{{
if Tokens.Length > 0 then 
(
]]<div class="container my-4">
<h2>Your Tokens</h3>
		<div class="row row-cols-1 row-cols-4 g-2 g-lg-3 text-start">
			<div class="col-md-2">
				<p class="m-1"><code>((Tokens.FriendlyName.Length))</code></br>Total items</p>
			</div>
			<div class="col-md-2">
				<p class="m-1"><code>((sum:= 0; foreach value in Tokens.Value do sum += value;)) ((Tokens.Currency[0]))</code></br> Total volume</p>
			</div>
			<div class="col-md-2">
				<p class="m-1"><code>((Max(Tokens.Value) )) ((Tokens.Currency[0]))</code></br>Most Valuable Item</p>
			</div>
		</div>
</div>
<div class="container my-4">
	<form action="?Sort=">
		<label for="tokens">Sort by:</label>
		<select name="Sort" id="sort">
		<optgroup label="Price">
			<option value="Value ASC">Low to High</option>
			<option value="Value DESC">High to Low</option>
		</optgroup>
		<optgroup label="Name">
			<option value="Name ASC">Ascending</option>
			<option value="Name DESC">Descending</option>
		</optgroup>
		</select>
		<br><br>
		<input type="submit" value="Submit">
	</form>
</div>
<div class="zone grid-wrapper mt-3">[[;
foreach Tkn in Tokens
do
(
Item := select top 1 * from Waher.Service.IoTBroker.Marketplace.AuctionItem where TokenId = Tkn.TokenId and Processed = null; 
if Item !=null then
	( (Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AskingPrice); )
else 
	(Price := Tkn.Value;) ;
(Tkn.Category = null ? Category := "Default" : Category := Tkn.Category);
if System.IO.Directory.Exists(System.IO.Path.Combine(Waher.IoTGateway.Gateway.RootFolder,"Marketplace\\src\\Collections",Category)) then
	]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="location.href='https://((Waher.IoTGateway.Gateway.Domain))/Marketplace/src/Collections/((Category))/PortfolioTokenView.md?TokenId=((Tkn.TokenId))'">
	<img class="card-img-top token-image" src="/Marketplace/src/Collections/((Category))/Images/tokenImage.png"  alt="glyph-image"/>
	<div class= "card-body">
		<h6 class="card-title">((Tkn.FriendlyName))</h6>
		<p class="card-text text-start">Price <br>((Price)) ((Tkn.Currency))</p>
	</div>
	</div>
	[[
else 
	]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="location.href='/Marketplace/src/Collections/Default/PortfolioTokenView.md?TokenId=((Tkn.TokenId))'">
	<img class="card-img-top token-image" src="data:image/png;base64,((Base64Encode(Tkn.Glyph) ))" alt="glyph-image"/>
	<div class= "card-body">
		<h6 class="card-title">((Tkn.FriendlyName))</h6>
		<p class="card-text text-start">Price <br>((Price)) ((Tkn.Currency))</p>
	</div>
	</div>
	[[
);
)else
	]]<div class="container text-center">
		<h2>When you purchase Tokens, they will be showed here</h2>
	</div>
	[[
}}
</div>
</div>