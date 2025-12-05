// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";

// export async function createReview(files) {
//   const response = await axios.post(`${API_BASE_URL}/review`, { files });
//   return response.data;
// }

// export async function getReports() {
//   const response = await axios.get(`${API_BASE_URL}/review`);
//   return response.data;
// }

// export async function getReportById(id) {
//   const response = await axios.get(`${API_BASE_URL}/review/${id}`);
//   return response.data;
// }




// reviewApi.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export async function createReview(files, { onUploadProgress } = {}) {
  try {
    // If files is an array of File objects (from input), use FormData
    const hasFileObjects = files && files.length && files[0] instanceof File;

    if (hasFileObjects) {
      const fd = new FormData();
      files.forEach((f, idx) => {
        fd.append("files", f); // backend should accept as 'files'
      });
      const response = await axios.post(`${API_BASE_URL}/review`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
        timeout: 120000,
      });
      return response.data;
    }

    // Otherwise send JSON payload (for code text objects)
    const response = await axios.post(
      `${API_BASE_URL}/review`,
      { files },
      { timeout: 120000 }
    );
    return response.data;
  } catch (err) {
    // normalize error
    const message =
      err?.response?.data?.message || err.message || "Network error";
    throw new Error(message);
  }
}

export async function getReports() {
  try {
    const response = await axios.get(`${API_BASE_URL}/review`);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Network error");
  }
}

export async function getReportById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/review/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "Network error");
  }
}
