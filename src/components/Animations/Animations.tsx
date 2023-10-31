// import React, { FC, useState } from 'react'
// import AnimaitionCard from '../AnimationCard/AnimaitionCard'
// import noData from '../../Assets/noData.jpg'
// import toast from 'react-hot-toast';
// import ShowPopup from '../ShowPopup/ShowPopup';



// type AnimationNode = {
//     id: string;
//     jsonUrl: string;
//     name: string;


// };

// type AnimationEdge = {
//     cursor: string;
//     node: AnimationNode;
// };



// type Props = {
//     animationList: any,
//     offlineAnimations: any,
//     setAnimationList: () => void,
//     setOfflineAnimations: () => void,
// }


// const Animations: FC<Props> = ({
//     animationList,
//     offlineAnimations,
//     setAnimationList,
//     setOfflineAnimations
// }) => {


//     const [show, setShow] = useState<boolean>(false)
//     const [selectedLoti, setSelectedLoti] = useState<any>(null)




//     const onSaveClick = async (animation: AnimationEdge) => {
//         console.log(animation.node.jsonUrl)
//         await fetch(animation.node.jsonUrl, {
//             method: 'GET',
//         }).then(res => res.json())
//             .then((data) => {
//                 console.log(data)
//                 toast.success("Added Successfully")

//                 if (offlineAnimations) {
//                     let arr: any = [...offlineAnimations]
//                     const obj = {
//                         id: animation.node.id,
//                         name: animation.node.name,
//                         localJsonUrl: data
//                     }
//                     arr.push(obj)
//                     localStorage.setItem('offlineAnimations', JSON.stringify(arr))
//                     setOfflineAnimations(arr)
//                 } else {
//                     let arr: any = []
//                     const obj = {
//                         id: animation.node.id,
//                         name: animation.node.name,
//                         localJsonUrl: data
//                     }
//                     arr.push(obj)
//                     localStorage.setItem('offlineAnimations', JSON.stringify(arr))
//                     setOfflineAnimations(arr)
//                 }


//             }).catch(err => {
//                 console.log(err);

//             })
//     }


//     return (
//         <>
//             {animationList && animationList.length > 0 ? (
//                 <div className="container">
//                     {animationList.map((anim: AnimationEdge) => (
//                         <AnimaitionCard
//                             cssClass="btn btn-primary"
//                             name={anim.node.name}
//                             actionText="Save"
//                             src={anim.node.jsonUrl}
//                             actionClick={() => onSaveClick(anim)}
//                             onViewClick={() => {
//                                 // setSelectedLoti(anim)
//                                 setShow(true)

//                             }}
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="nodata">
//                     <img src={noData} />
//                 </div>
//             )}


//             <ShowPopup
//                 hideModel={() => setShow(false)}
//                 visible={show}
//                 animation={selectedLoti}
//                 src={selectedLoti?.node?.jsonUrl}
//             />
//         </>

//     )
// }

// export default Animations