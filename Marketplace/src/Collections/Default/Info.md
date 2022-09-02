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
	<div class="container my-4">
		<div class="row row-cols-1 row-cols-4 g-2 g-lg-3 text-start">
			<div class="col-md-2">
				<p class="m-1"><code>{{Items.Length}}</code></br>Total items</p>
			</div>
			<div class="col-md-2">
				<p class="m-1"><code>{{sum:= 0; foreach item in Items do (item.BestBidPrice = null ? sum += item.AskingPrice : sum += item.BestBidPrice) ;}} {{Items.Currency[0]}}</code></br> Total volume</p>
			</div>
			<div class="col-md-2">
				<p class="m-1"><code>{{(Items.BestBidPrice.Length = 0 or Items.BestBidPrice[0] = null)? min(Items.AskingPrice) : min(Items.BestBidPrice)}} {{Items.Currency[0]}}</code></br> Best Price</p>
			</div>
			<div class="col-md-2">
				<p class="m-1"><code>{{(Items.BestBidPrice.Length = 0 or Items.BestBidPrice[0] = null) ? Max(Items.AskingPrice) : Max(Items.BestBidPrice)}} {{Items.Currency[0]}}</code></br> Highest Offer</p>
			</div>
		</div>
	</div>
		<div class="container my-4">
			<form>
				<div class="mb-3">
					<input type="hidden" name="Category" value="{{Category}}">
					<label for="tokens"  class="form-label">Sort by:</label>
					<select name="Sort" id="sort" class="form-select w-auto">
						<optgroup label="Price">
						  <option value="Value ASC">Low to High</option>
						  <option value="Value DESC">High to Low</option>
						</optgroup>
					</select>
				</div>
			  <button type="submit" class="btn btn-primary">Submit</button>
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
(Item.BestBidPrice != null ? Price := Item.BestBidPrice : Price := Item.AskingPrice);
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