import { AmityUiKitProvider, AmityUiKitSocial } from "@amityco/ui-kit";
import { useEffect, useState } from "react";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [apiRegion, setApiRegion] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    setApiKey(queryParams.get("apiKey") || "b0eaba093fdbf1361f36d849000b4289d80e8ae3b8636d29");
    setUserId(queryParams.get("userId") || "topAmity");
    setDisplayName(queryParams.get("displayName") || "topAmity");
    setApiRegion(queryParams.get("apiRegion") || "us");
  }, []);

  return (

    <div className="App">
      {apiKey ?
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          userId={userId}
          displayName={displayName}
          apiRegion={apiRegion}
        >
          <AmityUiKitSocial />
        </AmityUiKitProvider>
        : <div />
      }
    </div>

  );
}