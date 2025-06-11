import { Badge, Card, CardContent } from "../../../../components";

const DeviceDetails = ({ device }) => {
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
      default:
        return "🖥️";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getDeviceIcon(device.deviceType)}</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {device.deviceName}
            </h2>
            <p className="text-sm text-gray-500">ID: {device.id}</p>
          </div>
        </div>
        <div>{getStatusBadge(device.status)}</div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span>📋</span> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Loại thiết bị
                </label>
                <div className="mt-1">
                  <Badge variant="outline">{device.deviceType}</Badge>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Hệ điều hành
                </label>
                <div className="mt-1">
                  <Badge variant="info">{device.osType || "N/A"}</Badge>
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 block">
                  Vị trí
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-sm">
                    {device.location || "Chưa xác định"}
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 block">
                  Nhóm thiết bị
                </label>
                <div className="mt-1">
                  {device.deviceGroupId ? (
                    <Badge variant="info">Group {device.deviceGroupId}</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      Chưa phân nhóm
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span>🌐</span> Cấu hình mạng
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Địa chỉ IP
                </label>
                <div className="mt-1 font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  {device.ipAddress}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Port
                </label>
                <div className="mt-1 font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  {device.port}
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 block">
                  Giao thức kết nối
                </label>
                <div className="mt-1">
                  <Badge variant="info">{device.connectionProtocol}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication - Full Width */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span>🔐</span> Thông tin xác thực
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Phương thức xác thực
                </label>
                <div className="mt-1">
                  <Badge variant="outline">{device.authMethod}</Badge>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block">
                  Tên đăng nhập
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span>👤</span>
                  <span className="text-sm">{device.username || "N/A"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetails;
