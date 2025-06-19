import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useVideoUploadMutation } from '../Apis/videoApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function VideoFrame( video ) {
  // Get user data from Redux store
  const user = useSelector((state) => state.user.userdata._id);
  // Get navigate function from React Router
  const navigate = useNavigate();
  
    if(video)console.log("VideoFrame props:jjjjjjjjjjjjjjjjjjjjjjjjjjttttttttt", video.video.data[0]);

  //form handling video upload or update
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: video?.video?.data[0]?.title || '',
      description:video?. video?.data[0].description || '',
    },
  });

  // Manually set thumbnail if needed (just displaying, not as default value)
  useEffect(() => {
    if (video?.video?.data[0].thumbnail) {
      // You might want to preview it, or just leave it as-is.
      console.log("Thumbnail exists, but can't be set as default in input type='file'");
    }
  }, [video]);


  const [videoUpload] = useVideoUploadMutation();
  
    const onSubmit = async (data) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.thumbnail && data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      if (data.videofile && data.videofile[0]) {
        formData.append("videofile", data.videofile[0]);
      }

      try {
        await videoUpload(formData).unwrap();
        if(user) navigate(`/channel/${user}`); // Fixed path
        else throw new Error("User ID not found");
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-sm mx-auto">
      {/* Title */}
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="border rounded w-full p-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1">Description</label>
        <input
          type="text"
          {...register("description", { required: "Description is required" })}
          className="border rounded w-full p-2"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block mb-1">Thumbnail</label>
        <input
          type="file"
          {...register("thumbnail", { required: !video?.thumbnail && "Thumbnail is required" })}
          className="border rounded w-full p-2"
        />
        {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
      </div>

      {/* Video File - Only if not already uploaded */}
      {!video?.videofile && (
        <div>
          <label className="block mb-1">Video File</label>
          <input
            type="file"
            {...register("videofile", { required: "Video file is required" })}
            className="border rounded w-full p-2"
          />
          {errors.videofile && <p className="text-red-500 text-sm">{errors.videofile.message}</p>}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {video ? "Update Video" : "Upload Video"}
      </button>
    </form>
  );
}

export default VideoFrame;
