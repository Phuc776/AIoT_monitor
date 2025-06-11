import { useState } from "react";

import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";

const CommandListForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    commands: initialData?.commands || [""],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty commands
    const filteredCommands = formData.commands.filter(
      (cmd) => cmd.trim() !== ""
    );

    if (filteredCommands.length === 0) {
      alert("Vui lòng thêm ít nhất một lệnh");
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      commands: filteredCommands,
    };

    console.log("Form submitted with data:", submitData);
    onSubmit(submitData);
  };

  const handleNameChange = (value) => {
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleCommandChange = (index, value) => {
    const newCommands = [...formData.commands];
    newCommands[index] = value;
    setFormData((prev) => ({ ...prev, commands: newCommands }));
  };

  const addCommand = () => {
    setFormData((prev) => ({
      ...prev,
      commands: [...prev.commands, ""],
    }));
  };

  const removeCommand = (index) => {
    if (formData.commands.length > 1) {
      const newCommands = formData.commands.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, commands: newCommands }));
    }
  };

  const moveCommand = (index, direction) => {
    const newCommands = [...formData.commands];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newCommands.length) {
      [newCommands[index], newCommands[targetIndex]] = [
        newCommands[targetIndex],
        newCommands[index],
      ];
      setFormData((prev) => ({ ...prev, commands: newCommands }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full max-h-[80vh] space-y-0"
    >
      {/* Phần tên Command List */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Thông tin Command List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tên Command List *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="VD: Server Maintenance Commands, Network Diagnostics..."
              required
              className="h-10"
            />
            <p className="text-xs text-gray-500">Tên mô tả cho bộ lệnh này</p>
          </div>
        </CardContent>
      </Card>

      {/* Phần danh sách lệnh với cuộn */}
      <Card className="flex-1 overflow-y-auto mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Danh sách lệnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Danh sách lệnh *
            </label>
            <Button
              type="button"
              onClick={addCommand}
              size="sm"
              variant="outline"
            >
              <span className="mr-1">
                <FaPlus />
              </span>
              Thêm lệnh
            </Button>
          </div>
          <div className="space-y-2">
            {formData.commands.map((command, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    onClick={() => moveCommand(index, "up")}
                    disabled={index === 0}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-xs"
                  >
                    <span>
                      <FaAngleUp />
                    </span>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => moveCommand(index, "down")}
                    disabled={index === formData.commands.length - 1}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-xs"
                  >
                    <span>
                      <FaAngleDown />
                    </span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium text-gray-500 min-w-[30px]">
                    {index + 1}.
                  </span>
                  <Input
                    value={command}
                    onChange={(e) => handleCommandChange(index, e.target.value)}
                    placeholder="VD: ls -la, systemctl status nginx, docker ps..."
                    className="h-9 font-mono text-sm"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeCommand(index)}
                  disabled={formData.commands.length === 1}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                >
                  🗑️
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            💡 Mẹo: Sử dụng các lệnh Linux/Unix phổ biến. Bạn có thể sắp xếp lại
            thứ tự bằng nút ↑↓
          </p>
        </CardContent>
      </Card>

      {/* Phần nút submit */}
      <div className="flex justify-end gap-3 pt-2 bg-white p-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          className="px-6"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
          {initialData ? "Cập nhật Command List" : "Tạo Command List"}
        </Button>
      </div>
    </form>
  );
};

export default CommandListForm;
