import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../data/users.json";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

const loadUsers = () => {
  try {
    return {
      users: usersSeed.map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        contactNumber: user.contactNumber || "",
        email: user.email || "",
        role: user.role || "editor",
        username: user.username || "",
        password: user.password || "",
        address: user.address || "",
        isActive:
          typeof user.isActive === "boolean"
            ? user.isActive
            : true,
      })),
      error: "",
    };
  } catch (err) {
    console.error(err);

    return {
      users: [],
      error:
        "Unable to load users from src/data/users.json",
    };
  }
};

const seed = loadUsers();

function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notice, setNotice] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const openModal = (user = null) => {
    setModal({
      open: true,
      id: user?.id || null,
    });

    if (user) {
      setForm(user);
    } else {
      setForm(blankForm);
    }
  };

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    resetForm();
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.firstName)
      newErrors.firstName =
        "First name required";

    if (!form.lastName)
      newErrors.lastName =
        "Last name required";

    if (!form.age)
      newErrors.age =
        "Age required";

    if (!form.gender)
      newErrors.gender =
        "Gender required";

    if (!form.contactNumber)
      newErrors.contactNumber =
        "Contact number required";

    if (!form.email)
      newErrors.email =
        "Email required";

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Invalid email";
    }

    if (!form.username)
      newErrors.username =
        "Username required";

    if (!form.password)
      newErrors.password =
        "Password required";

    if (!form.role)
      newErrors.role =
        "Role required";

    if (!form.address)
      newErrors.address =
        "Address required";

    if (
      form.password &&
      form.password.length < 8
    ) {
      newErrors.password =
        "Password must be 8 characters";
    }

    if (
      form.contactNumber &&
      !/^\d{11}$/.test(
        form.contactNumber
      )
    ) {
      newErrors.contactNumber =
        "Must be 11 digits";
    }

    if (
      form.age &&
      (!/^\d+$/.test(form.age) ||
        Number(form.age) <= 0)
    ) {
      newErrors.age =
        "Age must be a valid number";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      setNotice({
        open: true,
        severity: "error",
        message:
          Object.values(validationErrors)[0] ||
          "Please complete the form correctly.",
      });
      return;
    }

    const newUser = {
      ...form,
    };

    if (modal.id) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === modal.id
            ? {
                ...user,
                ...newUser,
              }
            : user
        )
      );
      setNotice({
        open: true,
        severity: "success",
        message: "User updated successfully.",
      });
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id:
            prev.length + 1,
          ...newUser,
        },
      ]);
      setNotice({
        open: true,
        severity: "success",
        message: "User added successfully.",
      });
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              isActive:
                !user.isActive,
            }
          : user
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setGenderFilter("");
    setStatusFilter("");
  };

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.trim().toLowerCase();
    const searchableText = [
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.contactNumber,
      user.address,
      user.role,
      user.gender,
      user.age,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);
    const matchesRole =
      !roleFilter || user.role === roleFilter;
    const matchesGender =
      !genderFilter || user.gender === genderFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return (
      matchesSearch &&
      matchesRole &&
      matchesGender &&
      matchesStatus
    );
  });

  const hasFilters =
    searchTerm || roleFilter || genderFilter || statusFilter;

  const closeNotice = () => {
    setNotice((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_, row) =>
        `${row.firstName} ${row.lastName}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      valueGetter: (_, row) =>
        labelize(
          row.role
        ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const row =
          params.row;

        return (
          <Chip
            label={
              row.isActive
                ? "Active"
                : "Inactive"
            }
            color={
              row.isActive
                ? "success"
                : "default"
            }
            size="small"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => {
        const row =
          params.row;

        return (
          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() =>
                openModal(
                  row
                )
              }
            >
              Edit
            </Button>

            <Button
              size="small"
              variant="contained"
              color={
                row.isActive
                  ? "warning"
                  : "success"
              }
              onClick={() =>
                toggleStatus(
                  row.id
                )
              }
            >
              {row.isActive
                ? "Disable"
                : "Activate"}
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box p={2}>
      <Typography
        variant="h4"
        mb={2}
      >
        Users Management
      </Typography>

      {seed.error && (
        <Alert severity="error">
          {seed.error}
        </Alert>
      )}

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() =>
          openModal()
        }
      >
        Add User
      </Button>

      <Paper
        sx={{
          p: 2,
          mb: 2,
          width: "100%",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            label="Search users"
            size="small"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Name, email, username, contact"
            sx={{ flex: 1, minWidth: { md: 260 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Role"
            size="small"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            sx={{ minWidth: { md: 150 } }}
          >
            <MenuItem value="">All roles</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Gender"
            size="small"
            value={genderFilter}
            onChange={(e) =>
              setGenderFilter(e.target.value)
            }
            sx={{ minWidth: { md: 150 } }}
          >
            <MenuItem value="">All genders</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            sx={{ minWidth: { md: 150 } }}
          >
            <MenuItem value="">All statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          <Button
            variant="outlined"
            disabled={!hasFilters}
            onClick={clearFilters}
            sx={{ minWidth: 120 }}
          >
            Clear
          </Button>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1.5 }}
        >
          Showing {filteredUsers.length} of {users.length} users
        </Typography>
      </Paper>

      <Paper
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSizeOptions={[
            5,
            10,
          ]}
        />
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
      >
        <form
          onSubmit={
            handleSubmit
          }
        >
          <DialogTitle>
            {modal.id
              ? "Edit User"
              : "Add User"}
          </DialogTitle>

          <DialogContent>
            <Stack
              spacing={2}
              mt={1}
            >
              <TextField
                label="First Name"
                name="firstName"
                value={
                  form.firstName
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.firstName
                }
                helperText={
                  errors.firstName
                }
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={
                  form.lastName
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.lastName
                }
                helperText={
                  errors.lastName
                }
              />

              <TextField
                label="Age"
                name="age"
                value={
                  form.age
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.age
                }
                helperText={
                  errors.age
                }
              />

              <TextField
                select
                label="Gender"
                name="gender"
                value={
                  form.gender
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.gender
                }
                helperText={
                  errors.gender
                }
              >
                {genders.map(
                  (
                    gender
                  ) => (
                    <MenuItem
                      key={
                        gender
                      }
                      value={
                        gender
                      }
                    >
                      {labelize(
                        gender
                      )}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                label="Contact Number"
                name="contactNumber"
                value={
                  form.contactNumber
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.contactNumber
                }
                helperText={
                  errors.contactNumber
                }
              />

              <TextField
                label="Email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.email
                }
                helperText={
                  errors.email
                }
              />

              <TextField
                select
                label="Role"
                name="role"
                value={
                  form.role
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.role
                }
                helperText={
                  errors.role
                }
              >
                {roles.map(
                  (
                    role
                  ) => (
                    <MenuItem
                      key={
                        role
                      }
                      value={
                        role
                      }
                    >
                      {labelize(
                        role
                      )}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                label="Username"
                name="username"
                value={
                  form.username
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.username
                }
                helperText={
                  errors.username
                }
              />

              <TextField
                label="Password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.password
                }
                helperText={
                  errors.password
                }
                InputProps={{
                  endAdornment:
                    (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                }}
              />

              <TextField
                label="Address"
                name="address"
                multiline
                rows={3}
                value={
                  form.address
                }
                onChange={
                  handleChange
                }
                error={
                  !!errors.address
                }
                helperText={
                  errors.address
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={
                      form.isActive
                    }
                    name="isActive"
                    onChange={
                      handleChange
                    }
                  />
                }
                label="Active User"
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={
                closeModal
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={notice.open}
        autoHideDuration={3500}
        onClose={closeNotice}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity={notice.severity}
          onClose={closeNotice}
          sx={{ width: "100%" }}
        >
          {notice.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UsersPage;
