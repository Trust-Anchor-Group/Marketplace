LogDebug("Response received: "+Str(Posted));

SessionId:=Posted.SessionId;
SessionVariables:=Waher.IoTGateway.Gateway.HttpServer.GetSession(SessionId);
SessionVariables.MarketplaceUser:=Posted;