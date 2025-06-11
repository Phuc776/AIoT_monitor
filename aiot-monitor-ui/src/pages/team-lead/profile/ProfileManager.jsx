import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Input,
  Badge,
  Modal,
  Dropdown,
  DropdownItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../components";

import ProfileAPI from "../../../services/apis/endpoints/team-lead/profile";
import {
  OperatorAssignment,
  ProfileForm,
  ProfileDetails,
} from "../../../components";
import { FaPlus } from "react-icons/fa";

const ProfileManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch profiles from API
  useEffect(() => {
    fetchProfiles();
  }, [currentPage]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProfileAPI.getProfilesByPage(currentPage, 12);

      console.log("API Response:", response.data);

      if (response.data) {
        setProfiles(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError("Không thể tải danh sách profile. Vui lòng thử lại.");
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.profileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProfile = async (profileData) => {
    try {
      console.log("Creating profile with data:", profileData);

      const response = await ProfileAPI.createProfile(profileData);
      console.log("Create response:", response);

      if (response.data) {
        await fetchProfiles(); // Refresh the list
        setIsCreateModalOpen(false);
        toast.success("Tạo Profile thành công!");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      console.error("Error details:", error.response?.data);
      toast.error(
        `Không thể tạo Profile: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      console.log("Updating profile with data:", profileData);

      const response = await ProfileAPI.updateProfile(
        selectedProfile.id,
        profileData
      );
      console.log("Update response:", response);

      if (response.data) {
        await fetchProfiles(); // Refresh the list
        setIsEditModalOpen(false);
        setSelectedProfile(null);
        toast.success("Cập nhật Profile thành công!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", error.response?.data);
      toast.error(
        `Không thể cập nhật Profile: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteProfile = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Profile này?")) {
      try {
        await ProfileAPI.deleteProfile(id);
        await fetchProfiles(); // Refresh the list
        toast.success("Xóa Profile thành công!");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error(
          `Không thể xóa Profile: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const handleViewDetails = async (profile) => {
    try {
      const response = await ProfileAPI.getProfileById(profile.id);
      if (response.data && response.data.profileDTO) {
        setSelectedProfile(response.data.profileDTO);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
      setSelectedProfile(profile); // Fallback to current data
      setIsDetailsModalOpen(true);
    }
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleAssignOperators = (profile) => {
    setSelectedProfile(profile);
    setIsAssignModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Đang tải danh sách Profile...</p>
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
              onClick={fetchProfiles}
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
              Quản lý Profile
            </h1>
            <p className="text-gray-600">
              Tạo và quản lý các profile để gán cho người vận hành
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Tạo Profile
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <Input
              placeholder="Tìm kiếm Profile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-gray-500">
            Hiển thị {filteredProfiles.length} trên {totalElements} Profile
          </div>
        </div>

        {/* Grid Layout */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "Không tìm thấy Profile" : "Chưa có Profile nào"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Thử tìm kiếm với từ khóa khác hoặc tạo Profile mới"
                : "Bắt đầu bằng cách tạo Profile đầu tiên của bạn"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <span className="mr-2">
                  <FaPlus />
                </span>
                Tạo Profile đầu tiên
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card
                key={profile.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gray-50 border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <span className="text-xl">👤</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {profile.profileName}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          ID: {profile.id}
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
                      <DropdownItem onClick={() => handleViewDetails(profile)}>
                        <span className="mr-2">👁️</span>
                        Xem chi tiết
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleAssignOperators(profile)}
                      >
                        <span className="mr-2">👥</span>
                        Gán người vận hành
                      </DropdownItem>
                      <DropdownItem onClick={() => handleEditProfile(profile)}>
                        <span className="mr-2">✏️</span>
                        Chỉnh sửa
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDeleteProfile(profile.id)}
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
                      Device Group: {profile.deviceGroupId || "Chưa gán"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      Command List: {profile.commandListId || "Chưa gán"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-48 overflow-y-auto">
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Người vận hành được gán:
                      </h4>
                      {profile.assignedOperators &&
                      profile.assignedOperators.length > 0 ? (
                        <div className="space-y-2">
                          {[
                            ...new Map(
                              profile.assignedOperators.map((op) => [op.id, op])
                            ).values(),
                          ].map((operator) => (
                            <div
                              key={operator.id}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                            >
                              <div className="bg-blue-100 rounded-full p-1">
                                <span className="text-sm">👤</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {operator.username}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {operator.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <p>Chưa có người vận hành nào được gán</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(profile)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <span className="mr-1">👁️</span>
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAssignOperators(profile)}
                    className="text-green-600 hover:bg-green-50"
                  >
                    <span className="mr-1">👥</span>
                    Gán người vận hành
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
          title="Tạo Profile mới"
          size="lg"
        >
          <ProfileForm
            onSubmit={handleCreateProfile}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Chỉnh sửa Profile"
          size="lg"
        >
          <ProfileForm
            onSubmit={handleUpdateProfile}
            onCancel={() => setIsEditModalOpen(false)}
            initialData={selectedProfile}
          />
        </Modal>

        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Chi tiết Profile"
          size="xl"
        >
          {selectedProfile && (
            <ProfileDetails
              profile={selectedProfile}
              onEdit={() => {
                setIsDetailsModalOpen(false);
                setIsEditModalOpen(true);
              }}
              onAssignOperators={() => {
                setIsDetailsModalOpen(false);
                setIsAssignModalOpen(true);
              }}
            />
          )}
        </Modal>

        <Modal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          title="Gán người vận hành"
          size="xl"
        >
          {selectedProfile && (
            <OperatorAssignment
              profile={selectedProfile}
              onSuccess={async () => {
                await fetchProfiles();
                setIsAssignModalOpen(false);
              }}
              onCancel={() => setIsAssignModalOpen(false)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProfileManager;
