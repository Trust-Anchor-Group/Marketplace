function displayTokenInfo(TokenId){
    const token = getTokenInfo(TokenId);
    console.log(TokenId)

}

function getTokenInfo(){
    // Kan man bädda in script i js, dvs, kan jag hämta info från databasen med js?
    document.getElementById("demo").innerHTML = "{{select FriendlyName, Value, Currency, Created, Expires, TokenId fromNeuroFeatureTokens}}";
}