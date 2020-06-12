exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response(); // This is what will be in the eventual HTTP response via the callback method
  const responseBody = {
    success: false,
    payload: {
      errors: []
    }
  } // and this will be the Body of the response

  try {
    if (Object.keys(event).length === 0) {
      // This handles the case where NO parameters were sent, allowing for empty Options request (since we don't have access to the Request method/headers)
      throw {
        status: 200,
        code: 60200,
        message: "No body sent."
      }
    }

    if (!event.teamLeadSid) {
      // This handles the case where a specific parameter was not sent
      throw {
        status: 400,
        code: 60200,
        message: "Request must include a teamLeadSid"
      }
    }

    // First pull our workers with a targetWorkersExpression
    const workers = await client
      .taskrouter
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers
      .list({
        targetWorkersExpression: `team_lead_sid = "${event.teamLeadSid}"`
      });

    // Now let's define our response Worker objects
    const workerObjects = workers.map((worker) => {
      return {
        sid: worker.sid,
        friendlyName: worker.friendlyName,
        activityName: worker.activityName,
        attributes: JSON.parse(worker.attributes),
        available: worker.available
      }
    });
    responseBody.success = true;
    responseBody.payload.workers = workerObjects;
  } catch (e) {
    // We've caught an error! Handle the HTTP error response
    console.error(e.message || e);

    response.setStatusCode(e.status || 500);

    responseBody.success = false;
    responseBody.payload.errors = responseBody.payload.errors || [];
    responseBody.payload.errors.push({ code: e.code || 500, message: e.message });
  }

  response.setBody(responseBody);

  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type, X-Twilio-Signature');
  response.appendHeader('X-potestop-potestoop', 'asdfasdfasdf');

  return callback(null, response);
}
