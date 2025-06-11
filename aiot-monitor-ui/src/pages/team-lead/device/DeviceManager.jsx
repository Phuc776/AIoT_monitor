import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Input,
  Badge,
  Modal,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dropdown,
  DropdownItem,
} from "../../../components";

import { FaPlus } from "react-icons/fa";
import { DeviceForm, DeviceDetails } from "../../../components";
import DeviceAPI from "../../../services/apis/endpoints/team-lead/device";

const DeviceManager = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch devices from API
  useEffect(() => {
    fetchDevices();
  }, [currentPage]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DeviceAPI.getDevicesByPage(currentPage, 10);

      console.log("API Response:", response.data); // Debug log

      if (response.data) {
        setDevices(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
      setError("Không thể tải danh sách thiết bị. Vui lòng thử lại.");
      setDevices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.deviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress?.includes(searchTerm) ||
      device.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "online":
        return <Badge variant="success">Online</Badge>;
      case "inactive":
      case "offline":
        return <Badge variant="error">Offline</Badge>;
      case "maintenance":
        return <Badge variant="warning">Maintenance</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
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

  const getDeviceGroupBadge = (device) => {
    // Kiểm tra cả deviceGroup object và deviceGroupId
    const deviceGroup = device.deviceGroup;
    const deviceGroupId = device.deviceGroupId;

    if (deviceGroup && deviceGroup.id) {
      return <Badge variant="info">Group {deviceGroup.id}</Badge>;
    } else if (deviceGroupId) {
      return <Badge variant="info">Group {deviceGroupId}</Badge>;
    } else {
      return (
        <Badge variant="outline" className="text-gray-500">
          Chưa phân nhóm
        </Badge>
      );
    }
  };

  const handleCreateDevice = async (deviceData) => {
    try {
      console.log("Creating device with data:", deviceData); // Debug log

      // Chuẩn bị data theo format backend expect
      const requestData = {
        deviceName: deviceData.deviceName,
        ipAddress: deviceData.ipAddress,
        port: deviceData.port || 22,
        deviceType: deviceData.deviceType,
        location: deviceData.location || "",
        status: deviceData.status || "offline",
        connectionProtocol: deviceData.connectionProtocol || "SSH",
        authMethod: deviceData.authMethod || "PASSWORD",
        username: deviceData.username || "",
        password: deviceData.password || null,
        publicKey: deviceData.publicKey || "",
        osType: deviceData.osType || "",
        deviceGroupId: deviceData.deviceGroupId || null,
      };

      console.log("Request data:", requestData); // Debug log

      const response = await DeviceAPI.createDevice(requestData);
      console.log("Create response:", response); // Debug log

      if (response.data) {
        await fetchDevices(); // Refresh the list
        setIsCreateModalOpen(false);
        toast.success("Tạo thiết bị thành công!");
      }
    } catch (error) {
      console.error("Error creating device:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể tạo thiết bị: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleUpdateDevice = async (deviceData) => {
    try {
      console.log("Updating device with data:", deviceData); // Debug log

      const requestData = {
        deviceName: deviceData.deviceName,
        ipAddress: deviceData.ipAddress,
        port: deviceData.port,
        deviceType: deviceData.deviceType,
        location: deviceData.location,
        status: deviceData.status,
        connectionProtocol: deviceData.connectionProtocol,
        authMethod: deviceData.authMethod,
        username: deviceData.username,
        password: deviceData.password,
        publicKey: deviceData.publicKey,
        osType: deviceData.osType,
        deviceGroupId: deviceData.deviceGroupId,
      };

      const response = await DeviceAPI.updateDevice(
        selectedDevice.id,
        requestData
      );
      console.log("Update response:", response); // Debug log

      if (response.data) {
        await fetchDevices(); // Refresh the list
        setIsEditModalOpen(false);
        setSelectedDevice(null);
        toast.success("Cập nhật thiết bị thành công!");
      }
    } catch (error) {
      console.error("Error updating device:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể cập nhật thiết bị: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteDevice = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thiết bị này?")) {
      try {
        await DeviceAPI.deleteDevice(id);
        await fetchDevices(); // Refresh the list
        toast.success("Xoá thiết bị thành công!");
      } catch (error) {
        console.error("Error deleting device:", error);
        toast.error(
          `Không thể xoá thiết bị: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const handleViewDetails = async (device) => {
    try {
      const response = await DeviceAPI.getDeviceById(device.id);
      if (response.data && response.data.deviceDTO) {
        setSelectedDevice(response.data.deviceDTO);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching device details:", error);
      setSelectedDevice(device); // Fallback to current device data
      setIsDetailsModalOpen(true);
    }
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="space-y-4">
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
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
          <Button onClick={fetchDevices}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Quản lý thiết bị
            </h1>
            <p className="text-gray-600">
              Quản lý và giám sát các thiết bị IoT trong hệ thống
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <span className="mr-2">
              <FaPlus />
            </span>
            Thêm thiết bị
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng thiết bị
              </CardTitle>
              <span className="text-2xl">🖥️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalElements}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Đang hoạt động
              </CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {
                  devices.filter(
                    (d) => d.status === "active" || d.status === "ONLINE"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ngoại tuyến
              </CardTitle>
              <span className="text-2xl">❌</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {
                  devices.filter(
                    (d) => d.status === "inactive" || d.status === "OFFLINE"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bảo trì
              </CardTitle>
              <span className="text-2xl">🔧</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {devices.filter((d) => d.status === "maintenance").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <Input
                  placeholder="Tìm kiếm theo tên, IP hoặc vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-visible">
            <div className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thiết bị</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Nhóm thiết bị</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giao thức</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        {searchTerm
                          ? "Không tìm thấy thiết bị nào"
                          : "Chưa có thiết bị nào"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {getDeviceIcon(device.deviceType)}
                            </span>
                            <div>
                              <div className="font-medium text-gray-900">
                                {device.deviceName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {device.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm text-gray-700">
                            {device.ipAddress}:{device.port}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{device.deviceType}</Badge>
                        </TableCell>
                        <TableCell>{getDeviceGroupBadge(device)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>📍</span>
                            <span className="text-sm">
                              {device.location || "Chưa xác định"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(device.status)}</TableCell>
                        <TableCell>
                          <Badge variant="info">
                            {device.connectionProtocol}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right relative">
                          <Dropdown
                            align="top"
                            trigger={
                              <Button variant="ghost" size="icon">
                                <span>⋮</span>
                              </Button>
                            }
                          >
                            <DropdownItem
                              onClick={() => handleViewDetails(device)}
                            >
                              <span className="mr-2">👁️</span>
                              Xem chi tiết
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleEditDevice(device)}
                            >
                              <span className="mr-2">✏️</span>
                              Chỉnh sửa
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDeleteDevice(device.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <span className="mr-2">🗑️</span>
                              Xóa
                            </DropdownItem>
                          </Dropdown>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Hiển thị {devices.length} trên {totalElements} thiết bị
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
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Thêm thiết bị mới"
          size="lg"
        >
          <DeviceForm
            onSubmit={handleCreateDevice}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Chỉnh sửa thiết bị"
          size="lg"
        >
          <DeviceForm
            onSubmit={handleUpdateDevice}
            onCancel={() => setIsEditModalOpen(false)}
            initialData={selectedDevice}
          />
        </Modal>

        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Chi tiết thiết bị"
          size="lg"
        >
          {selectedDevice && <DeviceDetails device={selectedDevice} />}
        </Modal>
      </div>
    </div>
  );
};

export default DeviceManager;
