import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getComments,
  addComment,
} from "../services/commentService";

export default function CommentModal({ taskId, onClose }) {

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const data = await getComments(taskId);
      setComments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addComment({
        taskId,
        content,
      });

      toast.success("Comment added!");

      setContent("");

      loadComments();

    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Comments
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 font-bold"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4 max-h-72 overflow-y-auto mb-6">

          {comments.length === 0 ? (

            <p className="text-gray-500">
              No comments yet.
            </p>

          ) : (

            comments.map((comment) => (

              <div
                key={comment.id}
                className="border rounded-lg p-3"
              >
                <p>{comment.content}</p>

                <p className="text-sm text-gray-500 mt-2">
                  — {comment.userName}
                </p>

              </div>

            ))

          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          <textarea
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>

        </form>

      </div>

    </div>
  );
}