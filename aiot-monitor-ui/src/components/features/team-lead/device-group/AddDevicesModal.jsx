import { useState, useEffect } from "react";

import { Button, Input, Badge } from "../../../../components";
import DeviceGroupAPI from "../../../../services/apis/endpoints/team-lead/device-group";

const AddDevicesModal = ({ onSubmit, onCancel, groupId }) => {
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAvailableDevices();
  }, [currentPage]);

  const fetchAvailableDevices = async () => {
    try {
      setLoading(true);
      const response = await DeviceGroupAPI.getAvailableDevices(currentPage, 8); // Giảm size để giao diện gọn hơn

      if (response.data) {
        setAvailableDevices(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching available devices:", error);
      setAvailableDevices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = availableDevices.filter(
    (device) =>
      device.deviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress?.includes(searchTerm) ||
      device.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeviceToggle = (deviceId) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map((device) => device.id));
    }
  };

  const handleSubmit = () => {
    if (selectedDevices.length === 0) {
      alert("Vui lòng chọn ít nhất một thiết bị");
      return;
    }
    onSubmit(selectedDevices);
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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Chọn thiết bị để thêm vào nhóm
          </h3>
          <p className="text-sm text-gray-600">
            Đã chọn: {selectedDevices.length} thiết bị
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
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

      {/* Select All */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="selectAll"
          checked={
            selectedDevices.length === filteredDevices.length &&
            filteredDevices.length > 0
          }
          onChange={handleSelectAll}
          className="rounded border-gray-300"
        />
        <label
          htmlFor="selectAll"
          className="text-sm font-medium text-gray-700"
        >
          Chọn tất cả ({filteredDevices.length} thiết bị)
        </label>
      </div>

      {/* Device Grid - Compact Layout */}
      <div className="border rounded-lg p-4 bg-gray-50 max-h-80 overflow-y-auto">
        {filteredDevices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "Không tìm thấy thiết bị nào"
              : "Không có thiết bị nào khả dụng"}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDevices.includes(device.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => handleDeviceToggle(device.id)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => handleDeviceToggle(device.id)}
                    className="mt-1 rounded border-gray-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {getDeviceIcon(device.deviceType)}
                      </span>
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {device.deviceName}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 font-mono">
                        {device.ipAddress}:{device.port}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs py-0">
                          {device.deviceType}
                        </Badge>
                        {getStatusBadge(device.status)}
                      </div>
                      {device.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>📍</span>
                          <span className="truncate">{device.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination - Compact */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Trang {currentPage + 1} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              →
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={selectedDevices.length === 0}
        >
          Thêm {selectedDevices.length} thiết bị
        </Button>
      </div>
    </div>
  );
};

export default AddDevicesModal;
