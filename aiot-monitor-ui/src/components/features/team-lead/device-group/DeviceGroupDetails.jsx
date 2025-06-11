import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  Button,
  Input,
  Badge,
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
} from "../../../../components";
import { FaChevronLeft } from "react-icons/fa";

const DeviceGroupDetails = ({
  group,
  onClose,
  onAddDevices,
  onRemoveDevice,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = (group.devices || []).filter(
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

  const handleRemoveDevice = (deviceId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thiết bị này khỏi nhóm?")) {
      onRemoveDevice(deviceId);
    }
  };

  // Calculate stats
  const onlineDevices = filteredDevices.filter(
    (d) => d.status === "active" || d.status === "online"
  ).length;
  const offlineDevices = filteredDevices.filter(
    (d) => d.status === "inactive" || d.status === "offline"
  ).length;
  const maintenanceDevices = filteredDevices.filter(
    (d) => d.status === "maintenance"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} className="p-2">
            <span className="text-lg">
              <FaChevronLeft />
            </span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {group.groupName}
              </h1>
              <p className="text-gray-600">
                ID: {group.id} • {group.devices?.length || 0} thiết bị
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => onAddDevices(group)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <span className="mr-2">➕</span>
          Thêm thiết bị
        </Button>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-lg">Danh sách thiết bị</CardTitle>
            <div className="relative w-full sm:w-80">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <Input
                placeholder="Tìm kiếm thiết bị..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredDevices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm
                  ? "Không tìm thấy thiết bị nào"
                  : "Nhóm chưa có thiết bị nào"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Thêm thiết bị đầu tiên vào nhóm này"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => onAddDevices(group)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span className="mr-2">➕</span>
                  Thêm thiết bị đầu tiên
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-328px)]">
              <div className="overflow-x-auto flex-grow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thiết bị</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Giao thức</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="overflow-y-auto">
                    {filteredDevices.map((device) => (
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
                        <TableCell className="text-right">
                          <Dropdown
                            align="right"
                            trigger={
                              <Button variant="ghost" size="icon">
                                <span>⋮</span>
                              </Button>
                            }
                          >
                            <DropdownItem
                              onClick={() => console.log("View device", device)}
                            >
                              <span className="mr-2">👁️</span>
                              Xem chi tiết
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => console.log("Edit device", device)}
                            >
                              <span className="mr-2">✏️</span>
                              Chỉnh sửa
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleRemoveDevice(device.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <span className="mr-2">🗑️</span>
                              Xóa khỏi nhóm
                            </DropdownItem>
                          </Dropdown>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceGroupDetails;
