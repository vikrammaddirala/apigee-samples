
function setFault(status, phrase, message) {
  context.setVariable("custom.error.code", status);
  context.setVariable("custom.error.message", message);
  context.setVariable("custom.error.phrase", phrase);
  context.setVariable("custom.error.requestid", context.getVariable("messageid"));
  //context.setVariable("custom.error.requestid", "requestid");
}

switch (context.getVariable("fault.name")) {
  case "access_token_expired":
  case "invalid_access_token":
  case "InvalidAccessToken":
  case "InvalidToken":
  case "TokenExpired":
    setFault(401,"Unauthorized","Unauthorized - Token Invalid or Expired");
    break;
  case "InvalidApiKey":
  case "FailedToResolveAPIKey":
	setFault(401,"Unauthorized","Unauthorized - Invalid ApiKey");
    break;
  case "ErrorResponseCode":
    switch (context.getVariable("response.status.code")) {
      case "400":
        setFault(400, "Bad Request", "Invalid Request");
        break;
      case "404":
        setFault(404, "Resource Not Found", "Resource Not Found");
        break;
    }
}

if (!context.getVariable("custom.error.code")) {
  setFault(500, "Internal Server Error", "Internal Server Error - Contact API team");
}