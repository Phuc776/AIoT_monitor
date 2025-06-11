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
  CardFooter,
  Dropdown,
  DropdownItem,
} from "../../../components";

import { CommandListForm, CommandListDetails } from "../../../components";

import CommandListAPI from "../../../services/apis/endpoints/team-lead/command-list";
import { FaPlus } from "react-icons/fa";

const CommandListManager = () => {
  const [commandLists, setCommandLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommandList, setSelectedCommandList] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch command lists from API
  useEffect(() => {
    fetchCommandLists();
  }, [currentPage]);

  const fetchCommandLists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CommandListAPI.getCommandListsByPage(
        currentPage,
        12
      ); // Increased to 12 for better grid layout

      console.log("API Response:", response.data); // Debug log

      if (response.data) {
        setCommandLists(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Error fetching command lists:", error);
      setError("Không thể tải danh sách command list. Vui lòng thử lại.");
      setCommandLists([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommandLists = commandLists.filter((commandList) =>
    commandList.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCommandList = async (commandListData) => {
    try {
      console.log("Creating command list with data:", commandListData); // Debug log

      const response = await CommandListAPI.createCommandList(commandListData);
      console.log("Create response:", response); // Debug log

      if (response.data) {
        await fetchCommandLists(); // Refresh the list
        setIsCreateModalOpen(false);
        toast.success("Tạo Command List thành công!");
      }
    } catch (error) {
      console.error("Error creating command list:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể tạo Command List: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleUpdateCommandList = async (commandListData) => {
    try {
      console.log("Updating command list with data:", commandListData); // Debug log

      const response = await CommandListAPI.updateCommandList(
        selectedCommandList.id,
        commandListData
      );
      console.log("Update response:", response); // Debug log

      if (response.data) {
        await fetchCommandLists(); // Refresh the list
        setIsEditModalOpen(false);
        setSelectedCommandList(null);
        toast.success("Cập nhật Command List thành công!");
      }
    } catch (error) {
      console.error("Error updating command list:", error);
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        `Không thể cập nhật Command List: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteCommandList = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Command List này?")) {
      try {
        await CommandListAPI.deleteCommandList(id);
        await fetchCommandLists(); // Refresh the list
        toast.success("Xóa Command List thành công!");
      } catch (error) {
        console.error("Error deleting command list:", error);
        toast.error(
          `Không thể xóa Command List: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const handleViewDetails = async (commandList) => {
    try {
      const response = await CommandListAPI.getCommandListById(commandList.id);
      if (response.data && response.data.commandList) {
        setSelectedCommandList(response.data.commandList);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching command list details:", error);
      setSelectedCommandList(commandList); // Fallback to current data
      setIsDetailsModalOpen(true);
    }
  };

  const handleEditCommandList = (commandList) => {
    setSelectedCommandList(commandList);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const copyCommands = (commands) => {
    const allCommands = commands.join("\n");
    navigator.clipboard.writeText(allCommands);
    toast.success("Đã copy tất cả lệnh vào clipboard!");
  };

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    toast.success("Đã copy lệnh vào clipboard!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Đang tải danh sách Command Lists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Có lỗi xảy ra
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={fetchCommandLists}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Thử lại
            </Button>
          </div>
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
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý Command Lists
            </h1>
            <p className="text-gray-600">
              Tạo và quản lý các bộ lệnh để thực thi trên thiết bị
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Tạo Command List
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <Input
              placeholder="Tìm kiếm Command List..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-gray-500">
            Hiển thị {filteredCommandLists.length} trên {totalElements} Command
            Lists
          </div>
        </div>

        {/* Grid Layout */}
        {filteredCommandLists.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm
                ? "Không tìm thấy Command List"
                : "Chưa có Command List nào"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Thử tìm kiếm với từ khóa khác hoặc tạo Command List mới"
                : "Bắt đầu bằng cách tạo Command List đầu tiên của bạn"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <span className="mr-2">
                  <FaPlus />
                </span>
                Tạo Command List đầu tiên
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommandLists.map((commandList) => (
              <Card
                key={commandList.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gray-50 border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <span className="text-xl">📝</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {commandList.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          ID: {commandList.id}
                        </p>
                      </div>
                    </div>
                    <Dropdown
                      align="right"
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
                        >
                          <span>⋮</span>
                        </Button>
                      }
                    >
                      <DropdownItem
                        onClick={() => handleViewDetails(commandList)}
                      >
                        <span className="mr-2">👁️</span>
                        Xem chi tiết
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => copyCommands(commandList.commands || [])}
                      >
                        <span className="mr-2">📋</span>
                        Copy tất cả lệnh
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleEditCommandList(commandList)}
                      >
                        <span className="mr-2">✏️</span>
                        Chỉnh sửa
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDeleteCommandList(commandList.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <span className="mr-2">🗑️</span>
                        Xóa
                      </DropdownItem>
                    </Dropdown>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {commandList.commands?.length || 0} lệnh
                    </Badge>
                    {commandList.commands?.some((cmd) =>
                      cmd.includes("sudo")
                    ) && (
                      <Badge
                        variant="warning"
                        className="text-xs bg-orange-50 text-orange-700"
                      >
                        sudo
                      </Badge>
                    )}
                    {commandList.commands?.some(
                      (cmd) =>
                        cmd.includes("systemctl") || cmd.includes("service")
                    ) && (
                      <Badge
                        variant="info"
                        className="text-xs bg-purple-50 text-purple-700"
                      >
                        service
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {commandList.commands?.length > 0 ? (
                      <div className="divide-y">
                        {commandList.commands.map((command, index) => (
                          <div
                            key={index}
                            className="p-3 hover:bg-gray-50 group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500 w-8">
                                {index + 1}.
                              </div>
                              <code className="text-sm font-mono bg-gray-100 px-3 py-1.5 rounded flex-1 break-all">
                                {command}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyCommand(command)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 ml-1"
                                title="Copy lệnh"
                              >
                                📋
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p>Chưa có lệnh nào</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t p-3 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(commandList)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <span className="mr-1">👁️</span>
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCommandList(commandList)}
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <span className="mr-1">✏️</span>
                    Chỉnh sửa
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                ← Trước
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i)}
                  className={currentPage === i ? "bg-blue-600" : ""}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Sau →
              </Button>
            </div>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Tạo Command List mới"
          size="lg"
        >
          <CommandListForm
            onSubmit={handleCreateCommandList}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Chỉnh sửa Command List"
          size="lg"
        >
          <CommandListForm
            onSubmit={handleUpdateCommandList}
            onCancel={() => setIsEditModalOpen(false)}
            initialData={selectedCommandList}
          />
        </Modal>

        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Chi tiết Command List"
          size="xl"
        >
          {selectedCommandList && (
            <CommandListDetails
              commandList={selectedCommandList}
              onEdit={() => {
                setIsDetailsModalOpen(false);
                setIsEditModalOpen(true);
              }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CommandListManager;
