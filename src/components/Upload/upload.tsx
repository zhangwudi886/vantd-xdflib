import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Button from "../Button/button";
import Dragger from "./dragger";
export interface UploadProps {
  /** 上传地址，必须 */
  action: string;
  /** 默认展示列表 */
  defaultFileList?: UploadFile[];
  /** 上传进度回调 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调 */
  onError?: (err: any, file: File) => void;
  /** 上传前的钩子 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传状态改变的回调，成功失败都会触发 */
  onChange?: (file: File) => void;
  /** 删除上传列表的回调 */
  onRemove?: (file: UploadFile) => void;
  /** 自定义请求头 */
  headers?: { [key: string]: any };
  /** 自定义文件名称 */

  name?: string;
  /** 自定义请求参数 */

  data?: { [key: string]: any };
  /** 是否携带cookie */

  withCredentials?: boolean;
  /** 文件类型 */

  accept?: string;
  /** 多文件上传 */

  multiple?: boolean;
  /** 拖拽上传 */

  drag?: boolean;
}

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  console.log(fileList);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);

    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => [_file, ...prevList]);
    // setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          console.log(e, "onUploadProgress");
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res);
        updateFileList(_file, { response: res.data, status: "success" });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.error(err);
        updateFileList(_file, { error: err, status: "error" });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className="xdf-upload-component">
      {/* <Button btnType="primary" onClick={handleClick}>
        upload file
      </Button> */}
      <div
        className="xdf-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          type="file"
          className="xdf-file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInput}
          multiple={multiple}
          accept={accept}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
Upload.defaultProps = {
  name: "file",
};
export default Upload;
