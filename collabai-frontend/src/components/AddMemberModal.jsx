import { useState } from "react";
import toast from "react-hot-toast";

import { addMember } from "../services/memberService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function AddMemberModal({ onClose, onMemberAdded }) {

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const workspace = getSelectedWorkspace();

      await addMember({
        workspaceId: workspace.id,
        email,
        role,
      });

      toast.success("Member added successfully!");

      onMemberAdded();
      onClose();

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to add member.";

      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[450px] p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Add Member
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 font-bold"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Member Email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="MEMBER">MEMBER</option>
            <option value="OWNER">OWNER</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Add Member
          </button>

        </form>

      </div>

    </div>
  );
}