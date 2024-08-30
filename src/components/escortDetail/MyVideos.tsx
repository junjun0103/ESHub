import type React from "react"

interface MyVideosProps {
  videos: string[]
}

const MyVideos: React.FC<MyVideosProps> = ({ videos }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="w-full">
            <div className="aspect-w-16 aspect-h-9">
              <video
                controls
                className="w-full h-full object-cover rounded-lg"
                poster={`${video.split(".")[0]}-thumbnail.jpg`}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyVideos
