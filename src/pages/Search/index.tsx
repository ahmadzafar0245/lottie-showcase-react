import React, { useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import './search.css'
import logo from '../../Assets/logo.jpeg'
import noData from '../../Assets/noData.jpg'
import toast, { Toaster } from 'react-hot-toast';
import AnimaitionCard from "../../Components/AnimationCard/AnimaitionCard";
import ShowPopup from "../../Components/ShowPopup/ShowPopup";
import InternetChecker from "../../Components/InternetChecker/InternetChecker";


type AnimationNode = {
    id: string;
    jsonUrl: string;
    name: string;


};

type AnimationEdge = {
    cursor: string;
    node: AnimationNode;
};

type SearchPublicAnimationsResponse = {
    totalCount: number;
    edges: AnimationEdge[];
};



type OfflineObject = {
    id: string,
    name: string;
    localJsonUrl: string
};

const SEARCH_PUBLIC_ANIMATIONS_QUERY = gql`
  query SearchPublicAnimations($query: String!) {
    searchPublicAnimations(query: $query) {
      totalCount
      edges {
        cursor
        node {
          id
          jsonUrl
          name
        }
      }
    }
  }
`;

const Search: React.FC = () => {


    const [offlineAnimations, setOfflineAnimations] = useState([])

    // This useEffect hook is responsible for fetching offline animations from local storage when the component mounts.
    // It calls the "getOfflineAnimations" function immediately after the component is mounted, 
    // and then sets the "offlineAnimations" state with the retrieved data.
    // The data is fetched from the "offlineAnimations" key in local storage, parsed, and stored in the state.

    useEffect(() => {
        getOfflineAnimations()
    }, [])


    const getOfflineAnimations = () => {
        const unparsed: any = localStorage.getItem('offlineAnimations')

        const parsed = JSON.parse(unparsed)
        // console.group(parsed)

        setOfflineAnimations(parsed)

    }




    const [status, setStatus] = useState<boolean>()
    const [show, setShow] = useState<boolean>(false)
    const [selectedLoti, setSelectedLoti] = useState<any>(null)


    useEffect(() => {
        setStatus(navigator.onLine)
    }, [navigator.onLine])

    // Define a lazy query for searching public animations using the SEARCH_PUBLIC_ANIMATIONS_QUERY, 
    // and destructure the result into searchPublicAnimations, loading, error, and data.

    const [searchPublicAnimations, { loading, error, data }] = useLazyQuery(
        SEARCH_PUBLIC_ANIMATIONS_QUERY
    );
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = () => {
        searchPublicAnimations({ variables: { query: searchTerm } });
    };
    // This function handles saving an animation to local storage.
    // It fetches the animation's JSON data from the provided URL, stores it locally,
    // and updates the "offlineAnimations" state with the new data.
    // If "offlineAnimations" is already defined, it appends the animation data,
    // otherwise, it initializes a new array with the animation data.


    const onSaveClick = async (animation: AnimationEdge) => {
        // console.log(animation.node.jsonUrl)
        await fetch(animation.node.jsonUrl, {
            method: 'GET',
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                toast.success("Added Successfully")

                if (offlineAnimations) {
                    let arr: any = [...offlineAnimations]
                    const obj = {
                        id: animation.node.id,
                        name: animation.node.name,
                        localJsonUrl: data
                    }
                    arr.push(obj)
                    localStorage.setItem('offlineAnimations', JSON.stringify(arr))
                    setOfflineAnimations(arr)
                } else {
                    let arr: any = []
                    const obj = {
                        id: animation.node.id,
                        name: animation.node.name,
                        localJsonUrl: data
                    }
                    arr.push(obj)
                    localStorage.setItem('offlineAnimations', JSON.stringify(arr))
                    setOfflineAnimations(arr)
                }


            }).catch(err => {
                console.log(err);

            })
    }


    // This function handles the deletion of an animation from local storage.
    // It filters out the animation to be deleted from the "offlineAnimations" array,
    // updates the local storage with the filtered array, and sets the state
    // with the updated "offlineAnimations" array. Finally, it displays a success message.

    const onDeleteClick = (anim: any) => {
        let arr = offlineAnimations.filter((item) => item != anim)
        localStorage.setItem('offlineAnimations', JSON.stringify(arr))
        setOfflineAnimations(arr)
        toast.success("Deleted Successfully")

    }
    // This function checks if an animation has already been saved in the "offlineAnimations" array.
    // It filters the array to find an item with a matching ID to the given animation,
    // and if a match is found, it returns true to indicate that the animation is already saved.

    const alreadySavedCheckerFunction = (animation: AnimationEdge) => {
        if (offlineAnimations) {
            let res = offlineAnimations.filter((item: OfflineObject) => item.id == animation?.node?.id
            );
            if (res.length) {
                return true;
            }
        }
    };





    const downloadAnimation = async (url: string, fileName: string, isOffline: boolean) => {



        try {

            const response = await fetch(url);
            const uri = await response.json();


            // Convert JSON to a Blob
            const jsonBlob = new Blob([JSON.stringify(uri, null, 2)], { type: 'application/json' });

            // Create a temporary URL for the Blob
            const blobUrl = window.URL.createObjectURL(jsonBlob);

            // Create a link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${fileName}.json`);

            // Check if document.body exists before appending the link
            if (document.body) {
                document.body.appendChild(link);

                // Simulate a click on the link to trigger the download
                link.click();

                // Clean up
                link.remove();
                window.URL.revokeObjectURL(blobUrl);
            } else {
                throw new Error('Document body not found');
            }
        } catch (error) {
            console.error('Error downloading JSON file:', error);
        }
    };





    return (
        <div>
            <InternetChecker />

            <div className="container-fluid">
                <div className="logo-container">
                    <img src={logo} />
                </div>
                <div className="mainSearchContainer">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search lottie animation"
                            className="form-control inputBox"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>
                    <div className="">
                        <button disabled={!status} className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            {/* // These conditional rendering statements are used to display loading and error messages.
// - If the "loading" state is true, it shows a "Loading..." message to indicate that data is being fetched.
// - If there is an "error" state with a message, it displays an error message to inform the user about the issue. */}

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}



            {data && data.searchPublicAnimations.edges.length > 0 ? (
                <div className="container">
                    {data.searchPublicAnimations.edges.map((anim: AnimationEdge) => (
                        <AnimaitionCard
                            cssClass="btn btn-primary"
                            name={anim.node.name}
                            actionText="Save"
                            isDownloadShow={true}
                            isSaved={alreadySavedCheckerFunction(anim)}
                            src={anim.node.jsonUrl}
                            onDownloadClick={() => downloadAnimation(anim.node.jsonUrl, anim.node.name, false)}

                            actionClick={() => onSaveClick(anim)}
                            onViewClick={() => {
                                setSelectedLoti(anim)
                                setShow(true)

                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="nodata">
                    <img src={noData} />
                </div>
            )}

            {/* Saved Animation Cards */}
            <div className="saver">
                <h1>Saved Animations</h1>
                <div className="liner"></div>
            </div>
            {offlineAnimations && offlineAnimations.length > 0 ? (
                <div className="container">
                    {offlineAnimations.map((anim: any) => (
                        <AnimaitionCard
                            actionClick={() => onDeleteClick(anim)}
                            actionText="Delete"
                            isSaved={false}
                            name={anim.name}
                            cssClass="btn btn-danger"
                            onViewClick={() => {
                                setSelectedLoti(anim)
                                setShow(true)
                            }}
                            isDownloadShow={false}
                            onDownloadClick={() => downloadAnimation(anim.localJsonUrl, anim.name, true)}
                            src={anim.localJsonUrl}
                        />

                    ))}
                </div>
            ) : (
                <div className="nodata">
                    <img src={noData} />
                </div>
            )}
            {/* // This code block renders a "ShowPopup" component when a user clicks on an animation.
// - The "hideModel" function is used to close the popup when called.
// - The "visible" prop controls whether the popup is displayed (true for visible, false for hidden).
// - The "animation" prop is set to the "selectedLoti" object, which likely contains animation data.
// - The "src" prop is set to the JSON URL of the selected animation, which is displayed in the popup.
// This popup allows users to view detailed information about the selected animation. */}


            <ShowPopup
                hideModel={() => setShow(false)}
                visible={show}
                animation={selectedLoti}
                src={selectedLoti?.node?.jsonUrl}
            />
        </div>
    );
};

export default Search;
