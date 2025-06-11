import { useState } from "react";

import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

const DeviceGroupForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    groupName: initialData?.groupName || "",
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
          <CardTitle className="text-lg">Thông tin nhóm thiết bị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tên nhóm *
            </label>
            <Input
              value={formData.groupName}
              onChange={(e) => handleChange("groupName", e.target.value)}
              placeholder="Nhập tên nhóm thiết bị (VD: Production Servers, IoT Sensors...)"
              required
              className="h-10"
            />
            <p className="text-xs text-gray-500">
              Tên nhóm sẽ giúp bạn dễ dàng phân loại và quản lý các thiết bị
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
          {initialData ? "Cập nhật nhóm" : "Tạo nhóm"}
        </Button>
      </div>
    </form>
  );
};

export default DeviceGroupForm;
