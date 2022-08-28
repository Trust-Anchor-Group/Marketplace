Title: Token Information
Description: more in depth information about a expecific Token.
Date: 2022-04-11
Author: Mateo Florez
Copyright: Copyright.md
Master: /Marketplace/src/Master.md
CSS: /Marketplace/src/css/marketplace.css
CSS: /Marketplace/src/Collections/Default/css/style.css
CSS: /Marketplace/src/Collections/Default/css/report.css
Parameter: TokenId
Parameter: ReportType

<div style='display:none'>
{{ 
    Token := select top 1 * from  Waher.Service.IoTBroker.NeuroFeatures.Token where TokenId = TokenId;
	TokenEvents := select * from Waher.Service.IoTBroker.NeuroFeatures.Events.TokenEvent where TokenId = TokenId; 
}}
</div>

<div class="container info zone">
	<div class="token-basic-info token-description-container bg-secondary bg-opacity-10">
		<div class="token-title">
			<div>
				<h4 class= "default-blue" style= "text-align: center;">{{Token.FriendlyName}}</h4>
			</div>
		</div>
		<div class="report-container">
{{
if ReportType = "History" then
	Token.GenerateHistoryReport(ReportFormat.Html)
}}
{{
if ReportType = "Diagram" then
(
	Token.GetStateDiagram()
)
}}
{{
if ReportType = "Variables" then
(
]]<div>
<h3 class="default-blue">Current Variables</h3>
<table class ="table table-responsive text-start">
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody class="table-group-divider text-break">[[;
for each v in Token.GetCurrentStateVariables().VariableValues do
]]<tr><td>((v.Name))</td> <td>((v.Value))</td></tr>[[;
]]</tbody>
</table>
</div>[[
)
else if ReportType = "Events" then 
(
]]<div class="table-responsive">
<table class ="table text-start">
<thead>
<tr>
<th>Timestamp</th>
<th>Personal</th>
<th>Message</th>
<th>Value</th>
<th>Owner</th>
<th>OwnershipContract</th>
</tr>
</thead>
<tbody class="table-group-divider text-wrap">[[;
foreach event in TokenEvents do
(
if (event.ElementName = "Transferred" and event.Personal = false) then
(
]]<tr>
<td>((event.Timestamp))</td>
<td>((event.Personal))</td>
<td>((event.ElementName))</td>
<td>((event.Value)) ((event.Currency))</td>
<td>((event.Owner))</td>
<td>((event.OwnershipContract))</td>
</tr>[[
)
else if (event.ElementName = "Created" and event.Personal = false) then
(
]]<tr>
<td>((event.Timestamp))</td>
<td>((event.Personal))</td>
<td>((event.ElementName))</td>
<td>((event.Value)) ((event.Currency))</td>
<td>((event.Owner))</td>
<td>((event.OwnershipContract))</td>
</tr>[[
)
else if (event.ElementName = "NoteText" and event.Personal = false) then
(
]]<tr>
<td>((event.Timestamp))</td>
<td>((event.Personal))</td>
<td>((event.Note))</td>
<td></td>
<td></td>
<td></td>
</tr>[[
)
)
);
]]</tbody>
</table>
</div>
</div>
</div>[[
}}
</div>
</div>
</div>



