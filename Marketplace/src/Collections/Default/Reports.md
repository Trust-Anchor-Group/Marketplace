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
}}
</div>

<div class="container info zone">
	<div class="token-basic-info token-description-container">
		<div class="token-title">
			<div>
				<h3 class= "default-blue" style= "text-align: center;">{{Token.FriendlyName}}</h3>
			</div>
		</div>
		<div>
		{{
		if ReportType = "History" then 
			Token.GenerateHistoryReport()
		else if ReportType = "Diagram" then
			Token.GetStateDiagram(ReportFormat.Html)
		else if ReportType = "Profiling" then
			Token.GenerateProfilingReport(ReportFormat.Html)
		}}
</div>
</div>
</div>



