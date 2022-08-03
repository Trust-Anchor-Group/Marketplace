Title: Welcome
Description: Welcome to Token Marketplace
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
	else if LogIn then
	( 
		LogIn:=False;
		
	)
}}
{{
	Order := empty(Sort) ? "Value" : Str(Sort);
	if Order = "Value ASC" then
		Tokens := select *
		from
			NeuroFeatureTokens
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			Value ASC;
	if Order = "Value DESC" then
		Tokens := select *
		from
			NeuroFeatureTokens
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			Value DESC;
	if Order = "Name ASC" then
		Tokens := select *
		from
			NeuroFeatureTokens
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			FriendlyName ASC;
	if Order = "Name DESC" then
			Tokens := select *
		from
			NeuroFeatureTokens
		where 
			OwnerJid = MarketplaceUser.Properties.JID
		order by
			FriendlyName DESC;
	if Order = "Value" then
		Tokens := select *
		from
			NeuroFeatureTokens
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
   <div class="hero-text">
    	<h1>Welcome {{MarketplaceUser.Properties.FIRST ??? ""}} {{MarketplaceUser.Properties.LAST ??? ""}}!</h1>
		<img class="profile-img" src="{{MarketplaceUser.Attachments.Url}}" alt="Profile Picture"/>
    </div>
</div>


{{
if Tokens.Length != 0 then 
(
]]<div>
	<div class="token-basic-info header">
	<h2>Your Tokens</h3>
		<div class="collection-stats">
			<p><code>((Tokens.FriendlyName.Length))</code></br> Items</p>
			<p><code>((sum:= 0; foreach value in Tokens.Value do sum += value;)) ((Tokens.Currency[0]))</code></br> Total volume</p>
			<p><code>((Max(Tokens.Value) )) ((Tokens.Currency[0]))</code></br>Most Valuable Item</p>
		</div>
	</div>
<div class="sort-bar">
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
</div>
<div class="zone grid-wrapper">[[;
foreach Token in Tokens
do
(
Item := select top 1 * from Waher.Service.IoTBroker.Marketplace.AuctionItem where TokenId = Token.TokenId.Value and Tags[0].Name = "TokenID";
if Item !=null then
	( (Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AcceptPrice); )
else 
	(Price := Token.Value;) ;
(Token.Category = null ? Category := "Default" : Category := Token.Category);
if System.IO.Directory.Exists(System.IO.Path.Combine(Waher.IoTGateway.Gateway.RootFolder,"Marketplace\\src\\Collections",Category)) then
	]]<div class="box token_zone" onclick="location.href='https://mateo.lab.tagroot.io/Marketplace/src/Collections/((Category))/PortfolioTokenView.md?TokenId=((Token.TokenId))'">
	<img src="data:image/png;base64,((Base64Encode(Token.Glyph) ))" alt="glyph-image"/>
	<div class= "box-token-description">
	<h3><strong>((Token.FriendlyName))</strong></h3>
	Price
	<h3>((Price)) ((Token.Currency))</h3> 
	</div>
	</div>
	[[
else 
	]]<div class="box token_zone" onclick="location.href='https://mateo.lab.tagroot.io/Marketplace/src/Collections/Default/PortfolioTokenView.md?TokenId=((Token.TokenId))'">
	<img src="data:image/png;base64,((Base64Encode(Token.Glyph) ))" alt="glyph-image"/>
	<div class= "box-token-description">
	<h3><strong>((Token.FriendlyName))</strong></h3>
	Price
	<h3>((Price)) ((Token.Currency))</h3>
	</div>
	</div>
	[[
);
)else
	]]<div class="token_zone">
		<h1>When you purchase Tokens, they will be showened here</h1>
	</div>
	[[
}}
</div>