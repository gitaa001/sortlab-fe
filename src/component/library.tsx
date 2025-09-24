'use client';

interface LibraryLayoutProps {
  title: string;
  videoUrl?: string;
  content: React.ReactNode;
}

const LibraryLayout: React.FC<LibraryLayoutProps> = ({ title, videoUrl, content }) => {
  return (
    <div className="border rounded-md p-4">
      {/* Video */}
      <div className="bg-gray-300 w-full h-48 flex items-center justify-center mb-4">
        {videoUrl ? (
          <iframe
            className="w-full h-48"
            src={videoUrl}
            title={title}
            allowFullScreen
          />
        ) : (
          <span className="text-black font-semibold">video placeholder</span>
        )}
      </div>

      {/* Materi */}
      <div>
        {content}
      </div>
    </div>
  );
};

export default LibraryLayout;
