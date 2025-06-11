import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

const DeviceForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    deviceName: initialData?.deviceName || "",
    ipAddress: initialData?.ipAddress || "",
    port: initialData?.port || 22,
    deviceType: initialData?.deviceType || "Server", // Set default to first option
    location: initialData?.location || "",
    status: initialData?.status || "Offline",
    connectionProtocol: initialData?.connectionProtocol || "SSH",
    authMethod: initialData?.authMethod || "PASSWORD",
    username: initialData?.username || "",
    password: initialData?.password || "",
    publicKey: initialData?.publicKey || "",
    osType: initialData?.osType || "Linux", // Set default to first option
    deviceGroupId: initialData?.deviceGroupId || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Thông tin thiết bị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Row 1: Tên thiết bị, Loại thiết bị, IP Address */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Tên thiết bị *
              </label>
              <Input
                value={formData.deviceName}
                onChange={(e) => handleChange("deviceName", e.target.value)}
                placeholder="Server-01"
                required
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Loại thiết bị *
              </label>
              <select
                value={formData.deviceType}
                onChange={(e) => handleChange("deviceType", e.target.value)}
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              >
                <option value="Server">Server</option>
                <option value="Sensor">Sensor</option>
                <option value="Gateway">Gateway</option>
                <option value="Router">Router</option>
                <option value="Switch">Switch</option>
                <option value="Camera">Camera</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Địa chỉ IP *
              </label>
              <Input
                value={formData.ipAddress}
                onChange={(e) => handleChange("ipAddress", e.target.value)}
                placeholder="192.168.1.100"
                required
                className="h-9"
              />
            </div>
          </div>

          {/* Row 2: Port, Giao thức, Trạng thái */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Port</label>
              <Input
                type="number"
                value={formData.port}
                onChange={(e) =>
                  handleChange("port", Number.parseInt(e.target.value))
                }
                placeholder="22"
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Giao thức *
              </label>
              <select
                value={formData.connectionProtocol}
                onChange={(e) =>
                  handleChange("connectionProtocol", e.target.value)
                }
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              >
                <option value="SSH">SSH</option>
                <option value="HTTP">HTTP</option>
                <option value="HTTPS">HTTPS</option>
                <option value="FTP">FTP</option>
                <option value="TELNET">TELNET</option>
                <option value="MQTT">MQTT</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="inactive">Offline</option>
                <option value="active">Online</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Row 3: Vị trí, OS, Device Group */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Vị trí
              </label>
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Data Center A"
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Hệ điều hành
              </label>
              <select
                value={formData.osType}
                onChange={(e) => handleChange("osType", e.target.value)}
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="Linux">Linux</option>
                <option value="Windows">Windows</option>
                <option value="MacOS">MacOS</option>
                <option value="Embedded">Embedded</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Device Group
              </label>
              <select
                value={formData.deviceGroupId}
                onChange={(e) =>
                  handleChange(
                    "deviceGroupId",
                    e.target.value ? Number.parseInt(e.target.value) : ""
                  )
                }
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Không phân nhóm</option>
                <option value="1">Group 1 - Production</option>
                <option value="2">Group 2 - Development</option>
                <option value="3">Group 3 - Testing</option>
                <option value="4">Group 4 - Monitoring</option>
              </select>
            </div>
          </div>

          {/* Row 4: Auth method, Username */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phương thức xác thực
              </label>
              <select
                value={formData.authMethod}
                onChange={(e) => handleChange("authMethod", e.target.value)}
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="PASSWORD">Password</option>
                <option value="PUBLIC_KEY">Public Key</option>
                <option value="API_KEY">API Key</option>
                <option value="CERTIFICATE">Certificate</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <Input
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="admin"
                className="h-9"
              />
            </div>
          </div>

          {/* Row 5: Password hoặc Public Key (conditional) */}
          {formData.authMethod === "PASSWORD" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Nhập mật khẩu"
                className="h-9"
              />
            </div>
          )}

          {formData.authMethod === "PUBLIC_KEY" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Public Key
              </label>
              <textarea
                value={formData.publicKey}
                onChange={(e) => handleChange("publicKey", e.target.value)}
                placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAA..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
              />
            </div>
          )}
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
          {initialData ? "Cập nhật thiết bị" : "Tạo thiết bị"}
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;
