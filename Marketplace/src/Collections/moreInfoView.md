Title: Collection
Description: Token collection description
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /src/Master.md

<div class="container zone blue">
    <h1>Explore Token Collections:</h1>
</div>
<div class="zone grid-wrapper">
{{
foreach C in 
select
	DISTINCT FriendlyName
from
	NeuroFeatureTokens
order by
	FriendlyName
do    
	]]<div class="box token_zone">
		<h4>Name: `((C))`</h4>
		<button id="buy_btn" onclick="displayBuyQR()"class="buy_btn">More Info</button>
	</div>
	[[
}}
</div>
