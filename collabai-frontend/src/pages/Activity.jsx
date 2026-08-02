import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import ActivityCard from "../components/ActivityCard";

import { getActivity } from "../services/activityService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function Activity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const workspace = getSelectedWorkspace();

      if (!workspace) {
        toast.error("Please select a workspace first.");
        return;
      }

      const data = await getActivity(workspace.id);

      setActivities(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Activity Timeline
      </h1>

      {activities.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No activity found.
        </div>

      ) : (

        <div className="space-y-6">

          {activities.map((activity) => (

            <ActivityCard
              key={activity.id}
              activity={activity}
            />

          ))}

        </div>

      )}

    </div>
  );
}