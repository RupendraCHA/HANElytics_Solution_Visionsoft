import axios from "axios"
import qs from "qs"



export const EmbedPowerBIDashboards = async (req, res) => {

const {groupID, reportID} = req.body

const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

  // console.log(groupID, reportID)
  try {
    // Get access token from Azure AD
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://analysis.windows.net/powerbi/api/.default"
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get report details (to fetch embedUrl) //
    // 
    const reportResponse = await axios.get(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/reports/${reportID}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const embedUrl = reportResponse.data.embedUrl; 

    // Generate Embed token
    const embedTokenResponse = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/reports/${reportID}/GenerateToken`,
      {
        accessLevel: "view"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    const embedToken = embedTokenResponse.data.token;
    // console.log(embedUrl)

    res.json({
      reportId: reportID,
      // reportId: groupID,
      token: {
        token: embedToken,
        embedUrl: embedUrl
      }
    });
  } catch (err) {
    console.error("Error getting embed token:", err.message);
    res.status(500).send("Failed to get embed token");
  }
}