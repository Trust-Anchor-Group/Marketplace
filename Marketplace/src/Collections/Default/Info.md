Title: Collection
Description: Token collection description
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
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
	<div class="hero-image-gradient"></div>
	<div class="container hero-text">
    	<h1>The {{Category}} Collection:</h1>
	</div> 
</div>
<div class="container">
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
<div class="zone grid-wrapper mt-3">
{{  
foreach Item in Items
do
(
Token :=  select * from Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = Item.Tags.Value[0];
if Token.Length != 0 then
(
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AcceptPrice);
]]<div class="shadow card m-2 token_zone" style="width: 13rem;" onclick="location.href='TokenInfo.md?TokenId=((Token.TokenId[0]))'">
<img class="card-img-top token-image" src="data:image/png;base64,((Base64Encode(Token.Glyph[0]) ))" alt="glyph-image"/>
<div class= "card-body">
<h6 class="card-title text-start">((Token.FriendlyName[0]))</h6>
<p class="card-text text-start">Price <br>((Price)) ((Item.Currency))</p>
</div>
</div>[[;
)
);
}}
</div>
</div>
</div>