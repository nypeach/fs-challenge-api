import handler from "../../libs/handler-lib";
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const main = handler(async (event, context) => {

  if (event.request.userAttributes.email_verified !== 'true') {
    const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
      UserPoolId: event.userPoolId,
      UserAttributes: [{
        Name: 'email_verified',
        Value: 'true',
      }],
      Username: event.userName!,
    };
    await cup.adminUpdateUserAttributes(params).promise();
  }
  return event;

});
