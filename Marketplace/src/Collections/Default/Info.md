Title: Collection
Description: Token collection description
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
CSS: /Marketplace/src/css/marketplace.css
CSS: /Marketplace/src/Collections/Default/css/style.css
Parameter: Category
Parameter: Sort

<div style='display:none'>
{{
	Items := select * 
		from 
			Waher.Service.IoTBroker.Marketplace.AuctionItem
		where 
			Type = Category 
		and 
			Processed = null
		and 
			Expires  > Now;
}}
</div>
<div class="hero-image">
   <div class="hero-text">
    	<h1>The {{Category}} Collection:</h1>
  </div>
</div>
	<div class="token-basic-info header">
		<div class="collection-stats">
			<p><code>{{Items.Length}}</code></br> Items</p>
			<p><code>{{sum:= 0; foreach item in Items do (item.BestBidPrice = null ? sum += item.AskingPrice : sum += item.BestBidPrice) ;}} {{Items.Currency[0]}}</code></br> Total volume</p>
			<p><code>{{Items.BestBidPrice.Length = 0 ? min(Items.AskingPrice) : min(Items.BestBidPrice)}} {{Items.Currency[0]}}</code></br> Best Price</p>
			<p><code>{{Items.BestBidPrice.Length = 0 ? Max(Items.AskingPrice) : Max(Items.BestBidPrice)}} {{Items.Currency[0]}}</code></br> Highest Offer</p>
		</div>
	</div>
	<div class="sort-bar">
		<form>
			<input type="hidden" name="Category" value="{{Category}}">
			<label for="tokens">Sort by:</label>
			<select name="Sort" id="sort">
			<optgroup label="Price">
			  <option value="Value ASC">Low to High</option>
			  <option value="Value DESC">High to Low</option>
			</optgroup>
		  </select>
		  <br><br>
		  <input type="submit" value="Submit">
		</form>
	</div>
<div class="more-from-collection">
<div class="zone grid-wrapper">
{{  
foreach Item in Items
do
(
Token :=  select * from Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = Item.Tags.Value[0];
if Token.Length != 0 then
(
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AcceptPrice);
]]<div class="box token_zone" onclick="location.href='TokenInfo.md?TokenId=((Token.TokenId[0]))'">
<img class="box-token-img" src="data:image/png;base64,((Base64Encode(Token.Glyph[0]) ))" alt="glyph-image"/>
<div class= "box-token-description">
<h3><strong>((Token.FriendlyName[0]))</strong></h3>
Price
<h3>((Price)) ((Token.Currency[0]))</h3>
</div>
</div>[[;
)
);
}}
</div>
</div>
