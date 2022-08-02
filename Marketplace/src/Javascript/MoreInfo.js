/*Function to get more info about a collection */
function moreInfo(collectionName, categoryName){
	// Check if collectionName is a known collection, Default = unknown.
	// If not, use default view.
	if (collectionName == "Default"){
		const uri = window.location.protocol + "//" + FindNeuronDomain() + "/Marketplace/src/Collections/Default/Info.md?Category=" + categoryName ; 
		document.location.href = uri;
		return;
	}
	// If the collection is known.
	const uri = window.location.protocol + "//" + FindNeuronDomain() + "/Marketplace/src/Collections/" + collectionName + "/Info.md?Category=" + collectionName; 
	document.location.href = uri;
	return;

}


function moreTokenInfo(category, tokenId){
	// Check if category is a known collection, Default = unknown.
	// If not, use default view.
	if (category == "Default"){
		const uri = window.location.protocol + "//" + FindNeuronDomain() + "/Marketplace/src/Collections/Default/TokenInfo.md?TokenId=" + tokenId ; 
		document.location.href = uri;
		return;
	}
	// If the category is known.
	const uri = window.location.protocol + "//" + FindNeuronDomain() + "/Marketplace/src/Collections/" + category + "/TokenInfo.md?TokenId=" + tokenId ;
	document.location.href = uri;
	return;
}


// We use FriendlyName as of now, will change to Tag
function showTokenInfo(FriendlyName){
	console.log(FriendlyName);
	const imgUrl = "src/Collections/" + FriendlyName + "/Images/tokenImage.png" ;
	const img = document.getElementById("token-image").src= imgUrl;
	console.log(img);
}

function FindNeuronDomain()
{
	var Meta = document.getElementsByTagName('meta');
	var c = Meta.length;
	var i;

	for (i = 0; i < c; i++)
	{
		var Name = Meta[i].getAttribute("name");
		if (Name && Name.toLowerCase() == "neuron")
		{
			var Domain = Meta[i].getAttribute("content");

			if (Domain)
				return Domain;
			else
				break;
		}
	}

	return window.location.host;
}