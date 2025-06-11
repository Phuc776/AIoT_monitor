import { useState, useEffect } from "react";

import {
  Button,
  Input,
  Modal,
  Badge,
  Dropdown,
  DropdownItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components";
import UserAPI from "../../services/apis/endpoints/user";
import { FaPlus } from "react-icons/fa";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UserAPI.getAll(currentPage, 12);

      console.log("API Response:", response.data);

      if (response.data) {
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await UserAPI.delete(id);
        await fetchUsers(); // Refresh the list
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(
          `Không thể xóa người dùng: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      ROLE_ADMIN: {
        label: "Admin",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: "👑",
      },
      ROLE_TEAM_LEAD: {
        label: "Team Lead",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "👨‍💼",
      },
      ROLE_SUPERVISOR: {
        label: "Supervisor",
        className: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "👨‍💻",
      },
      ROLE_OPERATOR: {
        label: "Operator",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: "👤",
      },
    };

    const config = roleConfig[role] || {
      label: role,
      className: "bg-gray-100 text-gray-800 border-gray-200",
      icon: "❓",
    };

    return (
      <Badge variant="outline" className={config.className}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </Badge>
    );
  };

  const getRoleIcon = (role) => {
    const roleIcons = {
      ROLE_ADMIN: "👑",
      ROLE_TEAM_LEAD: "👨‍💼",
      ROLE_SUPERVISOR: "👨‍💻",
      ROLE_OPERATOR: "👤",
    };
    return roleIcons[role] || "👤";
  };

  const getRoleColor = (role) => {
    const roleColors = {
      ROLE_ADMIN: "bg-red-100",
      ROLE_TEAM_LEAD: "bg-blue-100",
      ROLE_SUPERVISOR: "bg-purple-100",
      ROLE_OPERATOR: "bg-green-100",
    };
    return roleColors[role] || "bg-gray-100";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600">Đang tải danh sách người dùng...</p>
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
              onClick={fetchUsers}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Thử lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý người dùng
          </h1>
          <p className="text-gray-600">
            Xem và quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <Button
          onClick={() => (window.location.href = "/admin/create-user")}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <span className="mr-2">
            <FaPlus />
          </span>
          Tạo người dùng mới
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <Input
            placeholder="Tìm kiếm theo tên hoặc vai trò..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-500">
          Hiển thị {filteredUsers.length} trên {totalElements} người dùng
        </div>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { role: "ROLE_ADMIN", label: "Admin", icon: "👑", color: "red" },
          {
            role: "ROLE_TEAM_LEAD",
            label: "Team Lead",
            icon: "👨‍💼",
            color: "blue",
          },
          {
            role: "ROLE_SUPERVISOR",
            label: "Supervisor",
            icon: "👨‍💻",
            color: "purple",
          },
          {
            role: "ROLE_OPERATOR",
            label: "Operator",
            icon: "👤",
            color: "green",
          },
        ].map((roleInfo) => {
          const count = users.filter(
            (user) => user.role === roleInfo.role
          ).length;
          return (
            <Card key={roleInfo.role} className="text-center">
              <CardContent className="p-4">
                <div
                  className={`w-12 h-12 bg-${roleInfo.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <span className="text-2xl">{roleInfo.icon}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">{roleInfo.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm
              ? "Không tìm thấy người dùng"
              : "Chưa có người dùng nào"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Thử tìm kiếm với từ khóa khác hoặc tạo người dùng mới"
              : "Bắt đầu bằng cách tạo người dùng đầu tiên"}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => (window.location.href = "/admin/create-user")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <span className="mr-2">➕</span>
              Tạo người dùng đầu tiên
            </Button>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>👥</span>
              Danh sách người dùng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* User Avatar */}
                      <div
                        className={`${getRoleColor(
                          user.role
                        )} p-3 rounded-full`}
                      >
                        <span className="text-xl">
                          {getRoleIcon(user.role)}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {user.username}
                          </h3>
                          {getRoleBadge(user.role)}
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200"
                          >
                            <span className="mr-1">🆔</span>#{user.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <span>👤</span>
                            Tên đăng nhập:{" "}
                            <span className="font-medium text-gray-700">
                              {user.username}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🎭</span>
                            Vai trò:{" "}
                            <span className="font-medium text-gray-700">
                              {user.role.replace("ROLE_", "").replace("_", " ")}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <span className="mr-1">✅</span>
                              Hoạt động
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(user)}
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <span className="mr-1">👁️</span>
                        Chi tiết
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Edit user:", user.id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <span className="mr-1">✏️</span>
                        Sửa
                      </Button>
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
                        <DropdownItem onClick={() => handleViewDetails(user)}>
                          <span className="mr-2">👁️</span>
                          Xem chi tiết
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => console.log("Edit user:", user.id)}
                        >
                          <span className="mr-2">✏️</span>
                          Chỉnh sửa
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            console.log("Reset password:", user.id)
                          }
                        >
                          <span className="mr-2">🔑</span>
                          Đặt lại mật khẩu
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <span className="mr-2">🗑️</span>
                          Xóa
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
                className={currentPage === i ? "bg-purple-600" : ""}
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

      {/* User Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Chi tiết người dùng"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`${getRoleColor(
                    selectedUser.role
                  )} p-3 rounded-lg`}
                >
                  <span className="text-2xl">
                    {getRoleIcon(selectedUser.role)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedUser.username}
                  </h2>
                  <p className="text-sm text-gray-500">ID: {selectedUser.id}</p>
                </div>
              </div>
              {getRoleBadge(selectedUser.role)}
            </div>

            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>ℹ️</span>
                  Thông tin chi tiết
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Tên đăng nhập
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedUser.username}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      ID người dùng
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      #{selectedUser.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Vai trò
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedUser.role.replace("ROLE_", "").replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Trạng thái
                    </label>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      <span className="mr-1">✅</span>
                      Hoạt động
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Đóng
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <span className="mr-2">✏️</span>
                Chỉnh sửa
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManager;
