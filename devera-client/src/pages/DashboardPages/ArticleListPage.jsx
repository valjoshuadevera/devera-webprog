import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link as RouterLink } from "react-router-dom";
import constants from "../../constants";

const blankForm = {
  title: "",
  slug: "",
  preview: "",
  paragraph: "",
  status: "published",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const statusOptions = ["published", "draft", "disabled"];

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const publishedCount = useMemo(
    () => articles.filter((article) => article.status === "published").length,
    [articles]
  );

  const loadArticles = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${constants.HOST}/articles`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load articles.");
      }

      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openDialog = () => {
    setForm(blankForm);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(blankForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "slug" ? slugify(value) : value,
      ...(name === "title" && !prev.slug ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        isActive: form.status === "published",
      };

      const response = await fetch(`${constants.HOST}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add article.");
      }

      setArticles((prev) => [data, ...prev]);
      setNotice({
        open: true,
        severity: "success",
        message: "Article added successfully.",
      });
      closeDialog();
    } catch (err) {
      setNotice({
        open: true,
        severity: "error",
        message: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Articles
          </Typography>
          <Typography color="text.secondary">
            Add articles here after registration and publish them to the landing page.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            component={RouterLink}
            to="/articles"
            variant="outlined"
            startIcon={<OpenInNewIcon />}
          >
            Landing Articles
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openDialog}>
            Add Article
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Total Articles</Typography>
            <Typography variant="h4" fontWeight={800}>
              {articles.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Published</Typography>
            <Typography variant="h4" fontWeight={800}>
              {publishedCount}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
            <CircularProgress />
          </Stack>
        ) : articles.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h6">No articles yet</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Add the first article to publish content on the landing page.
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openDialog}>
              Add Article
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {articles.map((article) => (
              <Card key={article._id || article.slug} variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                  >
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h6" fontWeight={800}>
                          {article.title}
                        </Typography>
                        <Chip label={article.status} size="small" />
                      </Stack>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        {article.preview}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        /articles/{article.slug}
                      </Typography>
                    </Box>

                    <Button
                      component={RouterLink}
                      to={`/articles/${article.slug}`}
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                    >
                      View
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Article</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <TextField
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                helperText="This becomes the landing page URL."
              />
              <TextField
                label="Preview"
                name="preview"
                value={form.preview}
                onChange={handleChange}
                required
                multiline
                minRows={2}
              />
              <TextField
                label="Article Content"
                name="paragraph"
                value={form.paragraph}
                onChange={handleChange}
                required
                multiline
                minRows={5}
              />
              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Save Article"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={notice.open}
        autoHideDuration={3500}
        onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notice.severity} sx={{ width: "100%" }}>
          {notice.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ArticleListPage;
