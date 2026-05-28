import service from "@/utils/request";

export function login(data) {
  return service.post("/user/login", data);
}

//  http://159.75.169.224:1235/api/knowledge/category/tree
export function categoryTree() {
  return service.get("/knowledge/category/tree");
}

// http://159.75.169.224:1235/api/knowledge/article/page
export function articlePage(params) {
  return service.get("/knowledge/article/page", { params });
}

export function uploadFile(file, businessInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");
  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function createArticle(data) {
  return service.post("/knowledge/article", data);
}
