import { AmityUiKitProvider, AmityUiKitSocial, AmityUiKitChat } from "@amityco/ui-kit";
import '@amityco/ui-kit/dist/index.css'
import config from "./uikit.config.json";

import { useEffect, useState } from "react";
import axios from "axios";


export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [apiRegion, setApiRegion] = useState("");
  const [uikitConfig, setUikitConfig] = useState(config)


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    setApiKey(queryParams.get("apiKey") || "b0ebeb5939def76019308d4a530b12ddd558dde5bf346e2e");
    setUserId(queryParams.get("userId") || "user1");
    setDisplayName(queryParams.get("displayName") || "user1");
    setApiRegion(queryParams.get("apiRegion") || "us");
  }, []);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  async function getCustomizationConfig(adminToken: string, region: string) {
    console.log('region: ', region);
    console.log('adminToken: ', adminToken);

    const options = {
      method: 'GET',
      url: `https://apix.${region}.amity.co/api/v3/network-settings/uikit`,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'X-No-Cache': generateUUID()
      }
    };

    try {
      const { data } = await axios.request(options);
      setUikitConfig(data.config)

      return data;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCustomizationConfig('a8c76344da66fae3eb3d72335ff76c769f0b4aaf', 'sg')
  }, [])


  return (

    <div className="App">
      {apiKey ?
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          userId={userId}
          displayName={displayName} // pass the updated displayName
          apiRegion={apiRegion}
          configs={uikitConfig as any}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100dvh",
            }}
          >
            <AmityUiKitSocial />
          </div>

        </AmityUiKitProvider>
        : <div />
      }
    </div>

  );
}