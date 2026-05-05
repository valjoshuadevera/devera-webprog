import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import users from "../../data/users.json";
import articles from "../../data/article-content";

const palette = {
  ink: "#172026",
  surface: "#ffffff",
  soft: "#f4f7fb",
  line: "#d8e0ea",
  blue: "#2563eb",
  green: "#16a34a",
  amber: "#f59e0b",
  rose: "#e11d48",
  violet: "#7c3aed",
};

const labelize = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "Unknown";

const roleLabels = ["admin", "editor", "viewer"];
const roleCounts = roleLabels.map(
  (role) => users.filter((user) => user.role === role).length
);
const activeUsers = users.filter((user) => user.isActive).length;
const inactiveUsers = users.length - activeUsers;

const metricCards = [
  {
    label: "Users",
    value: users.length,
    accent: palette.blue,
    icon: <GroupIcon />,
    note: `${activeUsers} active`,
  },
  {
    label: "Articles",
    value: articles.length,
    accent: palette.green,
    icon: <ArticleIcon />,
    note: "Published",
  },
  {
    label: "Roles",
    value: roleLabels.length,
    accent: palette.violet,
    icon: <PeopleAltIcon />,
    note: "Access groups",
  },
  {
    label: "Activity",
    value: "82%",
    accent: palette.amber,
    icon: <TrendingUpIcon />,
    note: "This month",
  },
];

const statusChart = [
  {
    id: 0,
    value: activeUsers,
    label: "Active",
    color: palette.green,
  },
  {
    id: 1,
    value: inactiveUsers,
    label: "Inactive",
    color: palette.rose,
  },
];

const activities = [
  {
    title: "User records updated",
    details: `${users.length} profiles available in the dashboard`,
    time: "Today",
  },
  {
    title: "Article library synced",
    details: `${articles.length} articles ready for visitors`,
    time: "Today",
  },
  {
    title: "Access review",
    details: `${roleLabels.map(labelize).join(", ")} roles configured`,
    time: "Latest",
  },
];

const cardSx = {
  height: "100%",
  border: `1px solid ${palette.line}`,
  borderRadius: 2,
  boxShadow: "0 12px 30px rgba(23, 32, 38, 0.08)",
};

function DashboardPage() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 88px)",
        bgcolor: palette.soft,
        borderRadius: 2,
        p: { xs: 2, md: 3 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} color={palette.ink}>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            User activity, content totals, and account status.
          </Typography>
        </Box>

        <Chip
          icon={<VerifiedUserIcon />}
          label="System Overview"
          sx={{
            bgcolor: palette.ink,
            color: "white",
            fontWeight: 700,
            "& .MuiChip-icon": { color: palette.green },
          }}
        />
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {metricCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.label}>
            <Card sx={cardSx}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Avatar sx={{ bgcolor: card.accent, color: "white" }}>
                    {card.icon}
                  </Avatar>
                  <Chip
                    label={card.note}
                    size="small"
                    sx={{ bgcolor: `${card.accent}1f`, color: card.accent }}
                  />
                </Stack>
                <Typography sx={{ mt: 2 }} color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="h4" fontWeight={800} color={palette.ink}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card sx={cardSx}>
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Users by Role
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Admin, editor, and viewer distribution.
                  </Typography>
                </Box>
                <Chip label={`${users.length} total`} size="small" />
              </Stack>

              <Box sx={{ width: "100%", height: 320 }}>
                <BarChart
                  series={[
                    {
                      data: roleCounts,
                      label: "Users",
                      color: palette.blue,
                    },
                  ]}
                  xAxis={[
                    {
                      data: roleLabels.map(labelize),
                      scaleType: "band",
                    },
                  ]}
                  yAxis={[{ min: 0 }]}
                  height={320}
                  margin={{ left: 40, right: 20, top: 25, bottom: 45 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Account Status
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Active and inactive users.
              </Typography>

              <Box
                sx={{
                  height: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: statusChart,
                      innerRadius: 48,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={320}
                  height={280}
                  margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                Recent Updates
              </Typography>
              <List disablePadding>
                {activities.map((activity) => (
                  <ListItem key={activity.title} disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: palette.ink, color: "white" }}>
                        {activity.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={`${activity.details} - ${activity.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
