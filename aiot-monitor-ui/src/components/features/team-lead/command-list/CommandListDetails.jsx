import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

const CommandListDetails = ({ commandList, onEdit }) => {
  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    alert("Đã copy lệnh vào clipboard!");
  };

  const copyAllCommands = () => {
    const allCommands = commandList.commands.join("\n");
    navigator.clipboard.writeText(allCommands);
    alert("Đã copy tất cả lệnh vào clipboard!");
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📝</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {commandList.name}
            </h2>
            <p className="text-sm text-gray-500">
              ID: {commandList.id} • {commandList.commands?.length || 0} lệnh
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={copyAllCommands} size="sm" variant="outline">
            <span className="mr-2">📋</span>
            Copy tất cả
          </Button>
          <Button
            onClick={onEdit}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">✏️</span>
            Chỉnh sửa
          </Button>
        </div>
      </div>

      {/* Commands List */}
      <Card className="mt-4 flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span>💻</span>
            Danh sách lệnh
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {!commandList.commands || commandList.commands.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>Chưa có lệnh nào trong danh sách</p>
            </div>
          ) : (
            <div>
              {commandList.commands.map((command, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-2"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Badge
                      variant="outline"
                      className="min-w-[40px] text-center"
                    >
                      {index + 1}
                    </Badge>
                    <code className="flex-1 bg-white px-3 py-2 rounded border font-mono text-sm text-gray-800 break-all">
                      {command}
                    </code>
                  </div>
                  <Button
                    onClick={() => copyCommand(command)}
                    size="sm"
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-50"
                    title="Copy lệnh"
                  >
                    📋
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandListDetails;
