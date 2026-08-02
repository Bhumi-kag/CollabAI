export default function WorkspaceCard({
  workspace,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(workspace)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold">
        {workspace.name}
      </h2>

      <p className="text-gray-500 mt-3">
        {workspace.description}
      </p>

      <p className="mt-5 text-sm text-blue-600">
        Owner: {workspace.ownerName}
      </p>
    </div>
  );
}