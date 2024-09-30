import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface UploadImageProps {
  onFileChange: (fileChange: string) => void;
  initialImage?: string;
  titleButton: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImage: React.FC<UploadImageProps> = React.memo((props) => {
  const { onFileChange, initialImage, titleButton } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState<UploadFile | null>(null);
  const [fileChange, setFileChange] = useState<string>("");

  useEffect(() => {
    onFileChange(fileChange);
  }, [fileChange, onFileChange]);

  useEffect(() => {
    if (initialImage) {
      setFile({
        uid: "-1",
        name: "image.png",
        status: "done",
        url: initialImage,
      });
      setFileChange(initialImage);
    }
  }, [initialImage, onFileChange]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const newFile = newFileList.length ? newFileList[0] : null;
    setFile(newFile);

    if (newFileList.length === 0) {
      setFile(null);
      setFileChange("");
      return;
    }

    if (newFile && newFile.originFileObj) {
      try {
        const storageRef = ref(storage, `/Fricks/${newFile.name}`);
        await uploadBytes(storageRef, newFile.originFileObj);
        const downloadURL = await getDownloadURL(storageRef);
        newFile.status = "done";
        setFileChange(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{titleButton}</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-circle"
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        fileList={file ? [file] : []}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
        beforeUpload={() => false}
        className="custom-upload"
      >
        {file ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
});

export default UploadImage;
