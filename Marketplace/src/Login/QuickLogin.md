Title: Quick Login
Description: Shows an example on how to use a Legal ID to quickly login on a site.
Date: 2021-02-22
Author: Peter Waher
Copyright: /Copyright.md
Master: /Master.md
JavaScript: /QuickLogin.js
JavaScript: /Events.js
CSS: /QuickLogin.css
Neuron: {{Gateway.Domain}}

================================================================================================================================

Quick-Login
=========================================

![Table of Contents](ToC)

To test the Quick-Login Authentication capability of the broker, scan the code below with your [IdApp][IdApp]. 
Download: [Android](https://play.google.com/store/apps/details?id=com.tag.IdApp). iOS version coming soon
(now in beta-test). You can send us any feedback, including request to participate in our beta-test, via our 
[Feedback page](https://lab.tagroot.io/Feedback.md).

[IdApp]: https://github.com/Trust-Anchor-Group/IdApp

<div id="quickLoginCode" data-mode="image" data-purpose="To perform a quick login on {{Gateway.Domain}}, and display your identity information on the page. This request is valid for one (1) minute."/>

================================================================================================================================

API
--------

Quick-Login exists in two versions: Web client only (no back-end), and back-end protected. In the web client only mode, results are delivered
directly to the web client. The web client asks the user to login, and the web client receives the response directly, once the user has
logged in. In this mode, no back-end is involved. In Back-end mode, on the other hand, login is done to a proprietary back-end, rather than 
the web client. It is the back-end who requires the credentials of the user. The Quick-Login feature calls the back-end as soon as the user 
has logged in. It also informs the web client, that the back-end has been informed, so it can refres its user interface. The following
subsections describe these modes in more detail.

### Web-Client only

To embed a Quick-Login feature in your web client page, without back-end integration, this mode is appropriate.
The web client starts by making a request to the server to initiate Quick-Login. The server returns a QR Code, or a reference to QR code, 
depending on the image mode chosen. The process is regularly repeated. Each time a new code is generated. And each code has a life-time of 
one (1) minute. Do as follows:

1.	Include two javascript files: `/Events.js` and `/QuickLogin.js` in your web page. The first pushes events to your page via a websocket 
	connection. It allows the page to become aware of when someone has logged in using the Quick-Login feature. The second javascript file shows
	the code on the page. You can make this file your own and update it in accordance with your needs.

2.	Add a `<div>` tag to your page, where you want the code to appear. It must have the `id` attribute set to `quickLoginCode`, and have
	two data attributes: `data-mode` specifies the mode in which the code will be transferred to the web-page. `data-purpose` contains a
	purpose string, that will be displayed in the [IdApp][IdApp] of the user. You can use the buttons below to experiment using the different
	modes.

3.	Format your Quick-Login with a custom css file. You can customize the `/QuickLogin.css` file used on this page.

4.	Add the domain of the Neuron to the header of the HTML file. This allows the javascript files to know what domain to access for
	Quick-Login access. Example:

		<meta name="NEURON" content="{{Gateway.Domain}}"/>

5.	You will have to add Cross-Domain support (CORS Headers) to the page you use, if it lies on another domain.

6.	Once the user has signed the Quick Login request from the Neuron, a response in the form of a JSON object (see below) is pushed to the
	web client using `Events.js`. The object is sent to the function `SignatureReceived`, defined in QuickLogin.js (which you can customize),
	on the browser tab containing the page displaying the QR code.

The following UML diagram displays the flow of messages during a Quick Login using only a web client:

```uml
@startuml
participant User
participant WebClient
participant WebServer
participant Neuron
participant TagID

Activate User
User -> WebClient: Open Page

Activate WebClient
WebClient -> WebServer : GET(Page)

Activate WebServer
WebClient <-- WebServer: Page(Div)
Deactivate WebServer

WebClient -> Neuron : GET(Javascript)

Activate Neuron
WebClient <-- Neuron: Events.js, Quicklogin.js

loop Every 2s
	WebClient -> Neuron : GET(QR)
	WebClient <-- Neuron : QR
end

User -> TagID : Scan QR

Activate TagID
Neuron <- TagID : Start(QR)
Neuron -> TagID : SignRequest
Neuron <-- TagID : Signature(ID)
Deactivate TagID

Neuron -> Neuron : Validate

WebClient <- Neuron : ID[if signature OK]
Deactivate Neuron

WebClient -> WebClient : Update page
User <- WebClient : Updated page
Deactivate WebClient
Deactivate User
@enduml
```

Example, showing how the above login feature was implemented on this page:

	JavaScript: /QuickLogin.js
	JavaScript: /Events.js
	CSS: QuickLogin.css
	Neuron: {{Gateway.Domain}}
	
	<div id="quickLoginCode"
	     data-mode="image"
	     data-purpose="To perform a quick login on {{Gateway.Domain}}, and display your identity information on the page. This request is valid for one (1) minute."/>

### Back-end mode

If it is the back-end that requires the user to log-in, the back-end mode should be used. In this mode, the back-end starts by registering
a call-back URL with the Quick-Login service, which responds with a Service ID. This Service ID is sent to the web-client, in an attribute 
of a `<div>` tag. The web-client then proceeds by requesting the Quick-Login service to display a QR Code. As in the web client-only mode, 
this process is repeated regularly, until the user has logged in. Do as follows:

1.	The Back-end makes a `POST` to the Neuron hosting the Quick-Login service, to the resource `/QuickLogin`. The POST request, must contain
	a single JSON object, with two field names called `service` and `sessionId`, containing the back-end URL to use when someone logs in, and
	an opaque string that the backend can use to identity the client session being used (or similar). The URI must furthermore use HTTPS. 
	The JSON object would look something like: `{"service":"https:...", "sessionId":"..."}`.
	
	```uml
	@startjson
	{
		"service": "https:...",
		"sessionId": "string"
	}
	@endjson
	```

2.	Once a Service ID has been generated, it is returned to the back-end in a JSON object with a single field named
	`serviceId`. Example: `{"serviceId":"..."}`.
	
	```uml
	@startjson
	{
		"serviceId": "string"
	}
	@endjson
	```

	**Note**: The Service ID is valid for **5 minutes**. You can *ping* your Service ID by issuing a new POST to the neuron before the
	time runs out, if you want, this time including a `serviceId` field with your Service ID. This will restart the timeout-clock giving 
	you 5 new minutes.
	
	```uml
	@startjson
	{
		"service": "https:...",
		"sessionId": "string",
		"serviceId": "string"
	}
	@endjson
	```

	The response to the session extension request is the same as a normal session initiation POST, repeating the Session ID sent
	in the request:
	
	```uml
	@startjson
	{
		"serviceId": "string"
	}
	@endjson
	```

3.	Now, proceed as in the web-client case (items 1-5), except that in the `<div>` tag, you will need to add a third data attribute: 
	`data-serviceId`, containing the same Service ID as the one received from the Back-end URL registration response. Example:

		<div id="quickLoginCode"
		     data-serviceId="..."
		     data-mode="image"
		     data-purpose="To perform a quick login on {{Gateway.Domain}}, and display your identity information on the page. This request is valid for one (1) minute."/>

4.	Once the user has signed the Quick Login request from the Neuron, a response in the form of a JSON object (see below) is posted to the
	URL registered with the Neuron. At the same time, an empty event is pushed to the web client using `Events.js`. The empty string is sent 
	to the function `SignatureReceivedBE`, defined in QuickLogin.js (which you can customize), on the browser tab containing the page displaying 
	the QR code. This function can be used to refresh the web page, knowing that credentials have been provided to the back-end.

The following UML diagram displays the flow of messages during a Quick Login using a back-end to control user credentials:

```uml
@startuml
participant User
participant WebClient
participant WebServer
participant Neuron
participant TagID

Activate User
User -> WebClient: Open Page

Activate WebClient
WebClient -> WebServer : GET(Page)

Activate WebServer
WebServer -> Neuron : Register(URL,\nSessionId)

Activate Neuron
WebServer <-- Neuron : ServiceID

WebClient <-- WebServer: Page(Div,ServiceID)
Deactivate WebServer

WebClient -> Neuron : GET(Javascript)

WebClient <-- Neuron: Events.js, Quicklogin.js

loop Every 2s
	WebClient -> Neuron : GET(QR)
	WebClient <-- Neuron : QR
end

User -> TagID : Scan QR

Activate TagID
Neuron <- TagID : Start(QR)
Neuron -> TagID : SignRequest
Neuron <-- TagID : Signature(ID)
Deactivate TagID

Neuron -> Neuron : Validate

WebServer <- Neuron : ID(SessionId)\n[if signature OK]

Activate WebServer
WebServer --> Neuron

WebClient <- Neuron : Event(empty)
Deactivate Neuron

WebClient -> WebServer : GET(Page)
WebClient <-- WebServer : Updated Page
Deactivate WebServer

User <- WebClient : Updated page
Deactivate WebClient
Deactivate User
@enduml
```

Encryption
-----------

All calls made to the Quick-Login API MUST be encrypted.

Identity Information
------------------------

When a user has logged in, identity information is compiled into a JSON object. In the web client login method, this object is sent in
an event (using `Events.js`) to the `SignatureReceived` function on the page. In the backend login method, the JSON object is POSTed to
the URL registered by the back-end. The JSON object also receives a field named `SessionId`, allowing the backend to correlate the response
with the web client performing the actual login. When the Neuron has received a response from the back-end URL, an empty string event is also
pushed to the `SignatureReceivedBE` function in the corresponding web client (using `Events.js`), from the Neuron. This allows the web client
to refresh its interface as the user has logged in. The back-end software does not need to propagate this event to the client itself.

The following diagram shows the structure of the identity JSON object pushed to the client, or backend. Highlighted fields are only available
when pushing the information to back-ends.

```uml
@startjson
#highlight "SessionId"
{
	"SessionId": "string",
	"Id":"string: ID of Identity object",
	"Key":"string: Quick Login key",
	"Provider":"string: Trust Provider",
	"ClientKeyName":"string: Signature Algorithm used by client",
	"Created":"dateTime: When Identity object was created",
	"Updated":"dateTime: When Identity object was updated, or null if not",
	"From":"dateTime: From when Identity object is valid",
	"To":"dateTime: Until when Identity object is valid",
	"HasClientPublicKey":"boolean: If ClientPubKey is defined",
	"ClientPubKey": "base64: Client Public Key",
	"HasClientSignature":"boolean: If ClientSignature is defined",
	"ClientSignature":"base64: Client Signature",
	"Properties":{"KEY":"VALUE","KEY":"VALUE","...":"..."},
	"Attachments":[
		{
			"Id":"string: Attachment ID",
			"ContentType":"string: Content-Type of attachment",
			"FileName":"string: Filename of attachment",
			"Signature":"base64: Client signature of contents",
			"Timestamp":"dateTime: Timestamp of signature",
			"Url":"string: URL for download"
		},
		{},
		{},
		{}
	],
	"ServerSignature":"bas64: Server signature",
	"State":"string: State of Identity object"
}
@endjson
```

Modes
--------

The following modes exist for transferring the code to the web client. You can test them, by pressing the corresponding buttons below:

<button id="TextModeButton" onclick="SetMode('text')" class="posButton">text</button>
<button id="Base64ModeButton" onclick="SetMode('base64')" class="posButton">base64</button>
<button id="ImageModeButton" onclick="SetMode('image')" class="posButtonPressed">image</button>

text
:	The QR Code is returned immediately in the request, as text, using block characters. When printed on the screen, the result is a
QR code that can be scanned. This is the most resource-efficient manner to display a changing QR code for many users, as it only returns
simple text, and not an image. But the web client must be able to display block characters for the code to be shown correctly.

image
:	The request only returns a reference to a QR code. This reference is later added in an `<IMG>` (image) tag, displaying a graphical
image representation of the code. This mode works on most browsers, but requires two requests to be made to the server, and the transfer
of an image, instead of text.

base64
:	This is a combination of the two modes. Here, the QR code is returned BASE64-encoded as text in the original request, and an image
is displayed showing the contents. Only one request to the server is made for each image. But BASE64-encoding will make the image somewhat
bigger, compared to the binary equivalent. Also, the client must support images using the `data` URI scheme.