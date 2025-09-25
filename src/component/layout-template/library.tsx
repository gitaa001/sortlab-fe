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
        <div className="bg-gray-200 w-full h-100 rounded-sm flex items-center justify-center mb-4 border-2 border-dashed border-gray-400">
            {videoUrl ? (
                <iframe
                className="w-full h-full rounded-sm"
                src={videoUrl}
                title={title}
                allowFullScreen
                />
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Video Placeholder</span>
                <span className="text-xs text-gray-400 mt-1">Video will be shown here</span>
                </div>
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
