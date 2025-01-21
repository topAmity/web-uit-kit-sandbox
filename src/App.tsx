import { AmityUiKitProvider, AmityUiKitSocial } from "@amityco/ui-kit-open-source";

import { useEffect, useState } from "react";
import '@amityco/ui-kit-open-source/dist/index.css'

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [apiRegion, setApiRegion] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    setApiKey(queryParams.get("apiKey") || "b0ebeb5939def76019308d4a530b12ddd558dde5bf346e2e");
    setUserId(queryParams.get("userId") || "user1");
    setDisplayName(queryParams.get("displayName") || "user1");
    setApiRegion(queryParams.get("apiRegion") || "us");
  }, []);
  const theme = {
    palette: {
      primary: '#FF0000',
    }
  }

  return (

    <div className="App">
      {apiKey ?
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          userId={userId}
          displayName={displayName} // pass the updated displayName
          apiRegion={apiRegion}
          theme={theme}
        >
          <AmityUiKitSocial />
        </AmityUiKitProvider>
        : <div />
      }
    </div>

  );
}