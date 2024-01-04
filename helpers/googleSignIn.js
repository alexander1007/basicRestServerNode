const { OAuth2Client } = require("google-auth-library");
const {
  env: { GOOGLE_CLIENT_ID: clientID },
} = process;

const client = new OAuth2Client(clientID);

async function googleVerify(idToken = "") {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: clientID,
  });

  const { name, picture, email } = ticket.getPayload();
  return { name, picture, email };
}
module.exports = { googleVerify };
