import { useState, useEffect } from "react";

import {
  Button,
  Input,
  Select,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

import DeviceGroupAPI from "../../../../services/apis/endpoints/team-lead/device-group";
import CommandListAPI from "../../../../services/apis/endpoints/team-lead/command-list";

const ProfileForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    profileName: initialData?.profileName || "",
    deviceGroupId: initialData?.deviceGroupId || "",
    commandListId: initialData?.commandListId || "",
  });

  const [deviceGroups, setDeviceGroups] = useState([]);
  const [commandLists, setCommandLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [deviceGroupsResponse, commandListsResponse] = await Promise.all([
          DeviceGroupAPI.getGroupsByPage(0, 100),
          CommandListAPI.getCommandListsByPage(0, 100),
        ]);

        console.log(
          "Device Groups Response:",
          deviceGroupsResponse.data.content
        );
        console.log(
          "Command Lists Response:",
          commandListsResponse.data.content
        );

        setDeviceGroups(deviceGroupsResponse.data?.content || []);
        setCommandLists(commandListsResponse.data?.content || []);
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.profileName.trim()) {
      return;
    }

    const submitData = {
      profileName: formData.profileName.trim(),
      deviceGroupId: formData.deviceGroupId
        ? Number(formData.deviceGroupId)
        : null,
      commandListId: formData.commandListId
        ? Number(formData.commandListId)
        : null,
    };

    console.log("Form submitted with data:", submitData);
    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Thông tin Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tên Profile *
            </label>
            <Input
              value={formData.profileName}
              onChange={(e) => handleChange("profileName", e.target.value)}
              placeholder="VD: Profile cho thiết bị mạng, Profile cho máy chủ..."
              required
              className="h-10"
            />
            <p className="text-xs text-gray-500">Tên mô tả cho profile này</p>
          </div>

          {/* Device Group */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nhóm thiết bị
            </label>
            <Select
              value={formData.deviceGroupId}
              onChange={(e) => handleChange("deviceGroupId", e.target.value)}
              className="h-10"
            >
              <option value="">-- Chọn nhóm thiết bị --</option>
              {deviceGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.groupName}
                </option>
              ))}
            </Select>
            <p className="text-xs text-gray-500">
              Nhóm thiết bị mà profile này sẽ quản lý
            </p>
          </div>

          {/* Command List */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Danh sách lệnh
            </label>
            <Select
              value={formData.commandListId}
              onChange={(e) => handleChange("commandListId", e.target.value)}
              className="h-10"
            >
              <option value="">-- Chọn danh sách lệnh --</option>
              {commandLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
            <p className="text-xs text-gray-500">
              Danh sách lệnh mà profile này sẽ sử dụng
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="px-6"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
          {initialData ? "Cập nhật Profile" : "Tạo Profile"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
