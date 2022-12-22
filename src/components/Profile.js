import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Redaction from "./Redaction";
import Reviews from "./reviews";
import Films from "./films";
import Studio from "./Studio";
import Critics from "./Critics";
import ChairmanComp from "./ChairmanComp";

const Profile = () => {
    const {user, isAuthenticated, isLoading,getAccessTokenSilently} = useAuth0();
    const[userMetadata,setUserMetadata]=useState(null);
    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-2a7vygz8.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);
    if (isLoading) {
        return <div>Loading ...</div>;
    }

        return (
            isAuthenticated && (
                <div>
                    <Redaction/>
                    <Reviews/>
                    <Films/>
                    <Studio/>
                    <Critics/>
                    <ChairmanComp/>
                    {userMetadata ? (
                        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                    ) : (
                        "No user metadata defined"
                    )}
                </div>
            )
        );
    };

export default Profile;