import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

import {
  Button,
  Input,
  Badge,
  Modal,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
} from "../../../components";

import {
  DeviceGroupForm,
  AddDevicesModal,
  DeviceGroupDetails,
} from "../../../components";

import DeviceGroupAPI from "../../../services/apis/endpoints/team-lead/device-group";
import { FaPlus } from "react-icons/fa";

const DeviceGroupManager = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddDevicesModalOpen, setIsAddDevicesModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch groups from API
  useEffect(() => {
    fetchGroups();
  }, [currentPage]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DeviceGroupAPI.getGroupsByPage(currentPage, 20);

      console.log("API Response Mới:", response.data); // Debug log

      if (response.data) {
        const groupsData = response.data.content || [];
        setGroups(groupsData);
        setTotalPages(response.data.totalPages || 0);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setError("Không thể tải danh sách nhóm thiết bị. Vui lòng thử lại.");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = async (groupData) => {
    try {
      console.log("Creating group with data:", groupData); // Debug log

      const response = await DeviceGroupAPI.createGroup(groupData);
      console.log("Create response:", response); // Debug log

      if (response.data) {
        await fetchGroups(); // Refresh the list
        setIsCreateModalOpen(false);
        toast.success("Tạo nhóm thiết bị thành công!");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể tạo nhóm thiết bị: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleAddDevices = (group) => {
    setSelectedGroup(group);
    setIsAddDevicesModalOpen(true);
  };

  const handleAddDevicesToGroup = async (deviceIds) => {
    try {
      console.log("Adding devices to group:", selectedGroup.id, deviceIds); // Debug log

      const response = await DeviceGroupAPI.addDevicesToGroup(
        selectedGroup.id,
        deviceIds
      );
      console.log("Add devices response:", response); // Debug log

      if (response.data) {
        await fetchGroups(); // Refresh the list
        setIsAddDevicesModalOpen(false);
        setSelectedGroup(null);
        toast.success("Thêm thiết bị vào nhóm thành công!");
      }
    } catch (error) {
      console.error("Error adding devices to group:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể thêm thiết bị vào nhóm: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleViewAllDevices = (group) => {
    setSelectedGroup(group);
    setIsDetailsModalOpen(true);
  };

  const handleRemoveDeviceFromGroup = async (deviceId) => {
    try {
      // TODO: Implement API call to remove device from group
      console.log("Remove device from group:", selectedGroup.id, deviceId);
      // For now, just refresh the data
      await fetchGroups();
      toast.success("Đã xóa thiết bị khỏi nhóm!");
    } catch (error) {
      console.error("Error removing device from group:", error);
      toast.error("Không thể xóa thiết bị khỏi nhóm!");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case "server":
        return "🖥️";
      case "sensor":
        return "📡";
      case "gateway":
        return "🌐";
      case "camera":
        return "📹";
      case "router":
        return "📡";
      case "switch":
        return "🔀";
      default:
        return "🖥️";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "online":
        return "text-green-600";
      case "inactive":
      case "offline":
        return "text-red-600";
      case "maintenance":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  // Calculate stats from groups
  const totalDevices = groups.reduce(
    (total, group) => total + (group.devices?.length || 0),
    0
  );
  const groupsWithDevicesCount = groups.filter(
    (group) => group.devices && group.devices.length > 0
  ).length;
  const emptyGroupsCount = groups.filter(
    (group) => !group.devices || group.devices.length === 0
  ).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
          <Button onClick={fetchGroups}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Quản lý nhóm thiết bị
            </h1>
            <p className="text-gray-600">
              Tạo và quản lý các nhóm thiết bị trong hệ thống
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Tạo nhóm mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Tổng nhóm
              </CardTitle>
              <span className="text-2xl">📁</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {totalElements}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Tổng thiết bị
              </CardTitle>
              <span className="text-2xl">🖥️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {totalDevices}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Nhóm có thiết bị
              </CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {groupsWithDevicesCount}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">
                Nhóm trống
              </CardTitle>
              <span className="text-2xl">📂</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {emptyGroupsCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <Input
                placeholder="Tìm kiếm nhóm thiết bị..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Groups Grid */}
        {filteredGroups.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm
                  ? "Không tìm thấy nhóm nào"
                  : "Chưa có nhóm thiết bị nào"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Tạo nhóm đầu tiên để bắt đầu quản lý thiết bị"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span className="mr-2">➕</span>
                  Tạo nhóm đầu tiên
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📁</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {group.groupName}
                        </CardTitle>
                        <p className="text-sm text-gray-500">ID: {group.id}</p>
                      </div>
                    </div>
                    <Dropdown
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <span>⋮</span>
                        </Button>
                      }
                    >
                      <DropdownItem onClick={() => handleAddDevices(group)}>
                        <span className="mr-2">➕</span>
                        Thêm thiết bị
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => console.log("Edit group", group)}
                      >
                        <span className="mr-2">✏️</span>
                        Chỉnh sửa
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => console.log("Delete group", group)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <span className="mr-2">🗑️</span>
                        Xóa nhóm
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Group Stats */}
                    <div className="flex items-center justify-between">
                      <Badge variant="info" className="text-xs">
                        {group.devices?.length || 0} thiết bị
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {group.createdAt
                          ? new Date(group.createdAt).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </span>
                    </div>

                    {/* Devices List */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span>🖥️</span>
                        Thiết bị trong nhóm:
                      </h4>

                      {!group.devices || group.devices.length === 0 ? (
                        <div className="text-center py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                          <div className="text-2xl mb-1">📂</div>
                          <p className="text-sm text-gray-500">
                            Nhóm chưa có thiết bị nào
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddDevices(group)}
                            className="mt-2 text-xs"
                          >
                            Thêm thiết bị đầu tiên
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {group.devices.slice(0, 5).map((device, index) => (
                            <div
                              key={device.id || index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-base">
                                  {getDeviceIcon(device.deviceType)}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">
                                    {device.deviceName || `Device ${device.id}`}
                                  </div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {device.ipAddress || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(
                                  device.status
                                )} bg-current`}
                              ></div>
                            </div>
                          ))}

                          {group.devices.length > 5 && (
                            <div className="text-center py-1">
                              <span className="text-xs text-gray-500">
                                và {group.devices.length - 5} thiết bị khác...
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {group.devices && group.devices.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddDevices(group)}
                            className="flex-1 text-xs"
                          >
                            ➕ Thêm thiết bị
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewAllDevices(group)}
                            className="flex-1 text-xs"
                          >
                            👁️ Xem tất cả
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Hiển thị {filteredGroups.length} trên {totalElements} nhóm
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    Trước
                  </Button>
                  <span className="text-sm text-gray-600">
                    Trang {currentPage + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Tạo nhóm thiết bị mới"
          size="md"
        >
          <DeviceGroupForm
            onSubmit={handleCreateGroup}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isAddDevicesModalOpen}
          onClose={() => {
            setIsAddDevicesModalOpen(false);
            setSelectedGroup(null);
          }}
          title={`Thêm thiết bị vào nhóm "${selectedGroup?.groupName}"`}
          size="lg"
        >
          <AddDevicesModal
            onSubmit={handleAddDevicesToGroup}
            onCancel={() => {
              setIsAddDevicesModalOpen(false);
              setSelectedGroup(null);
            }}
            groupId={selectedGroup?.id}
          />
        </Modal>

        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedGroup(null);
          }}
          title={`Chi tiết nhóm "${selectedGroup?.groupName}"`}
          size="2xl"
        >
          {selectedGroup && (
            <DeviceGroupDetails
              group={selectedGroup}
              onAddDevices={(group) => {
                setIsDetailsModalOpen(false);
                handleAddDevices(group);
              }}
              onRemoveDevice={handleRemoveDeviceFromGroup}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DeviceGroupManager;
