import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import AddMemberModal from "../components/AddMemberModal";
import { getMembers } from "../services/memberService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const workspace = getSelectedWorkspace();

      if (!workspace) {
        toast.error("Please select a workspace first.");
        return;
      }

      const data = await getMembers(workspace.id);
      setMembers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load members.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Members</h1>
          <p className="text-gray-500 mt-2">
            Total Members: {members.length}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No members found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="text-blue-600" size={28} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {member.fullName}
                  </h2>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      member.role === "OWNER"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={18} />
                {member.email}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onMemberAdded={loadMembers}
        />
      )}
    </div>
  );
}