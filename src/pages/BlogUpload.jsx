import { useState } from "react";

const BlogUpload = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [picture, setPicture] = useState(null);
  const [publication, setPublication] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicturePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ blogTitle, blogContent, picture, publication });
    alert("Blog uploaded successfully!");
    setBlogTitle("");
    setBlogContent("");
    setPicture(null);
    setPublication(null);
    setPicturePreview(null);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
          Upload Blog & Content
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write your blog content..."
              required
            />
          </div>

          {/* Uploading pictures of events */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Picture of events
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
            />
            {picturePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={picturePreview}
                  alt="Preview"
                  className="max-w-xs w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Uploading pdf files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Publication (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPublication(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
            />
            {publication && (
              <p className="mt-2 text-sm text-center text-gray-600">
                Selected: {publication.name}
              </p>
            )}
          </div>

          {/* Submiting blogs and pictures */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogUpload;
