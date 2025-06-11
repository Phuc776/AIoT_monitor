import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

import DeviceGroupAPI from "../../../../services/apis/endpoints/team-lead/device-group";
import CommandListAPI from "../../../../services/apis/endpoints/team-lead/command-list";

const ProfileDetails = ({ profile, onEdit, onAssignOperators }) => {
  const [deviceGroup, setDeviceGroup] = useState(null);
  const [commandList, setCommandList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        setLoading(true);
        if (profile.deviceGroupId) {
          try {
            const deviceGroupResponse = await DeviceGroupAPI.getGroupById(
              profile.deviceGroupId
            );
            console.log("Device Group Response:", deviceGroupResponse.data);
            setDeviceGroup(deviceGroupResponse.data || null);
          } catch (error) {
            console.error("Error fetching device group:", error);
          }
        }

        if (profile.commandListId) {
          try {
            const commandListResponse = await CommandListAPI.getCommandListById(
              profile.commandListId
            );
            setCommandList(commandListResponse.data?.commandList || null);
          } catch (error) {
            console.error("Error fetching command list:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching related data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedData();
  }, [profile]);

  return (
    <div className="flex flex-col h-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👤</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.profileName}
            </h2>
            <p className="text-sm text-gray-500">ID: {profile.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onAssignOperators}
            size="sm"
            variant="outline"
            className="text-green-600 border-green-200"
          >
            <span className="mr-2">👥</span>
            Gán người vận hành
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Device Group Info */}
        <Card>
          <CardHeader className="!py-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>📱</span>
              Nhóm thiết bị
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : deviceGroup ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 py-2 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {deviceGroup.groupName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: {deviceGroup.id}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Thiết bị trong nhóm:
                  </h4>
                  {deviceGroup.devices && deviceGroup.devices.length > 0 ? (
                    <div className="max-h-32 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                      {deviceGroup.devices.map((device) => (
                        <div
                          key={device.id}
                          className="flex justify-between items-center p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition"
                        >
                          <span className="font-medium text-gray-800 text-sm">
                            {device.deviceName}
                          </span>
                          <span className="text-sm text-gray-500 font-light">
                            {device.ipAddress}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Không có thiết bị nào trong nhóm này
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📱</div>
                <p>Chưa gán nhóm thiết bị</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Command List Info */}
        <Card>
          <CardHeader className="!py-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>📝</span>
              Danh sách lệnh
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : commandList ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 py-2 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <span className="text-xl">📝</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {commandList.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: {commandList.id}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Các lệnh:
                  </h4>
                  {commandList.commands && commandList.commands.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {commandList.commands.map((command, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="min-w-[30px] text-center"
                          >
                            {index + 1}
                          </Badge>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 break-all">
                            {command}
                          </code>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Không có lệnh nào trong danh sách này
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📝</div>
                <p>Chưa gán danh sách lệnh</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Assigned Operators */}
      <Card className="mt-4 flex-1 flex flex-col">
        <CardHeader className="!py-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <span>👥</span>
            Người vận hành được gán
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {!profile.assignedOperators ||
          profile.assignedOperators.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">👥</div>
              <p>Chưa có người vận hành nào được gán</p>
              <Button
                onClick={onAssignOperators}
                variant="outline"
                className="mt-4"
              >
                <span className="mr-2">👥</span>
                Gán người vận hành
              </Button>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[calc(80vh-500px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.assignedOperators.map((operator) => (
                  <div
                    key={operator.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {operator.username}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {operator.role} • ID: {operator.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetails;
