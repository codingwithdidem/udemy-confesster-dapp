import axios from "axios";

const saveToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  const response = await axios(config);
  return response.data.cid;
};

export default saveToIPFS;
