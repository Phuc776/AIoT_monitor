import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  Button,
  Input,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components";

import ProfileAPI from "../../../../services/apis/endpoints/team-lead/profile";

const OperatorAssignment = ({ profile, onSuccess, onCancel }) => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Get current assigned operator IDs
  const currentAssignedIds =
    profile.assignedOperators?.map((op) => op.id) || [];

  // Initialize selected operators with currently assigned ones
  useEffect(() => {
    setSelectedOperators(currentAssignedIds);
  }, [profile]);

  // Fetch operators from API
  useEffect(() => {
    fetchOperators();
  }, [currentPage]);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProfileAPI.getOperators(currentPage, 20);

      console.log("API Response:", response.data);

      if (response.data) {
        setOperators(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching operators:", error);
      setError("Không thể tải danh sách người vận hành. Vui lòng thử lại.");
      setOperators([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOperators = operators.filter((operator) =>
    operator.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleOperator = (operatorId) => {
    setSelectedOperators((prev) => {
      if (prev.includes(operatorId)) {
        return prev.filter((id) => id !== operatorId);
      } else {
        return [...prev, operatorId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOperators.length === filteredOperators.length) {
      // If all are selected, unselect all
      setSelectedOperators([]);
    } else {
      // Otherwise, select all filtered operators
      setSelectedOperators(filteredOperators.map((op) => op.id));
    }
  };

  const handleSubmit = async () => {
    try {
      // Sửa: Loại bỏ trùng lặp trước khi gửi
      const uniqueIds = [...new Set(selectedOperators)];
      console.log("Assigning operators:", uniqueIds);

      // Sửa: Gọi API với danh sách ID duy nhất
      await ProfileAPI.assignOperators(profile.id, uniqueIds);

      toast.success("Gán người vận hành thành công!");
      onSuccess();
    } catch (error) {
      console.error("Error assigning operators:", error);
      toast.error(
        `Không thể gán người vận hành: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading && operators.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          Đang tải danh sách người vận hành...
        </p>
      </div>
    );
  }

  if (error && operators.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <Button onClick={fetchOperators}>Thử lại</Button>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            Gán người vận hành cho Profile: {profile.profileName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Chọn những người vận hành sẽ được gán vào profile này. Họ sẽ có
            quyền thực thi các lệnh trên các thiết bị trong nhóm.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <Input
              placeholder="Tìm kiếm người vận hành..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={
                filteredOperators.length > 0 &&
                selectedOperators.length === filteredOperators.length
              }
              onChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-gray-700"
            >
              Chọn tất cả
            </label>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Danh sách người vận hành</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOperators.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Không tìm thấy người vận hành nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {filteredOperators.map((operator) => {
                  const isSelected = selectedOperators.includes(operator.id);
                  const wasAssigned = currentAssignedIds.includes(operator.id);

                  return (
                    <div
                      key={operator.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isSelected
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Checkbox
                        id={`operator-${operator.id}`}
                        checked={isSelected}
                        onChange={() => handleToggleOperator(operator.id)}
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <span className="text-xl">👤</span>
                        </div>
                        <div>
                          <label
                            htmlFor={`operator-${operator.id}`}
                            className="font-medium text-gray-900 cursor-pointer"
                          >
                            {operator.username}
                          </label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              {operator.role}
                            </p>
                            {wasAssigned && (
                              <span className="text-xs text-green-600 font-medium">
                                Đã gán trước đó
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-6"
            disabled={
              JSON.stringify(selectedOperators.sort()) ===
              JSON.stringify(currentAssignedIds.sort())
            }
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OperatorAssignment;
