import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetVideoByIdQuery } from '../Apis/videoApi.js'
import { useGetCommentsMutation } from '../Apis/comments.js';
import { useToggleLikeMutation } from '../Apis/LikeApi.js';
import { useVideolikeinfoQuery } from '../Apis/LikeApi.js';
import { useGetSubscriptionQuery } from '../Apis/subscription.js';
import { useTogglesubscriptionMutation } from '../Apis/subscription.js';
import { ThumbsUp, Bell } from "lucide-react";
import { useGetDashboardDataMutation } from '../Apis/dashbord.js';
import ReactPlayer from "react-player";
import { useSelector } from 'react-redux';
import { useAddCommentMutation } from '../Apis/comments.js';


import { useUpdateCommentMutation } from '../Apis/comments.js';
import { useDeleteCommentMutation } from '../Apis/comments.js';

function VideoPlayerPage() {

    // Accessing user data from Redux store
    const user = useSelector((state) => state.user.userdata);
    //console.log("User data:", user.);
    // Extracting video ID and channel ID from the URL parameters
    const { id,channelId } = useParams();

    //dashbord data
    const [getdashbord, { data: dashbord }] = useGetDashboardDataMutation();
    // Fetching dashboard data for the video
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await getdashbord(id).unwrap(); 
                console.log("Dashboard data fetched successfully");
            } catch (error) { 
                console.error("Error fetching dashboard data:", error);
            }   
        };
        fetchDashboardData();
    }, [id, getdashbord]);

    //video 
    const { data: video } = useGetVideoByIdQuery(id);

    //comments 
    const [comments, setComments] = useState();
    const [getcomment] = useGetCommentsMutation();
    // Fetching comments for the video
    useEffect(() => {
        const fetchComments = async () => {
            try {     
                const response = await getcomment(id).unwrap();
                setComments(response); // Set the fetched comments to state 
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [id, getcomment,setComments]); 
    //adding comment
    const [addComment, { isLoading: addCommentLoading, error: addCommentError }] = useAddCommentMutation();
    const [comment, setComment] = useState("");
    // Function to handle comment submission
    const handleCommentSubmit = async () => {
        if (comment.trim() === "") return; // Prevent empty comments
        try {
            await addComment({ videoid: id, content: comment }).unwrap();
            // After successful submission, you might want to refetch comments or update the state
            const response = await getcomment(id).unwrap(); 
            setComments(response); // Update comments state with the new comment list
            setComment(""); // Clear the comment input field
            console.log("Comment added successfully");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    //update comment
    const [updateComment] = useUpdateCommentMutation();
    const handleUpdateComment = async (commentId) => {
        try {
            await updateComment({ id: commentId, content: comment }).unwrap();
            // After successful update, you might want to refetch comments or update the state
            const response = await getcomment(id).unwrap(); 
            setComments(response); // Update comments state with the updated comment list
            console.log("Comment updated successfully");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };
    //delete comment
    const [deleteComment] = useDeleteCommentMutation();
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId).unwrap();
            // After successful deletion, you might want to refetch comments or update the state
            const response = await getcomment(id).unwrap();
            setComments(response); // Update comments state with the remaining comments
            console.log("Comment deleted successfully");
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };




    //like   //toggle like
    // step-1-> intializing state for likes and like status
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    // step-2-> fetching like info using useVideolikeinfoQuery
    // and setting likes and isLiked state based on the fetched data
    const { data: likeInfo, refetch: getLikeinfo } = useVideolikeinfoQuery(id);
    useEffect(() => {
            
            if(likeInfo!==undefined){
              
            const likesCount = likeInfo.data.totallikes.length;
            const islike = likeInfo.data.isliked;
            setLikes(likesCount);
            setIsLiked(islike);
            }
        
    }, [id,likeInfo]);

    // step-3-> using useToggleLikeMutation to toggle like status
    // and updating likes count and isLiked status accordingly
    const [toggleLike, { data: likeData, isLoading: likeLoading, error: likeError }] = useToggleLikeMutation();
   // Function to handle like toggle
    const handleLike = async () =>{
        try {
            await toggleLike(id);
            setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
            setIsLiked(prevIsLiked => !prevIsLiked);
            console.log("Like toggled successfully");
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }
    
    
    

    
    
    
    //subscription handling
    // step-1-> initializing state for subscription status
    const [subscribed, setSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    // step-2-> fetching subscription status using useGetSubscriptionQuery
    const { data: subscriptionData } = useGetSubscriptionQuery(channelId);
    useEffect(() => {
        if (subscriptionData!== undefined) { 
          console.log("Subscription data:jjjjjjjjjjjjjjjjjjjj", subscriptionData);
            if(subscriptionData?.data.subscribebyme.length > 0)setSubscribed(true);
            setSubscriberCount(subscriptionData.data.subscribers.length);
        }
    }, [channelId, subscriptionData]);

    //toggle subscription
    const [toggleSubscription] = useTogglesubscriptionMutation();
    // step-3-> using useTogglesubscriptionMutation to toggle subscription status
    // Function to handle subscription toggle
    const handleSubscribe = async () => {
        try {
            
            await toggleSubscription(channelId);
            setSubscribed(prevSubscribed => !prevSubscribed);
            setSubscriberCount(prevCount => subscribed ? prevCount - 1 : prevCount + 1);
            
        } catch (error) {
            console.error("Error toggling subscription:", error);
        }
    }
    
    

    
   
    
    
  if(video&&dashbord&&comments)return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Video */}
      <div className="aspect-video rounded-xl overflow-hidden shadow-md">
        <ReactPlayer url={video.data[0].videofile} width="100%" height="100%" controls />
      </div>

      

      
      {/* Owner Info and Subscribe */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={video.data[0].owner.avatar}
            alt={video.data[0].owner.username}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{video.data[0].owner.username}</p>
            <p className="text-sm text-gray-500">
              {subscriberCount.toLocaleString()} subscribers
            </p>
          </div>
        </div>
        <button
          onClick={handleSubscribe}
          className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 border ${
            !subscribed
              ? "bg-white text-black border-gray-400"
              : "bg-blue-600 text-white border-blue-600"
          }`}
        >
          <Bell className="w-4 h-4" />
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* Likes */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1,${!isLiked?" text-gray-800":" text-blue-600"}`}
        >
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
        <span className="text-gray-600">{likes.toLocaleString()} likes</span>
      </div>
       

      {/* Comments */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Comments</h2>
        {comments.data.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Avatar (small circle) */}
            <img
              src={comment.owner[0].avatar}
              alt={comment.owner[0].username}
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* Comment content */}
            <div>
              <p className="font-medium">{comment.owner[0].username}</p>
              <p className="text-gray-600">{comment.content}</p>
              { // Display update and delete buttons only if the comment belongs to the current user
              
              comment.owner[0]._id === user._id && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Update comment..."
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleUpdateComment(comment._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
          <div
            
            className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Avatar (small circle) */}
            <img
              src={user.avatar}
              alt={user.username}
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* Comment content */}
            <div >
              <p className="font-medium">{user.username}</p>
              
              <input 
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setComment(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  handleCommentSubmit();
                }}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit</button>
            </div>
          </div>
      </div>

    </div>

    
  )
}

export default VideoPlayerPage
